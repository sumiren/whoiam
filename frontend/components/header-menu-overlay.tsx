import { Dispatch, SetStateAction, useEffect } from "react";
import { List, Overlay, Transition } from "@mantine/core";
import Link from "next/link";
import { useScrollLock } from "@mantine/hooks";

interface HeaderProps {
  headerMenuOverlayOpenedState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const HeaderMenuOverlay = ({
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
            <List.Item
              className={listItemClass}
              onClick={() => {
                setState(false);
              }}
            >
              <Link href="/about">About</Link>
            </List.Item>
            <List.Item className={listItemClass}>Blog</List.Item>
            <List.Item className={listItemClass}>Portfolio</List.Item>
            <List.Item className={listItemClass}>Contact</List.Item>
          </List>
        </Overlay>
      )}
    </Transition>
  );
};
