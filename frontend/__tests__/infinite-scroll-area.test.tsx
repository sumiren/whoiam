import { beforeAll, describe, expect, test, vi } from "vitest";
import InfiniteScrollArea from "../components/infinite-scroll-area";
import { render } from "@testing-library/react";
import { mockIntersectionObserver } from "./mocked-intersection-observer";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("test", () => {
  test("add", async () => {
    let moreData: boolean = true;

    const io = mockIntersectionObserver();
    const loadMoreData = vi.fn().mockImplementation(() => {
      return { moreDataYet: moreData };
    });
    const rendered = render(
      <InfiniteScrollArea loadMoreData={loadMoreData}></InfiniteScrollArea>
    );

    expect(loadMoreData).not.toHaveBeenCalled();
    // @ts-ignore
    for (const item of rendered.container.querySelectorAll(
      "div.h-1:not(.hidden)"
    )) {
      io.enterNode(item);
    }
    await delay(50);
    expect(loadMoreData).toHaveBeenCalledTimes(1);

    moreData = false;

    // @ts-ignore
    for (const item of rendered.container.querySelectorAll(
      "div.h-1:not(.hidden)"
    )) {
      io.enterNode(item);
    }
    await delay(50);
    expect(loadMoreData).toHaveBeenCalledTimes(2);

    // @ts-ignore
    for (const item of rendered.container.querySelectorAll(
      "div.h-1:not(.hidden)"
    )) {
      io.enterNode(item);
    }
    await delay(50);
    expect(loadMoreData).toHaveBeenCalledTimes(2);
  });
});

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
