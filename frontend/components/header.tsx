import { useState } from "react";
import {
  ActionIcon,
  Burger,
  Header as OriginalHeader,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const Header = () => {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

  return (
    // @ts-ignore
    <OriginalHeader className="h-16 p-2 flex justify-between">
      <div className="flex items-center">
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      </div>
      <div className="flex text-2xl h-full items-center font-bold">
        Sumiren Portfolio
      </div>
      <div className="flex items-center">
        <ActionIcon
          variant="outline"
          color={ dark ? 'yellow.4' : 'dark.4'}
          size="lg"
          onClick={() => toggleColorScheme()}
        >
          {dark ? <IconSun size={24} /> : <IconMoonStars size={24} />}
        </ActionIcon>
      </div>
    </OriginalHeader>
  );
};
