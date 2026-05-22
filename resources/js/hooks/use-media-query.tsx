import { useEffect, useState } from 'react';

/**
 * React hook that tracks whether the given media query matches the current viewport.
 * Returns a boolean indicating whether the query matches.
 * @param query - The media query to track.
 * @returns A boolean indicating whether the query matches.
 */
export function useMediaQuery(query: string) {
    const [value, setValue] = useState(false);

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        const result = matchMedia(query);
        result.addEventListener('change', onChange);
        setValue(result.matches);

        return () => result.removeEventListener('change', onChange);
    }, [query]);

    return value;
}
