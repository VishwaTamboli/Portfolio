'use client';

import Button from '@/components/Button';
import type { FormEvent } from 'react';
import { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
        'idle',
    );
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setStatus('sending');
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    company: formData.get('company'),
                }),
            });
            const result = (await response.json()) as {
                success?: boolean;
                error?: string;
            };

            if (!response.ok) {
                throw new Error(result.error || 'Your message could not be sent.');
            }

            form.reset();
            setStatus('sent');
            setStatusMessage('Message sent. Thanks for reaching out!');
        } catch (error) {
            setStatus('error');
            setStatusMessage(
                error instanceof Error
                    ? error.message
                    : 'Your message could not be sent. Please try again.',
            );
        }
    };

    const fieldClassName =
        'w-full border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none';

    return (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-5 text-left">
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-muted-foreground">
                    Your Name
                    <input
                        className={fieldClassName}
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        required
                    />
                </label>
                <label className="grid gap-2 text-sm text-muted-foreground">
                    Email
                    <input
                        className={fieldClassName}
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                    />
                </label>
            </div>
            <label className="grid gap-2 text-sm text-muted-foreground">
                Subject
                <input
                    className={fieldClassName}
                    type="text"
                    name="subject"
                    placeholder="How can I help?"
                    required
                />
            </label>
            <label className="grid gap-2 text-sm text-muted-foreground">
                Message
                <textarea
                    className={`${fieldClassName} min-h-40 resize-y`}
                    name="message"
                    placeholder="Write your message"
                    required
                />
            </label>
            <div className="absolute left-[-10000px]" aria-hidden="true">
                <label>
                    Company
                    <input
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </label>
            </div>
            <div>
                <Button
                    as="button"
                    type="submit"
                    variant="primary"
                    disabled={status === 'sending'}
                    className="disabled:cursor-wait disabled:opacity-60"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
            </div>
            <p
                className={
                    status === 'error'
                        ? 'text-sm text-red-400'
                        : 'text-sm text-muted-foreground'
                }
                role="status"
                aria-live="polite"
            >
                {statusMessage}
            </p>
        </form>
    );
};

export default ContactForm;
