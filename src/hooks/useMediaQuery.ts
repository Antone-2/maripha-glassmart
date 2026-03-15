import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create listener for changes
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Add listener
        mediaQuery.addEventListener('change', handler);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
}

// Predefined breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1280px)');

// Dark mode hook
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

// Reduced motion hook (for accessibility)
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
