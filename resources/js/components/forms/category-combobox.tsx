'use client';

import { usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SharedData } from '@/types';

interface CategoryComboBoxProps {
    value: string; // can be an existing category id (numeric string) or a free-text name
    onChange: (value: string) => void;
    placeholder?: string;
    triggerClassName?: string;
}

export function CategoryComboBox({
    value,
    onChange,
    placeholder = 'Select or create category',
    triggerClassName,
}: CategoryComboBoxProps) {
    const categoryList = usePage<SharedData>().props.categories ?? [];
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const selected = useMemo(
        () => categoryList.find((c) => String(c.id) === value) ?? null,
        [categoryList, value],
    );

    const displayLabel = selected ? selected.name : value || placeholder;

    const existsByName = (name: string) =>
        categoryList.some((c) => c.name.trim().toLowerCase() === name.trim().toLowerCase());

    const shouldOfferCreate = inputValue.trim().length > 0 && !existsByName(inputValue);

    function handleSelect(currentValue: string) {
        // Encoded values are of the form:
        //   id:<id> <name>
        //   create:<typed-name>
        if (currentValue.startsWith('id:')) {
            const match = currentValue.match(/^id:([^\s]+)\s?.*$/);
            const id = match?.[1] ?? '';
            if (id) onChange(id);
        } else if (currentValue.startsWith('create:')) {
            const name = currentValue.slice('create:'.length).trim();
            if (name) onChange(name);
        }
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between', triggerClassName)}
                >
                    <span className={cn(!selected && !value && 'text-muted-foreground')}>
                        {displayLabel}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search or create category..."
                        value={inputValue}
                        onValueChange={setInputValue}
                        className="my-4 focus:border-primary focus:ring-primary"
                    />
                    <CommandList>
                        {shouldOfferCreate && (
                            <CommandItem
                                key={`create-${inputValue}`}
                                value={`create:${inputValue}`}
                                onSelect={handleSelect}
                            >
                                Create: "{inputValue}"
                            </CommandItem>
                        )}
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categoryList.map((category) => {
                                const encoded = `id:${category.id} ${category.name}`;
                                const isSelected = selected?.id === category.id;
                                return (
                                    <CommandItem
                                        key={category.id}
                                        value={encoded}
                                        onSelect={handleSelect}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                isSelected ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        {category.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
