import Link from "next/link";
import { Button } from "@mantine/core";

export interface ViewButtonProps {
  text: string;
  href: string;
}

export const ViewButton = ({ text, href }: ViewButtonProps) => {
  return (
    <>
      <Link href={href} passHref>
        <Button component="a" size="xl">
          {text}
        </Button>
      </Link>
    </>
  );
};
