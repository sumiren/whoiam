import { Client } from "twitter-api-sdk";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { components } from "twitter-api-sdk/dist/gen/openapi-types";

export const fetchTweets: () => Promise<Tweet[]> = async () => {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN!);
  const twitterPaginatedResponse = await client.tweets.usersIdTweets(
    process.env.TWITTER_USER_ID!,
    {
      max_results: 100,
      "tweet.fields": ["author_id", "entities", "created_at", "attachments"],
      "media.fields": [
        "url",
        "preview_image_url",
        "media_key",
        "width",
        "height",
      ],
      expansions: [
        "author_id",
        "referenced_tweets.id",
        "attachments.media_keys",
      ],
    }
  );
  const twitterAuthorResponse = await client.users.findUserById(
    process.env.TWITTER_USER_ID!,
    {
      "user.fields": ["profile_image_url"],
    }
  );

  console.log(JSON.stringify(twitterPaginatedResponse.data, undefined, 2));
  console.log(JSON.stringify(twitterPaginatedResponse.includes, undefined, 2));
  console.log(JSON.stringify(twitterAuthorResponse.data, undefined, 2));

  const media: {
    height?: number | undefined;
    media_key?: string | undefined;
    type: string;
    width?: number | undefined;
    url: string;
  }[] = twitterPaginatedResponse.includes!.media as any;
  return twitterPaginatedResponse.data!.map((item) => ({
    avatar: twitterAuthorResponse.data!.profile_image_url!,
    name: twitterAuthorResponse.data!.username,
    displayName: twitterAuthorResponse.data!.name,
    date: format(new Date(item.created_at!), "M月d日", { locale: ja }),
    content: item.text,
    tweetType: getTweetType(item.referenced_tweets),
    referencedTweetIds: item.referenced_tweets?.map((item) => item.id) ?? [],
    images:
      item.attachments?.media_keys?.map((u) => {
        return {
          url: media!.find((m) => m.media_key === u)!.url,
        };
      }) ?? [],
  }));
};

const getRetweeted = (
  referencedTweets?: {
    id: components["schemas"]["TweetId"];
    type: "retweeted" | "quoted" | "replied_to";
  }[]
) => {
  return referencedTweets?.filter((t) => t.type === "retweeted");
};
const getRepliedTo = (
  referencedTweets?: {
    id: components["schemas"]["TweetId"];
    type: "retweeted" | "quoted" | "replied_to";
  }[]
) => {
  return referencedTweets?.filter((t) => t.type === "replied_to");
};
const getQuoted = (
  referencedTweets?: {
    id: components["schemas"]["TweetId"];
    type: "retweeted" | "quoted" | "replied_to";
  }[]
) => {
  return referencedTweets?.filter((t) => t.type === "quoted");
};
const getTweetType: (
  referencedTweets?: {
    id: components["schemas"]["TweetId"];
    type: "retweeted" | "quoted" | "replied_to";
  }[]
) => "normal" | "reply" | "quote" | "retweet" = (referencedTweets) => {
  if (!referencedTweets?.length) {
    return "normal";
  }
  if (getRepliedTo(referencedTweets)?.length) {
    return "reply";
  }
  if (getQuoted(referencedTweets)?.length) {
    return "quote";
  }
  return "retweet";
};

export interface Tweet {
  avatar: string;
  displayName: string;
  name: string;
  date: string;
  content: string;
  tweetType: "normal" | "reply" | "quote" | "retweet";
  referencedTweetIds: string[];
  images: { url: string }[];
}
