import { Text, Image, useMantineColorScheme, Box } from "@mantine/core";

export interface PortfolioListProps {
  portfolios: Portfolio[];
}

export interface Portfolio {
  thumbnail: string;
  title: string;
  description: string;
  period: string;
}

export const PortfolioList = ({ portfolios }: PortfolioListProps) => {
  const { colorScheme } = useMantineColorScheme();
  const light = colorScheme !== "dark";

  return (
    <div className="lg:grid grid-cols-3 gap-0 lg:gap-x-8 lg:gap-y-12">
      {portfolios.map((item, index) => {
        return (
          <Box key={index}>
            <div className={index ? "mt-8 lg:mt-0" : undefined}>
              <Image
                src={item.thumbnail}
                alt={item.title + " image"}
                className={light ? "border-4 border-m_gray-2" : undefined}
              />
              <Text className="mt-4 text-2xl font-semibold">{item.title}</Text>
              <Text className="mt-4 text-lg">{item.description}</Text>
              <Text className="mt-4 text-sm text-m_dark-2 font-semibold">
                {item.period}
              </Text>
            </div>
          </Box>
        );
      })}
    </div>
  );
};
