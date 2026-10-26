import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const [value, setValue] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const onChange = (event: MediaQueryListEvent) => {
            setValue(event.matches);
        };

        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    return value;
}
