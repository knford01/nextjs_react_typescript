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
    // const [theme, setTheme] = useState(themes.dark);
    // const [queryClient] = useState(() => new QueryClient());
    // const router = useRouter();

    // useEffect(() => {
    //     async function fetchTheme() {
    //         const res = await fetch('/api/getTheme', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ userId: 'your-user-id' }),
    //         });
    //         const data = await res.json();

    //         // Type assertion to ensure that data.theme is a valid key
    //         const themeKey: ThemeType = data.theme;
    //         setTheme(themes[themeKey] || themes.light);
    //     }

    //     fetchTheme();
    // }, [router.pathname]);

    const [theme, setTheme] = useState<ThemeType>('serious');
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Theme theme={themes[theme]}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Theme>
        </QueryClientProvider>
    );
}

export default MyApp;
