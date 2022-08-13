import Link from "next/link";
import { Button, useMantineColorScheme} from "@mantine/core";

export interface ViewButtonProps {
  text: string;
  href: string;
}

export const ViewButton = ({ text, href }: ViewButtonProps) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Link href={href} passHref>
        <Button
          component="a"
          variant={dark ? "white" : "filled"}
          radius="xl"
          color="dark"
          className="mt-10"
          size="md"
        >
          {text}
        </Button>
      </Link>
    </>
  );
};
