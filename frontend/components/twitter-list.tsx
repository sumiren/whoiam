import { List, Text, Avatar } from "@mantine/core";

export interface TwitterListProps {
  tweets: Tweet[];
}

export interface Tweet {
  avatar: string;
  displayName: string;
  name: string;
  date: string;
  content: string;
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
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </div>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
