import {AppShell, Footer, List, Overlay, Transition} from "@mantine/core";
import {ReactElement, useEffect, useState} from "react";
import { Header } from "../components/header";
import {useScrollLock} from "@mantine/hooks";
import Link from "next/link";

export const Layout = ({ children }: { children: ReactElement }) => {
  const [headerMenuOverlayOpened, setHeaderMenuOverlayOpened] = useState(false);
  const [, setScrollLocked] = useScrollLock();

  const listItemClass = "text-white text-3xl font-semibold py-3 px-5";

  useEffect(()=> {
    setScrollLocked(headerMenuOverlayOpened)
  }, [headerMenuOverlayOpened]);

  return (
    <>
      {
        <Transition transition="fade" mounted={headerMenuOverlayOpened}>
          {(styles) => (
            <Overlay
              style={{ ...styles }}
              className="h-full w-full bg-pink-500 z-40 fixed top-0 left-0"
              opacity="1"
            >
              <List className="mt-16">
                <List.Item className={listItemClass} onClick={()=>{setHeaderMenuOverlayOpened(false)}}>
                  <Link href="/about">
                    About
                  </Link>
                </List.Item>
                <List.Item className={listItemClass}>Blog</List.Item>
                <List.Item className={listItemClass}>Portfolio</List.Item>
                <List.Item className={listItemClass}>Contact</List.Item>
              </List>
            </Overlay>
          )}
        </Transition>
      }
      <AppShell
        className={headerMenuOverlayOpened ? "overflow-hidden" : undefined}
        classNames={{
          main: "p-0",
        }}
        header={
          <Header
            burgerOpenedState={headerMenuOverlayOpened}
            setBurgerOpenedState={setHeaderMenuOverlayOpened}
          ></Header>
        }
        footer={
          // @ts-ignore
          <Footer className="h-8 p-1 z-30">
            <div></div>
          </Footer>
        }
      >
        <div className="mt-16"></div>
        {children}
      </AppShell>
    </>
  );
};
