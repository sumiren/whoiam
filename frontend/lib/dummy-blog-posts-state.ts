import { BlogPost } from "../components/blog-list";
import { Dispatch, SetStateAction, useState } from "react";

export const useDummyBlogPostsState = (): DummyBlogPostsState => {
  const [blogPosts, setBlogPosts] = useState(createDummyPosts());
  return new DummyBlogPostsState(blogPosts, setBlogPosts);
};

class DummyBlogPostsState {
  readonly blogPosts: BlogPost[];
  private readonly setBlogPosts: Dispatch<
    SetStateAction<{ header: string; description: string; date: string }[]>
  >;

  constructor(
    blogPosts: BlogPost[],
    setBlogPosts: Dispatch<
      SetStateAction<{ header: string; description: string; date: string }[]>
    >
  ) {
    this.blogPosts = blogPosts;
    this.setBlogPosts = setBlogPosts;
  }

  async loadMorePosts() {
    await delay(3000);
    const moreBlogPosts = createDummyPosts();
    this.setBlogPosts([...this.blogPosts, ...moreBlogPosts]);
    return { moreDataYet: this.blogPosts.length < 10 };
  }
}

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createDummyPosts = () =>
  [...Array(5)].map((_) => ({
    header: "This is a header",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    date: "2022.07.11",
  }));
