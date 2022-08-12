import { AppShell, Footer } from "@mantine/core";
import { ReactElement } from "react";
import { Header } from "../components/header";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <AppShell
        classNames={{
          main: "p-0",
        }}
        header={<Header></Header>}
        footer={
          // @ts-ignore
          <Footer className="h-8 p-1">
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
