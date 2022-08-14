import { Dispatch, SetStateAction, useEffect } from "react";
import { List, Overlay, Transition } from "@mantine/core";
import Link from "next/link";
import { useScrollLock } from "@mantine/hooks";

interface HeaderProps {
  links: { href: string; text: string }[];
  headerMenuOverlayOpenedState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const HeaderMenuOverlay = ({
  links,
  headerMenuOverlayOpenedState,
  setState,
}: HeaderProps) => {
  const listItemClass = "text-white text-3xl font-semibold py-3 px-5";
  const [, setScrollLocked] = useScrollLock();

  useEffect(() => {
    setScrollLocked(headerMenuOverlayOpenedState);
  }, [headerMenuOverlayOpenedState, setScrollLocked]);

  return (
    <Transition transition="fade" mounted={headerMenuOverlayOpenedState}>
      {(styles) => (
        <Overlay
          style={{ ...styles }}
          className="h-full w-full bg-pink-500 z-40 fixed top-0 left-0"
          opacity="1"
        >
          <List className="mt-16">
            {links.map((item, index) => {
              return (
                <List.Item
                  className={listItemClass}
                  onClick={() => {
                    setState(false);
                  }}
                  key={index}
                >
                  <Link href={item.href}>{item.text}</Link>
                </List.Item>
              );
            })}
          </List>
        </Overlay>
      )}
    </Transition>
  );
};
