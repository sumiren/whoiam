import { List, Text, Avatar } from "@mantine/core";
import { Tweet } from "../lib/twitter-gateway";
import Image from "next/image";

export interface TwitterListProps {
  tweets: Tweet[];
}

export const TwitterList = ({ tweets }: TwitterListProps) => {
  return (
    <List>
      {tweets.map((item, index) => {
        return (
          <List.Item key={index}>
            <div className={`flex ${index ? "mt-8" : ""}`}>
              <div>
                <Avatar
                  src={item.avatar}
                  alt="avatar"
                  radius="xl"
                  size="md"
                  className="mt-1"
                ></Avatar>
              </div>
              <div className="ml-4">
                <div className="flex items-baseline">
                  <Text className="text-2xl font-semibold">
                    {item.displayName}
                  </Text>
                  <Text className="ml-4 text-base text-m_dark-2 font-semibold">
                    @{item.name}
                  </Text>
                  <Text className="ml-4 text-sm text-m_dark-2 font-semibold">
                    {item.date}
                  </Text>
                </div>
                <div className="pt-2">
                  <div
                    className={"whitespace-pre-wrap"}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  {item.images.length ? (
                    <div
                      className={`w-full h-96 relative grid ${
                        item.images.length > 2 ? "grid-cols-2" : "grid-cols-1"
                      } gap-x-2 gap-y-2 mt-4`}
                    >
                      {item.images.map((image) => (
                        <div className="relative" key={image.url}>
                          <Image
                            src={image.url}
                            alt="twitter img"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : undefined}
                </div>
              </div>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
