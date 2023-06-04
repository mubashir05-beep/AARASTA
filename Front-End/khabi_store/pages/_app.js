import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import React from "react";
import Head from "next/head";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Khabi</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;500;600&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;1,100;1,500;1,600&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <StateContext>
        <Header />
        <Toaster />
        <Component {...pageProps} />
        <Footer />
      </StateContext>
    </>
  );
}
