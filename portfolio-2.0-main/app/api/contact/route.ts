import { GENERAL_INFO } from '@/lib/data';
import { NextResponse } from 'next/server';

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };

        return entities[character];
    });

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Email sending is not configured yet. Please try again later.' },
            { status: 503 },
        );
    }

    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (!payload || typeof payload !== 'object') {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const form = payload as Record<string, unknown>;
    const name = typeof form.name === 'string' ? form.name.trim() : '';
    const email = typeof form.email === 'string' ? form.email.trim() : '';
    const subject = typeof form.subject === 'string' ? form.subject.trim() : '';
    const message = typeof form.message === 'string' ? form.message.trim() : '';
    const honeypot = typeof form.company === 'string' ? form.company.trim() : '';

    // Quietly accept bot submissions without sending mail.
    if (honeypot) {
        return NextResponse.json({ success: true });
    }

    if (
        !name ||
        !email ||
        !subject ||
        !message ||
        name.length > 120 ||
        email.length > 254 ||
        subject.length > 200 ||
        message.length > 10000 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return NextResponse.json(
            { error: 'Please check the form fields and try again.' },
            { status: 400 },
        );
    }

    const from =
        process.env.RESEND_FROM_EMAIL ||
        'Portfolio Contact <onboarding@resend.dev>';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [GENERAL_INFO.email],
                reply_to: email,
                subject: `Portfolio contact: ${subject}`,
                html: `<p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p>${safeMessage.replace(/\n/g, '<br />')}</p>`,
                text: `From: ${name} <${email}>\n\n${message}`,
            }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'The email could not be sent. Please try again or email me directly.' },
                { status: 502 },
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'The email service could not be reached. Please try again or email me directly.' },
            { status: 502 },
        );
    }
}
