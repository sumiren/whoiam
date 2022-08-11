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
          breakpoints: {
            sm: 400,
            md: 768,
            lg: 1400
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default MyApp
