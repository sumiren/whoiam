import { AppShell, Footer} from "@mantine/core";
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
