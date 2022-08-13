import { ReactNode } from "react";

export const PaddingXWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`${className ?? ""} px-4 lg:px-32`}>{children}</div>;
};

export default PaddingXWrapper;
