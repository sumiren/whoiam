import Head from "next/head";
import PaddingXWrapper from "../../components/padding-x-wrapper";
import SimpleHeadlineAndTitleSection from "../../components/simple-headline-and-title-section";
import { GetStaticPaths, GetStaticProps } from "next";
import { Text, TypographyStylesProvider } from "@mantine/core";
import { BlogPost as BlogPostData } from "../../types/blog-post";
import {fetchBlogPost, fetchBlogPosts} from "../../lib/microcms-blog-gateway";
import { useRouter } from "next/router";

type Props = {
  blogPost: BlogPostData;
};

const BlogPost = ({ blogPost }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ paddingTop: "20px" }}>
        Congratulations! You are the first comer!
        <br />I am rendering the page...
      </div>
    );
  }

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
            <TypographyStylesProvider>
              <Text
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              ></Text>
            </TypographyStylesProvider>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: (await fetchBlogPosts()).map((blogPost) => ({
      params: { slug: blogPost.id, data: blogPost },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const blogPost = await fetchBlogPost(context.params!.slug);
  return {
    props: {
      blogPost,
    },
    revalidate: 30,
  };
};
export default BlogPost;
