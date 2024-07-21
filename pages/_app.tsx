import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import Theme from '@/components/theme/Theme';
import { themes, ThemeType } from '@/components/theme/ThemeStyles';

function MyApp({ Component, pageProps }: AppProps) {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('stylish');
    const [queryClient] = useState(() => new QueryClient());

    const handleThemeChange = (themeKey: ThemeType) => {
        setCurrentTheme(themeKey);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Theme
                theme={themes[currentTheme]} // Apply the current theme
                themes={themes} // Pass all available themes
                onThemeChange={handleThemeChange} // Pass the handler to change theme
            >
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Theme>
        </QueryClientProvider>
    );
}

export default MyApp;
