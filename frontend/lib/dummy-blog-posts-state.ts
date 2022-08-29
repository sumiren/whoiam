import { Dispatch, SetStateAction, useState } from "react";
import { BlogPost } from "../types/blog-post";

export const useDummyBlogPostsState = (): DummyBlogPostsState => {
  const [blogPosts, setBlogPosts] = useState(dummyBlogPosts.slice(0, 5));
  return new DummyBlogPostsState(blogPosts, setBlogPosts);
};

class DummyBlogPostsState {
  readonly blogPosts: BlogPost[];
  private readonly setBlogPosts: Dispatch<SetStateAction<BlogPost[]>>;

  constructor(
    blogPosts: BlogPost[],
    setBlogPosts: Dispatch<SetStateAction<BlogPost[]>>
  ) {
    this.blogPosts = blogPosts;
    this.setBlogPosts = setBlogPosts;
  }

  async loadMorePosts() {
    await delay(2000);
    this.setBlogPosts(dummyBlogPosts.slice(0, this.blogPosts.length + 5));
    return { moreDataYet: this.blogPosts.length < 10 };
  }
}

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const dummyBlogPosts: BlogPost[] = [...Array(50)].map((_, index) => ({
  id: `QWERTYUI-${index}`,
  header: `index ${index} page`,
  description: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
  content: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
  date: "2022.07.11",
}));
