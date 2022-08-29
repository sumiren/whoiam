import { List, Text } from "@mantine/core";
import Link from "next/link";
import { BlogPost } from "../types/blog-post";

export interface BlogListProps {
  blogPosts: BlogPost[];
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
                  <Link href={`/blog/${item.id}`}>
                    <Text className="text-2xl" component="a">
                      {item.header}
                    </Text>
                  </Link>
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
