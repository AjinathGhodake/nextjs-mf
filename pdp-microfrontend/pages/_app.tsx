import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <title>PDP Microfrontend</title>
        <meta name="description" content="Product Detail Page Microfrontend" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
