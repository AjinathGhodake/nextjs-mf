import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const PDPPage = dynamic(() => import('remoteApp/PDPPage'), { ssr: false });
// import PDPPage from 'app2/PDPPage';
export default function Home() {
  return (
    <div
      className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <PDPPage />
    </div>
  );
}
