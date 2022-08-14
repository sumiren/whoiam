import { List, Text } from "@mantine/core";
import Link from "next/link";

export interface BlogListProps {
  blogPosts: BlogPost[];
}

export interface BlogPost {
  id: string,
  header: string;
  description: string;
  date: string;
}

export const BlogList = (props: BlogListProps) => {
  const { blogPosts } = props;

  return (
    <div>
      {
        <List>
          {blogPosts.map((item, index) => {
            return (
              <List.Item key={index}>
                <div className={index ? "mt-8" : ""}>
                  <Link href={`/blog/${item.id}`}><Text className="text-2xl" component="a">{item.header}</Text></Link>
                  <Text className="mt-4 text-base" lineClamp={2}>
                    {item.description}
                  </Text>
                  <Text className="mt-4 text-sm">{item.date}</Text>
                </div>
              </List.Item>
            );
          })}
        </List>
      }
    </div>
  );
};
