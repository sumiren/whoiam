import { createClient } from "microcms-js-sdk";
import { stripHtml } from "string-strip-html";
import { format } from "date-fns";
import { BlogPost } from "../types/blog-post";
import { useState } from "react";
import { Contact } from "../types/contact";

export type BlogRecord = {
  id: string;
  header: string;
  content: string;
  publishedDate: string;
};

export type ContactRecord = {
  id: string;
  email: string;
  name: string;
  message: string;
};

type LoaderSource = (
  blogPosts: BlogPost[]
) => [BlogPost[], () => Promise<{ moreDataYet: boolean }>];

export const fetchBlogPosts = async () => {
  const client = getClient();
  return (await client.getList<BlogRecord>({ endpoint: "blogs" })).contents.map(
    toBlogPost
  );
};

export const fetchBlogPost = async (id: BlogPost["id"]) => {
  const client = getClient();
  const blogRecord = await client.getListDetail<BlogRecord>({
    endpoint: "blogs",
    contentId: id,
  });
  return toBlogPost(blogRecord);
};

export const insertContact = async (contactContent: Omit<Contact, "id">) => {
  const client = getClient();
  await client.create<Omit<ContactRecord, "id">>({
    endpoint: "contacts",
    content: contactContent,
  });
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

const getClient = () => {
  console.log(process.env.MICROCMS_DOMAIN_NAME);
  console.log(process.env.MICROCMS_ADMIN_KEY);
  return createClient({
    serviceDomain: process.env.MICROCMS_DOMAIN_NAME!,
    apiKey: process.env.MICROCMS_ADMIN_KEY!,
  });
};

const toBlogPost = (blogRecord: BlogRecord) => {
  return {
    id: blogRecord.id,
    header: blogRecord.header,
    content: blogRecord.content,
    description: stripHtml(blogRecord.content, {
      stripTogetherWithTheirContents: ["h1", "h2", "h3", "h4", "h5"],
    }).result,
    date: format(new Date(blogRecord.publishedDate), "yyyy.MM.dd"),
  };
};
