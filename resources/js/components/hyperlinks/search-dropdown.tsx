import { cn } from '@/lib/utils';
import { type Hyperlink } from '@/types';
import { ExternalLink, Loader2, Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface SearchDropdownProps {
    onSearch: (query: string) => void;
    initialSearch?: string;
    className?: string;
}

export default function SearchDropdown({ onSearch, initialSearch = '', className }: SearchDropdownProps) {
    const [query, setQuery] = useState<string>(initialSearch);
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Hyperlink[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceTimer = useRef<number | null>(null);

    // Fetch suggestions from API
    const fetchSuggestions = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);

        fetch(`/api/v1/hyperlinks/search?q=${encodeURIComponent(searchQuery)}`)
            .then((res) => res.json())
            .then((data) => {
                setSuggestions(data.hyperlinks || []);
                // Always open dropdown when there's a query, whether results exist or not
                setIsOpen(true);
                setHighlightedIndex(-1);
            })
            .catch(() => {
                setSuggestions([]);
                // Still open dropdown to show fallback even on error
                setIsOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // Debounced dropdown suggestions (without updating page results)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setHighlightedIndex(-1);

        if (debounceTimer.current) window.clearTimeout(debounceTimer.current);

        if (value.trim()) {
            // Fetch dropdown suggestions with 300ms debounce
            debounceTimer.current = window.setTimeout(() => {
                fetchSuggestions(value);
            }, 300);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    // Handle suggestion click
    const handleSelectSuggestion = (hyperlink: Hyperlink) => {
        setQuery(hyperlink.title);
        onSearch(hyperlink.title);
        setIsOpen(false);
        setSuggestions([]);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) {
            if (e.key === 'Enter') {
                e.preventDefault();
                onSearch(query);
            }
            return;
        }

        // If no suggestions but query exists (fallback state), Enter should trigger add
        if (suggestions.length === 0 && query.trim()) {
            if (e.key === 'Enter') {
                e.preventDefault();
                onSearch(query);
                setIsOpen(false);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setIsOpen(false);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelectSuggestion(suggestions[highlightedIndex]);
                } else {
                    onSearch(query);
                    setIsOpen(false);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    // Handle clear
    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onSearch('');
        inputRef.current?.focus();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
        };
    }, []);

    return (
        <div ref={containerRef} className={cn('w-full', className)}>
            <div className="rounded-xl bg-white/30 p-1 shadow backdrop-blur dark:bg-neutral-900/30">
                <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center justify-center rounded-lg bg-white dark:bg-neutral-900">
                    <Search className="pointer-events-none absolute left-3 size-5 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (query.trim() && isOpen) {
                                setIsOpen(true);
                            }
                        }}
                        placeholder="Items, categories, tags and more..."
                        className="w-full rounded-lg py-2.5 pr-10 pl-10 text-xl placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        autoComplete="off"
                    />
                    {query && (
                        <button type="button" onClick={handleClear} aria-label="Clear search" title="Clear search" className="absolute right-3 text-slate-400 hover:cursor-pointer hover:text-primary">
                            <X className="size-5" />
                        </button>
                    )}
                </form>

                {/* Dropdown Suggestions */}
                {isOpen && suggestions.length > 0 && (
                    <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-primary/20 bg-white shadow-lg dark:bg-neutral-900">
                        {suggestions.map((hyperlink, index) => (
                            <div
                                key={hyperlink.id}
                                onClick={() => handleSelectSuggestion(hyperlink)}
                                className={`flex cursor-pointer items-start gap-3 border-b border-primary/10 p-3 transition-colors last:border-b-0 hover:bg-primary/5 dark:hover:bg-primary/10 ${
                                    index === highlightedIndex ? 'bg-primary/10 dark:bg-primary/20' : ''
                                }`}
                            >
                                <img
                                    src={hyperlink.favicon_url || ''}
                                    alt="favicon"
                                    className="mt-0.5 size-5 flex-shrink-0 rounded"
                                    onError={(e) => {
                                        e.currentTarget.src = '/favicon.svg';
                                    }}
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="truncate font-semibold text-foreground">{highlightQuery(hyperlink.title, query)}</h4>
                                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                                    </div>
                                    <p className="line-clamp-1 text-xs text-muted-foreground">{hyperlink.url.replace(/^https?:\/\//, '')}</p>
                                    {hyperlink.category && (
                                        <div className="mt-1.5 flex items-center gap-2">
                                            <span className="inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">{hyperlink.category.name}</span>
                                        </div>
                                    )}
                                    {hyperlink.tags && hyperlink.tags.length > 0 && (
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {hyperlink.tags.slice(0, 3).map((tag) => (
                                                <span key={tag.id} className="text-[10px] text-primary/70">
                                                    #{tag.name}
                                                </span>
                                            ))}
                                            {hyperlink.tags.length > 3 && <span className="text-[10px] text-muted-foreground">+{hyperlink.tags.length - 3}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Loading state */}
                {isOpen && isLoading && query.trim() && (
                    <div className="absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border border-primary/20 bg-white shadow-lg dark:bg-neutral-900">
                        <div className="flex items-center justify-center gap-2 p-4">
                            <Loader2 className="size-4 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Searching...</p>
                        </div>
                    </div>
                )}

                {/* Fallback: No results found */}
                {isOpen && suggestions.length === 0 && query.trim() && !isLoading && (
                    <div className="absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border border-primary/20 bg-white shadow-lg dark:bg-neutral-900">
                        <div className="p-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                No resources found for "<span className="font-semibold text-foreground">{query}</span>"
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Keyboard hint */}
            {query && isOpen && (
                <div className="mt-2 text-center text-xs text-muted-foreground">
                    {suggestions.length > 0 ? (
                        <>
                            Use <kbd className="rounded bg-primary/10 px-1 font-mono">↑↓</kbd> to navigate, <kbd className="rounded bg-primary/10 px-1 font-mono">Enter</kbd> to select, or type to
                            search all.
                        </>
                    ) : (
                        <>
                            Press <kbd className="rounded bg-primary/10 px-1 font-mono">Enter</kbd> to add this resource.
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Highlight the matching query in the text
 */
function highlightQuery(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 font-semibold">
                {part}
            </mark>
        ) : (
            part
        ),
    );
}
