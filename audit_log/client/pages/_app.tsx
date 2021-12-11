import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        className="text-xs"
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="colored"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
