'use client';

import { Transition } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface MegaMenuItem {
    icon?: React.ReactNode;
    title: string;
    href: string;
    description?: string;
}

interface MegaMenuColumn {
    categoryIcon?: React.ReactNode;
    title?: string;
    items: MegaMenuItem[];
}

interface MegaMenuProps {
    icon?: React.ReactNode;
    title: string;
    className?: string;
    columns: MegaMenuColumn[];
    featured?: {
        title?: string;
        featuredIcon?: React.ReactNode;
        description?: string;
        imageUrl?: string;
        href?: string;
        label?: string;
        icon?: React.ReactNode;
    };
}

/**
 * MegaMenu is a dropdown menu component that displays a list of items
 * organized by categories. It can also display a featured item with an image.
 *
 * @param {React.ReactNode} icon - Icon to display next to the menu title
 * @param {string} title - Title of the menu
 * @param {string} [className] - Additional CSS classes to apply to the component
 * @param {MegaMenuColumn[]} columns - List of columns to display in the menu
 * @param {{ title: string, description: string, imageUrl?: string, href: string, label: string, icon?: React.ReactNode }} [featured] - Featured item to display at the top of the menu
 */
export default function MegaMenu({
    icon,
    title,
    className,
    columns,
    featured,
}: MegaMenuProps) {
    const [active, setActive] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const url = usePage().url;
    // Close click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Bottom border aktivieren, falls URL beginnt mit /rezepte
    // useEffect(() => {
    //     if (url.startsWith('/rezepte')) setActive(true);
    // }, [url]);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div
            ref={menuRef}
            className={cn(
                'relative mx-auto inline-block border-sidebar-accent sm:px-1 md:px-2',
            )}
        >
            <button
                onClick={toggleMenu}
                className={cn(
                    'mt-px flex items-center gap-2 border-b-2 border-transparent px-1 pt-4 pb-4 text-base text-gray-800 hover:cursor-pointer hover:text-primary focus:outline-none dark:text-gray-200 dark:hover:text-gray-400',
                    isOpen
                        ? 'text-primary'
                        : 'text-gray-800 dark:text-gray-200',
                    active ? 'border-b-primary' : 'border-b-transparent',
                )}
                title={title}
                aria-label={title}
            >
                <span className="hidden text-primary md:inline-flex">
                    {icon}
                </span>
                <span className="inline-flex">{title}</span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform duration-200 ease-in-out',
                        isOpen && 'rotate-180',
                    )}
                />
            </button>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="absolute top-full left-1/4 z-50 mt-3 hidden w-screen max-w-5xl -translate-x-2/8 sm:block">
                    <div className="overflow-hidden rounded-xl bg-white/30 p-1 shadow-lg backdrop-blur dark:bg-gray-800/30">
                        <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                            <div className="grid gap-4 p-4 md:grid-cols-4">
                                {columns.map((section, idx) => (
                                    <div key={idx} className="space-y-2">
                                        {(section.title ||
                                            section.categoryIcon) && (
                                            <h3 className="ml-3.5 flex items-center gap-2 text-base">
                                                {section.categoryIcon}
                                                {section.title}
                                            </h3>
                                        )}
                                        {!section.title &&
                                            !section.categoryIcon && (
                                                <div className="h-6"></div>
                                            )}
                                        <ul className="space-y-3">
                                            {section.items.map(
                                                (item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        <Link
                                                            href={item.href}
                                                            className="group block space-y-1 rounded-md p-2 pl-3 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-900"
                                                            aria-label={
                                                                item.title
                                                            }
                                                        >
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex items-center gap-2">
                                                                        {
                                                                            item.icon
                                                                        }
                                                                        <span className="text-md font-medium group-hover:text-primary">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <ArrowRight className="-mt-[3px] h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                                </div>
                                                                {item.description && (
                                                                    <p className="text-md font-yellowtail text-gray-600 dark:text-gray-300">
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                ))}

                                {featured && (
                                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
                                        <div className="flex h-full flex-col justify-between">
                                            <div>
                                                <h3 className="flex gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                                    {featured.featuredIcon}
                                                    {featured.title}
                                                </h3>
                                                {featured.description && (
                                                    <p className="font-yellowtail text-sm text-gray-600 dark:text-gray-400">
                                                        {featured.description}
                                                    </p>
                                                )}
                                                {featured.imageUrl && (
                                                    <img
                                                        src={featured.imageUrl}
                                                        alt={featured.title}
                                                        className="mx-auto my-1 aspect-video size-32 object-cover"
                                                    />
                                                )}
                                            </div>
                                            {featured.label && (
                                                <Button
                                                    asChild
                                                    variant="primary"
                                                    className="group"
                                                >
                                                    <Link
                                                        href={featured.href}
                                                        className="flex justify-start group-hover:text-white"
                                                    >
                                                        <div className="flex items-center justify-start gap-2 group-hover:border-primary group-hover:text-white">
                                                            <span className="text-md flex gap-2 font-medium group-hover:text-white">
                                                                {featured.icon}
                                                                {featured.label}
                                                            </span>
                                                            <ArrowRight className="-mt-[3px] h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                        </div>
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
}
