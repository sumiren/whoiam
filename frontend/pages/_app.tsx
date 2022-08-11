import '../styles/tailwind.css'
import type {AppProps} from "next/app";
import {MantineProvider} from "@mantine/core";
import Head from "next/head";

export const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default MyApp
