import { ReactNode } from "react";
import { Text } from "@mantine/core";

export const SimpleHeadlineAndTitleSection = ({
  children,
  headline,
}: {
  children: ReactNode;
  headline: string;
}) => {
  return (
    <div className="w-full">
      <Text className="text-3xl font-bold border-b border-m_gray-2 pb-6">
        {headline}
      </Text>
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default SimpleHeadlineAndTitleSection;
