import { BsJournalBookmark } from 'react-icons/bs';

import { GiCakeSlice, GiCrystalBars } from 'react-icons/gi';
import { LiaCocktailSolid } from 'react-icons/lia';
import { PiCookingPot } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { TbSalad } from 'react-icons/tb';

import { GoPlus } from 'react-icons/go';

import featuredImg from '~/svg/chart-line.svg';

export const megaMenuColumns = [
    {
        title: 'Rezepte',
        items: [
            {
                icon: <BsJournalBookmark className="size-4 text-primary" />,
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
                icon: <TbSalad className="size-4 text-primary" />,
                title: 'Vorspeisen',
                href: '#',
                description: 'für den kleinen Hunger',
            },
            {
                icon: <PiCookingPot className="size-4 text-primary" />,
                title: 'Hauptgerichte',
                href: '#',
                description: 'für den großen Hunger',
            },
            {
                icon: <RiCake3Line className="size-4 text-primary" />,
                title: 'Nachtisch',
                href: '#',
                description: 'für ein süßes Ende',
            },
        ],
    },
    {
        items: [
            {
                icon: <LiaCocktailSolid className="size-4 text-primary" />,
                title: 'Cocktails',
                href: '#',
                description: 'für einen schönen Abend',
            },
            {
                icon: <GiCakeSlice className="size-4 text-primary" />,
                title: 'Backen',
                href: '#',
                description: 'für eine gute Zeit',
            },
            {
                icon: <GiCrystalBars className="size-4 text-primary" />,
                title: 'Snacks',
                href: '',
                description: 'für zwischendurch',
            },
        ],
    },
];

export const featuredRecipes = {
    imageUrl: featuredImg,
    featuredIcon: <BsJournalBookmark className="mt-1.25 size-4 text-primary" />,
    title: 'Neues Rezept',
    description: "Klicke hier und leg' los.",
    href: '/rezepte/neu',
    label: 'Neues Rezept',
    icon: <GoPlus className="mt-0.5 size-4" />,
};
