import { List, Text, Image, useMantineColorScheme } from "@mantine/core";

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
    <List>
      {portfolios.map((item, index) => {
        return (
          <List.Item key={index}>
            <div className={index ? "mt-16" : undefined}>
              <Image
                src={item.thumbnail}
                alt={item.title + " image"}
                className={light ? "border-2 border-m_dark-1" : undefined}
              />
              <Text className="mt-4 text-2xl">{item.title}</Text>
              <Text className="mt-4 text-lg">{item.description}</Text>
              <Text className="mt-4 text-sm">{item.period}</Text>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
