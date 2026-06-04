'use client';

import { usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
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
import { ChevronsUpDown, Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SharedData } from '@/types';

interface TagComboBoxProps {
    /** Array of string values — numeric strings are existing tag IDs, plain strings are new tag names. */
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    triggerClassName?: string;
}

export function TagComboBox({
    value,
    onChange,
    placeholder = 'Select or create tags',
    triggerClassName,
}: TagComboBoxProps) {
    const tagList = usePage<SharedData>().props.tags ?? [];
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    /** Resolve display labels for the currently selected values. */
    const selectedLabels = useMemo(() => {
        return value.map((v) => {
            const tag = tagList.find((t) => String(t.id) === v);
            return tag ? tag.name : v; // Existing tag → name, new tag → the string itself
        });
    }, [tagList, value]);

    const existsByName = (name: string) =>
        tagList.some((t) => t.name.trim().toLowerCase() === name.trim().toLowerCase());

    const isAlreadySelected = (name: string) =>
        value.some(
            (v) =>
                v.trim().toLowerCase() === name.trim().toLowerCase() ||
                tagList.find((t) => String(t.id) === v)?.name.trim().toLowerCase() === name.trim().toLowerCase(),
        );

    const shouldOfferCreate = inputValue.trim().length > 0 && !existsByName(inputValue) && !isAlreadySelected(inputValue);

    function toggleTag(encodedValue: string) {
        if (encodedValue.startsWith('id:')) {
            const match = encodedValue.match(/^id:([^\s]+)\s?.*$/);
            const id = match?.[1] ?? '';
            if (!id) return;
            onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
        } else if (encodedValue.startsWith('create:')) {
            const name = encodedValue.slice('create:'.length).trim();
            if (!name) return;
            // Add the new name — avoid duplicates
            if (!isAlreadySelected(name)) {
                onChange([...value, name]);
            }
            setInputValue('');
        }
    }

    function removeTag(tagValue: string) {
        onChange(value.filter((v) => v !== tagValue));
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('h-auto min-h-9 w-full justify-between', triggerClassName)}
                >
                    {value.length > 0 ? (
                        <span className="flex flex-wrap gap-1">
                            {selectedLabels.map((label, i) => (
                                <span
                                    key={value[i]}
                                    className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                >
                                    {label}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTag(value[i]);
                                        }}
                                        className="hover:text-destructive"
                                    >
                                        <X className="size-3" />
                                    </button>
                                </span>
                            ))}
                        </span>
                    ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search or create tag..."
                        value={inputValue}
                        onValueChange={setInputValue}
                        className="my-4 focus:border-primary focus:ring-primary"
                    />
                    <CommandList>
                        {shouldOfferCreate && (
                            <CommandItem
                                key={`create-${inputValue}`}
                                value={`create:${inputValue}`}
                                onSelect={toggleTag}
                            >
                                Create: &quot;{inputValue}&quot;
                            </CommandItem>
                        )}
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup>
                            {tagList.map((tag) => {
                                const encoded = `id:${tag.id} ${tag.name}`;
                                const isSelected = value.includes(String(tag.id));
                                return (
                                    <CommandItem
                                        key={tag.id}
                                        value={encoded}
                                        onSelect={toggleTag}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                isSelected ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        {tag.name}
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
