import { ReactNode } from "react";
import { Text } from "@mantine/core";

export const SimpleSection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <>
      <section className="px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-3/4 lg:flex lg:justify-center">
            <div className="w-full">
              <Text className="text-3xl font-bold">{title}</Text>
              <div className="mt-12">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
