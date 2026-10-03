import { GENERAL_INFO } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const Footer = () => {
    return (
        <footer className="text-center pb-5" id="contact">
            <div className="container max-w-3xl">
                <p className="text-lg">Have a project in mind?</p>
                <h2 className="mt-2 text-4xl sm:text-6xl font-anton">
                    LET&apos;S TALK
                </h2>
                <ContactForm />
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="inline-flex flex-wrap justify-center gap-x-2 text-lg mt-6 mb-10 text-muted-foreground hover:text-foreground hover:underline"
                >
                    <span>Or email me directly:</span>
                    <span>{GENERAL_INFO.email}</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
