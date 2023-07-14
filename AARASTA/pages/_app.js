import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NextNProgress from 'nextjs-progressbar';
import "@/styles/globals.css";
import React from "react";
import Head from "next/head";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AARASTA</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <StateContext>
        <Header />
        <Toaster />
        <NextNProgress color="#000000" options={{ showSpinner: false }} />
        <Component {...pageProps} />
        <Footer />
      </StateContext>
    </>
  );
}
