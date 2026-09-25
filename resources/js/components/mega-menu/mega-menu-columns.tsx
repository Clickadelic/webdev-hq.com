import { AlertCircleIcon, Blocks, Link as HyperlinkIcon } from 'lucide-react';
export const MegaMenuColumns = [
    {
        title: 'Resources',
        items: [
            {
                icon: <HyperlinkIcon className="size-4 text-primary" />,
                title: 'Hyperlinks',
                href: '/hyperlinks',
                description: 'Web development resources',
            },
        ],
    },
    {
        title: 'Kategorien',
        items: [
            {
                icon: <Blocks className="size-4 text-primary" />,
                title: 'Chrome Extension',
                href: '/chrome-extension',
                description: 'Best Chrome Extension',
            },
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Hauptgerichte',
                href: '#',
                description: 'für den großen Hunger',
            },
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Nachtisch',
                href: '#',
                description: 'für ein süßes Ende',
            },
        ],
    },
    {
        items: [
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Cocktails',
                href: '#',
                description: 'für einen schönen Abend',
            },
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Backen',
                href: '#',
                description: 'für eine gute Zeit',
            },
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Snacks',
                href: '',
                description: 'für zwischendurch',
            },
        ],
    },
];
