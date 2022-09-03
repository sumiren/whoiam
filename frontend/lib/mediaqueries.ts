import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useLg = () => {
  const theme = useMantineTheme();
  return useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);
};
