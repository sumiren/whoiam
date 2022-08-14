import type { NextPage } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { BlogList } from "../components/blog-list";
import { DummyBlogPostsState } from "../test-data/dummy-blog-posts-state";
import InfiniteScrollArea from "../components/infinite-scroll-area";

const Blog: NextPage = () => {
  const dummyBlogPostsState = new DummyBlogPostsState();
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline="Blog">
            <BlogList blogPosts={dummyBlogPostsState.blogPosts} />
            <InfiniteScrollArea
              loadMoreData={async () =>
                await dummyBlogPostsState.loadMorePosts()
              }
            />
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default Blog;
