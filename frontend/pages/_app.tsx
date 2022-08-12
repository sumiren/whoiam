import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import {
  ColorSchemeProvider,
  ColorScheme,
  MantineProvider,
} from "@mantine/core";
import Head from "next/head";
import { Layout } from "../layouts/layout";
import { useState } from "react";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            breakpoints: {
              sm: 400,
              md: 768,
              lg: 1400,
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default MyApp;
