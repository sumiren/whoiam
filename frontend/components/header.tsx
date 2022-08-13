import { Dispatch, SetStateAction } from "react";
import {
  ActionIcon,
  Burger,
  Header as OriginalHeader,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

interface HeaderProps {
  burgerOpenedState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setState, burgerOpenedState }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";
  return (
    <>
      {/* @ts-ignore */}
      <OriginalHeader className="h-16 p-2 flex justify-between z-10">
        <div className="flex items-center w-9"></div>
        <div className="flex text-2xl h-full items-center font-bold">
          Sumiren Portfolio
        </div>
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
      </OriginalHeader>
      <Burger
        opened={burgerOpenedState}
        onClick={() => {
          setState(!burgerOpenedState);
        }}
        color={burgerOpenedState ? "white" : undefined}
        className="z-50 fixed top-4 left-4"
      />
    </>
  );
};
