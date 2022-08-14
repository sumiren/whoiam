import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { Loader, Transition } from "@mantine/core";

export interface InfiniteScrollAreaProps {
  loadMoreData: () => Promise<{ moreDataYet: boolean }>;
}

const InfiniteScrollArea = ({ loadMoreData }: InfiniteScrollAreaProps) => {
  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  const [loading, setLoading] = useState(false);
  const [moreDataYet, setMoreDataYet] = useState(true);

  useEffect(() => {
    const f = async () => {
      if (!entry?.isIntersecting) {
        return;
      }

      setLoading(true);
      const result = await loadMoreData();
      setLoading(false);
      if (!result.moreDataYet) {
        setMoreDataYet(false);
      }
    };
    f().then();
  }, [entry, loadMoreData]);

  return (
    <>
      <div className={!moreDataYet ? "hidden" : "block"}>
        <Transition transition="fade" mounted={loading} duration={2000}>
          {(styles) => (
            <Loader
              style={{ ...styles }}
              className={`mt-10`}
              m={"auto"}
              color="red.5"
            />
          )}
        </Transition>
        <div
          role="note"
          ref={ref}
          className={`h-1 ${loading || !moreDataYet ? "hidden" : "block"}`}
        ></div>
      </div>
    </>
  );
};

export default InfiniteScrollArea;
