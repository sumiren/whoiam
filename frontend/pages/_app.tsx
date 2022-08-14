import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import {
  ColorSchemeProvider,
  ColorScheme,
  MantineProvider,
} from "@mantine/core";
import Head from "next/head";
import { Layout } from "../layouts/layout";
import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  let colorSchemeInCookie = getCookie("mantine-color-scheme");
  const initialColorScheme =
    colorSchemeInCookie === "dark" ? colorSchemeInCookie : "light";
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  console.log("initialColorScheme: " + initialColorScheme);

  const ref = useRef<HTMLDivElement>(null);

  if (typeof document !== "undefined" && initialColorScheme === "light") {
    const div = document.getElementById("overlay")!;
    div.className += " opacity-0";
  }

  useEffect(() => {
    const f = async () => {
      if (initialColorScheme === "dark") {
        setColorScheme("dark");
        await delay(1);
        ref.current!.className += " opacity-0";
      }
    };
    f().then();
  }, [initialColorScheme]);

  const toggleColorScheme = (value?: ColorScheme) => {
    let nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
    console.log("color scheme save: " + nextColorScheme);
  };
  const dark = colorScheme === "dark";

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div
        ref={ref}
        id="overlay"
        className="pointer-events-none duration-300 fixed top-0 left-0 h-full w-full bg-white z-50"
      ></div>
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
              lg: 1024,
            },
            components: {
              Button: {
                defaultProps: {
                  variant: dark ? "white" : "filled",
                  radius: "xl",
                  color: "dark.9",
                },
              },
            },
            colors: {
              // override dark colors to change them for all components
              dark: [
                "#EEEEEE",
                "#C1C2C5",
                "#A6A7AB",
                "#909296",
                "#5C5F66",
                "#373A40",
                "#2C2E33",
                "#1A1B1E",
                "#141517",
                "#101113",
              ],
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

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default MyApp;
