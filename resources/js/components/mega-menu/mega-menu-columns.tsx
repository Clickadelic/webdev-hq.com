import { AlertCircleIcon } from 'lucide-react';
export const MegaMenuColumns = [
    {
        title: 'Rezepte',
        items: [
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Alle Rezepte',
                href: '/rezepte',
                description: 'Alle Rezepte als Übersicht',
            },
        ],
    },
    {
        title: 'Kategorien',
        items: [
            {
                icon: <AlertCircleIcon className="size-4 text-primary" />,
                title: 'Vorspeisen',
                href: '#',
                description: 'für den kleinen Hunger',
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
