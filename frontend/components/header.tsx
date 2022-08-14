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
  links: { href: string; text: string }[];
  burgerOpenedState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ links, setState, burgerOpenedState }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      {/* @ts-ignore */}
      <OriginalHeader className="lg:flex lg:justify-center z-10">
        <div className="h-16 p-2 flex justify-between lg:px-32 w-full font-bold">
          <div className="flex items-center w-9 lg:hidden"></div>
          <div className="flex items-center justify-center lg:justify-start ">
            <Link href="/">
              <a className="text-2xl">Sumiren Portfolio</a>
            </Link>
          </div>
          <div className="flex">
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
        </div>
      </OriginalHeader>
      <Burger
        opened={burgerOpenedState}
        onClick={() => {
          setState(!burgerOpenedState);
        }}
        color={burgerOpenedState ? "white" : undefined}
        className="z-40 fixed top-4 left-4 lg:hidden"
      />
    </>
  );
};
