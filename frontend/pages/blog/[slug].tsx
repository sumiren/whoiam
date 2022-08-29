import Head from "next/head";
import PaddingXWrapper from "../../components/padding-x-wrapper";
import SimpleHeadlineAndTitleSection from "../../components/simple-headline-and-title-section";
import { GetStaticPaths, GetStaticProps } from "next";
import { dummyBlogPosts } from "../../lib/dummy-blog-posts-state";
import { Text } from "@mantine/core";
import { BlogPost as BlogPostData } from "../../components/blog-post";

const BlogPost = ({ blogPost }: { blogPost: BlogPostData }) => {
  return (
    <div>
      <Head>
        <title>Blog Detail</title>
        <meta name="description" content="Blog Detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline={blogPost.header}>
            <Text className="mt-4 text-md font-bold text-m_dark-2">
              {blogPost.date}
            </Text>
            <Text className="mt-4 text-lg">{blogPost.content}</Text>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: (await fetchBlogPosts()).map((blogPost) => ({
      params: { slug: blogPost.id },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};
export const getStaticProps: GetStaticProps<
  { blogPost: any },
  { slug: string }
> = async (context) => {
  const blogPost = (await fetchBlogPosts()).filter(
    (item) => item.id === context.params!.slug
  )[0];
  return {
    props: {
      blogPost,
    },
  };
};

const fetchBlogPosts = async () => {
  return dummyBlogPosts;
};

export default BlogPost;
