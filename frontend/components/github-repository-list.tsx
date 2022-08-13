import { List, Progress, Text, useMantineTheme } from "@mantine/core";
import { IconGitFork, IconStar } from "@tabler/icons";

export interface GitHubRepositoryProps {
  repositories: GitHubRepository[];
}

export interface GitHubRepository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  techRatio: TechPie[];
}

export interface TechPie {
  tech: string;
  percentage: number;
  color: string;
}

export const GitHubRepositoryList = ({
  repositories,
}: GitHubRepositoryProps) => {
  const theme = useMantineTheme();

  return (
    <List>
      {repositories.map((item, index) => {
        return (
          <List.Item key={index}>
            <div className={index ? "mt-12" : undefined}>
              <Text className="text-2xl font-semibold">{item.name}</Text>
              <Text className="mt-5 text-xl">{item.description}</Text>
              <div className="mt-5 flex items-center">
                <IconStar
                  color={theme.colors.dark[2]}
                  className="h-5 w-5"
                ></IconStar>
                <Text color={theme.colors.dark[2]} className="ml-1 text-md">
                  {item.stars}
                </Text>
                <IconGitFork
                  color={theme.colors.dark[2]}
                  className="ml-5 h-5 w-5"
                ></IconGitFork>
                <Text color={theme.colors.dark[2]} className="ml-1 text-md">
                  {item.forks}
                </Text>
              </div>
              <Progress
                className="mt-4"
                size="xl"
                radius="md"
                sections={item.techRatio.map((pie) => ({
                  value: pie.percentage,
                  color: pie.color,
                }))}
              ></Progress>
              <div className="mt-5 flex">
                {item.techRatio.map((pie, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${index ? "ml-4" : ""}`}
                    >
                      <div
                        className={`rounded-full w-2 h-2`}
                        style={{
                          background: toHex(pie.color),
                        }}
                      ></div>
                      <Text className="ml-1 text-xs">{pie.tech}</Text>
                      <Text className="ml-1 text-xs">{pie.percentage}%</Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </List.Item>
        );
      })}
    </List>
  );

  function toHex(mantineColorExpression: string): string {
    const [colorName, index] = mantineColorExpression.split(".");
    return theme.colors[colorName][+index];
  }
};
