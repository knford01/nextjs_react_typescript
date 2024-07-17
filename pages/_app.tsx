import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Dashboard from '../components/DashboardUI';
import Theme from '@/components/theme/Theme';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient({
        // defaultOptions: {
        //     queries: {
        //         //This can auto run queries again on window focus if set to true\\
        //         // refetchOnWindowFocus: false,

        //         //This can auto run queries every X milliseconds\\
        //         // refetchInterval: 1000 * 10

        //         //Prevents any new request until x time in miliseconds has passed\\
        //         // staleTime: 1000 * 10 
        //     }
        // }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <Theme>
                <Component {...pageProps} />
                {/* helps you debug and optimize your queries. Set to true to see on screen. You will need additional code to make this work in production */}
                <ReactQueryDevtools initialIsOpen={true} />
            </Theme>
        </QueryClientProvider>
    );
}

export default MyApp;