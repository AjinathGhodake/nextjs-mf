import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preconnect', href: 'https://picsum.photos' },
      { rel: 'dns-prefetch', href: 'https://picsum.photos' },
    ];

    preloadLinks.forEach((link) => {
      const linkElement = document.createElement('link');
      Object.entries(link).forEach(([key, value]) => {
        linkElement.setAttribute(key, value);
      });
      document.head.appendChild(linkElement);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Legacy Shell</title>
        <meta name="description" content="Legacy Shell Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
