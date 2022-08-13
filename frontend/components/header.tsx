import { Dispatch, SetStateAction } from "react";
import {
  ActionIcon,
  Burger,
  Header as OriginalHeader,
  List,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import Link from "next/link";

interface HeaderProps {
  burgerOpenedState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setState, burgerOpenedState }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const links: { href: string; text: string }[] = [
    { href: "/about", text: "About" },
    { href: "/about", text: "Blog" },
    { href: "/about", text: "Portfolio" },
    { href: "/about", text: "Contact" },
  ];

  const dark = colorScheme === "dark";
  return (
    <>
      {/* @ts-ignore */}
      <OriginalHeader className="lg:flex lg:justify-center z-10">
        <div className="h-16 p-2 flex justify-between lg:w-3/4  font-bold">
          <div className="flex h-full items-center w-9 lg:hidden"></div>
          <div className="flex h-full w-full items-center justify-center lg:justify-start text-2xl">
            Sumiren Portfolio
          </div>
          <List className="h-full items-center hidden lg:flex text-2xl">
            {links.map((item, index) => {
              return (
                <List.Item className="mr-5" key={index}>
                  <Link href={item.href} className="">
                    {item.text}
                  </Link>
                </List.Item>
              );
            })}
          </List>
          <div className="flex items-center">
            <ActionIcon
              variant="outline"
              color={dark ? "yellow.4" : "dark.4"}
              size="lg"
              onClick={() => toggleColorScheme()}
            >
              {dark ? <IconSun size={24} /> : <IconMoonStars size={24} />}
            </ActionIcon>
          </div>
        </div>
      </OriginalHeader>
      <Burger
        opened={burgerOpenedState}
        onClick={() => {
          setState(!burgerOpenedState);
        }}
        color={burgerOpenedState ? "white" : undefined}
        className="z-50 fixed top-4 left-4 lg:hidden"
      />
    </>
  );
};
