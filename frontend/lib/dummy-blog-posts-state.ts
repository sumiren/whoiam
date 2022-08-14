import { BlogPost } from "../components/blog-list";
import { Dispatch, SetStateAction, useState } from "react";

export const useDummyBlogPostsState = (): DummyBlogPostsState => {
  const [blogPosts, setBlogPosts] = useState(dummyBlogPosts.slice(0,5));
  return new DummyBlogPostsState(blogPosts, setBlogPosts);
};

class DummyBlogPostsState {
  readonly blogPosts: BlogPost[];
  private readonly setBlogPosts: Dispatch<
    SetStateAction<{ id: string, header: string; description: string; date: string }[]>
    >;

  constructor(
    blogPosts: BlogPost[],
    setBlogPosts: Dispatch<
      SetStateAction<{ id: string, header: string; description: string; date: string }[]>
      >
  ) {
    this.blogPosts = blogPosts;
    this.setBlogPosts = setBlogPosts;
  }

  async loadMorePosts() {
    await delay(3000);
    this.setBlogPosts(dummyBlogPosts.slice(0,this.blogPosts.length + 5));
    return { moreDataYet: this.blogPosts.length < 10 };
  }
}

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const dummyBlogPosts: BlogPost[] =
  [...Array(50)].map((_, index) => ({
    id: `QWERTYUI-${index}`,
    header: `index ${index} page`,
    description:
      `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
    date: "2022.07.11",
  }));
