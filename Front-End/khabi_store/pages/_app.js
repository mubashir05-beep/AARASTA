import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Khabi</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;1,100;1,500;1,600&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
