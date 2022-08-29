import { createClient } from "microcms-js-sdk";
import { stripHtml } from "string-strip-html";
import { format } from "date-fns";
import { BlogPost } from "../types/blog-post";
import { useState } from "react";

export type BlogRecord = {
  id: string;
  header: string;
  content: string;
  publishedDate: string;
};

type Fetch = () => Promise<BlogPost[]>;
type LoaderSource = (
  blogPosts: BlogPost[]
) => [BlogPost[], () => Promise<{ moreDataYet: boolean }>];

let cache: BlogPost[] | undefined;

export const fetchBlogRecords: Fetch = async () => {
  if (cache !== undefined) {
    return cache;
  }

  const client = createClient({
    serviceDomain: "n5gsdhwxor",
    apiKey: "143c3885c93248da94844ed2723dd3c365fb",
  });
  cache = (
    await client.getList<BlogRecord>({ endpoint: "blogs" })
  ).contents.map((item) => ({
    id: item.id,
    header: item.header,
    content: item.content,
    description: stripHtml(item.content, {
      stripTogetherWithTheirContents: ["h1", "h2", "h3", "h4", "h5"],
    }).result,
    date: format(new Date(item.publishedDate), "yyyy.MM.dd"),
  }));
  return cache;
};

export const useLoaderSource: LoaderSource = (blogPosts: BlogPost[]) => {
  const [limitedBlogPosts, setLimitedBlogPosts] = useState(
    blogPosts.slice(0, 1)
  );
  const loadMorePosts = async () => {
    await delay(2000);
    const moreDataYet = blogPosts.length > limitedBlogPosts.length + 2;
    setLimitedBlogPosts(blogPosts.slice(0, limitedBlogPosts.length + 2));
    return { moreDataYet };
  };
  return [limitedBlogPosts, loadMorePosts];
};

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
