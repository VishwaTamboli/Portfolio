import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'vishwatamboli2006@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Vishwa, I am reaching out to you because...',

};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/VishwaTamboli' },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/vishwa-tamboli-55b287280',
    },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'GitHub',
            icon: '/logo/github.png',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Green India',
        slug: 'green-india',
        liveUrl: 'https://green-india-mauve.vercel.app/',
        year: 2026,
        description: 'Visit the live Green India website to explore the project.',
        role: '',
        techStack: [],
        images: [],
    },
];

export const INTERNSHIP_WORK = [
    {
        title: 'Dr. Kavita Rao Eye Care',
        liveUrl: 'https://drkavitaraoeyecare.com/',
    },
    {
        title: 'Dr. Ganesh Arthroscopy',
        liveUrl: 'https://www.drganesharthroscopy.com/',
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Frontend Developer',
        company: 'Sigmoid Frogs Consulting LLP',
        duration: 'Jan 2026 - March 2026',
    },
];
