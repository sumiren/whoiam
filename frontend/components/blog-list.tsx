import { List, Text } from "@mantine/core";

export interface BlogListProps {
  blogPosts: BlogPost[];
}

export interface BlogPost {
  header: string;
  description: string;
  date: string;
}

export const BlogList = ({ blogPosts }: BlogListProps) => {
  return (
    <List>
      {blogPosts.map((item, index) => {
        return (
          <List.Item key={index}>
            <div className={index ? undefined : "mt-8"}>
              <Text className="text-2xl">{item.header}</Text>
              <Text className="mt-4 text-base" lineClamp={2}>
                {item.description}
              </Text>
              <Text className="mt-4 text-sm">{item.date}</Text>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
