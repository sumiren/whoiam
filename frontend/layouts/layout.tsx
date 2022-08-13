import { AppShell, Footer, Text } from "@mantine/core";
import { ReactElement, useState } from "react";
import { Header } from "../components/header";
import { HeaderMenuOverlay } from "../components/header-menu-overlay";

export const Layout = ({ children }: { children: ReactElement }) => {
  const [headerMenuOverlayOpened, setHeaderMenuOverlayOpened] = useState(false);

  return (
    <>
      <HeaderMenuOverlay
        headerMenuOverlayOpenedState={headerMenuOverlayOpened}
        setState={setHeaderMenuOverlayOpened}
      />
      <AppShell
        className={headerMenuOverlayOpened ? "overflow-hidden" : undefined}
        classNames={{
          main: "p-0",
        }}
        header={
          <Header
            burgerOpenedState={headerMenuOverlayOpened}
            setState={setHeaderMenuOverlayOpened}
          ></Header>
        }
        footer={
          // @ts-ignore
          <Footer className="mt-16 py-5 z-30 relative">
            <Text className="text-sm text-center text-m_dark-3">
              © 2022 sumiren
            </Text>
          </Footer>
        }
      >
        <div className="mt-16"></div>
        {children}
      </AppShell>
    </>
  );
};
