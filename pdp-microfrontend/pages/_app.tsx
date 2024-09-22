import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Your Page Title Here</title>
        <meta
          name="description"
          content="A brief, compelling description of your page content (150-160 characters)"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
