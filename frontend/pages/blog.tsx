import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { BlogList } from "../components/blog-list";
import InfiniteScrollArea from "../components/infinite-scroll-area";
import { BlogPost } from "../types/blog-post";
import { fetchBlogPosts, useLoaderSource } from "../lib/microcms-gateway";

type Props = {
  blogPosts: BlogPost[];
};

const Blog: NextPage<Props> = ({ blogPosts }: Props) => {
  const [initialPosts, loadMorePosts] = useLoaderSource(blogPosts);
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
            <BlogList blogPosts={initialPosts} />
            <InfiniteScrollArea loadMoreData={loadMorePosts} />
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: await fetchBlogPosts(),
    },
    revalidate: 30,
  };
};

export default Blog;
