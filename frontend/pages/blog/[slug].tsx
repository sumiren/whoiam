import Head from "next/head";
import PaddingXWrapper from "../../components/padding-x-wrapper";
import SimpleHeadlineAndTitleSection from "../../components/simple-headline-and-title-section";
import {BlogPost as BlogPostData} from "../../components/blog-list";
import {GetStaticPaths, GetStaticProps} from "next";
import {dummyBlogPosts} from "../../lib/dummy-blog-posts-state";

const BlogPost = ({blogPost}: {blogPost: BlogPostData}) => {

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
            <div></div>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await fetchBlogPosts()).map(blogPost => ({ params: { slug: blogPost.id  }})),
    fallback: false, // can also be true or 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const blogPost = (await fetchBlogPosts()).filter(item => item.id === ((context.params as any).slug))[0];
  return {
    props: {
      blogPost
    }
  }
}

const fetchBlogPosts = async () => {
  return dummyBlogPosts;
}

export default BlogPost
