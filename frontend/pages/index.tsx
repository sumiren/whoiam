import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Text, ThemeIcon } from "@mantine/core";
import { IconBrandTwitter, IconBrandFacebook } from "@tabler/icons";
import { ViewButton } from "../components/view-button";
import { BlogList } from "../components/blog-list";
import { PortfolioList } from "../components/portfolio-list";
import { SimpleHeadlineAndTitleSection } from "../components/simple-headline-and-title-section";
import {
  GitHubRepository,
  GitHubRepositoryList,
} from "../components/github-repository-list";
import { useEffect, useState } from "react";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { fetchBlogPosts, fetchPortfolios } from "../lib/microcms-gateway";
import { BlogPost } from "../types/blog-post";
import { Portfolio } from "../types/portfolio";
import { useLg } from "../lib/mediaqueries";
import { Tweet, TwitterList } from "../components/twitter-list";

type Props = {
  blogPosts: BlogPost[];
  portfolios: Portfolio[];
};

const Home: NextPage<Props> = ({ blogPosts, portfolios }: Props) => {
  const pink = "bg-pink-600";
  const lg = useLg();
  const [shownPortfolios, setShownPortfolios] = useState(
    portfolios.slice(0, 3)
  );
  const repositories: GitHubRepository[] = [...Array(2)].map((_) => ({
    name: "sumiren/bookapp",
    description:
      "control tsundoku books and manage your life of reading nice books.",
    stars: 30,
    forks: 5,
    techRatio: [
      {
        tech: "TypeScript",
        percentage: 50,
        color: "yellow.5",
      },
      {
        tech: "Ruby on Rails",
        percentage: 40,
        color: "red.5",
      },
      {
        tech: "Other",
        percentage: 10,
        color: "dark.0",
      },
    ],
  }));
  useEffect(() => {
    setShownPortfolios(lg ? portfolios : portfolios.slice(0, 3));
  }, [lg, portfolios]);

  const tweets: Tweet[] = [...Array(3)].map((_) => ({
    avatar: "/avatar.jpeg",
    name: "sumiren_t",
    displayName: "sumiren",
    date: "5月25日",
    content:
      "📣 新サービス「Noway Form」をリリースしました！ <br><br>Noway Formは、Notionのデータベースをもとにフォームを作成できるサービスです。これまでGoogle FormsでやっていたことがNotionだけで完結します✌✨ <br><br>試しに使っていただけると幸いです😊 <br><br><a href='https://www.noway-form.com/ja' style='text-decoration: underline'>https://www.noway-form.com/ja</a>",
  }));

  return (
    <div>
      <Head>
        <title>Sumiren Portfolio</title>
        <meta name="description" content="Sumiren Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className={pink + " py-10"}>
          <div className="flex justify-center text-white">
            <div className="w-full lg:flex lg:justify-between">
              <div>
                <Text className="text-3xl font-bold">Sumiren Portfolio</Text>
                <Text className="mt-2 text-m font-semibold">
                  sumirenのポートフォリオのためのページです
                </Text>
              </div>
              <div className="mt-10">
                <ThemeIcon variant="filled" className={pink}>
                  <IconBrandTwitter></IconBrandTwitter>
                </ThemeIcon>
                <ThemeIcon variant="filled" className={pink}>
                  <IconBrandFacebook></IconBrandFacebook>
                </ThemeIcon>
              </div>
            </div>
          </div>
        </PaddingXWrapper>
        <PaddingXWrapper>
          <div className="mt-10">
            <SimpleHeadlineAndTitleSection headline="Blog">
              <BlogList blogPosts={blogPosts.slice(0, 3)} />
              <div className="flex justify-center mt-10">
                <ViewButton text="View All" href="/blog"></ViewButton>
              </div>
            </SimpleHeadlineAndTitleSection>
          </div>

          <div className="mt-20 lg:mt-32">
            <SimpleHeadlineAndTitleSection headline="Portfolio">
              <PortfolioList portfolios={shownPortfolios} />
              <div className="flex justify-center mt-10">
                <ViewButton text="View All" href="/portfolio"></ViewButton>
              </div>
            </SimpleHeadlineAndTitleSection>
          </div>

          <div className="lg:flex lg:justify-between ">
            <div className="mt-20 lg:mt-32 lg:w-5/12">
              <SimpleHeadlineAndTitleSection headline="GitHub">
                <GitHubRepositoryList repositories={repositories} />
                <div className="flex justify-center mt-14">
                  <ViewButton
                    text="View on GitHub"
                    href="https://github.com/sumiren"
                  ></ViewButton>
                </div>
              </SimpleHeadlineAndTitleSection>
            </div>

            <div className="mt-20 lg:mt-32 lg:w-6/12 ">
              <SimpleHeadlineAndTitleSection headline="Twitter">
                <TwitterList tweets={tweets} />
                <div className="flex justify-center mt-10">
                  <ViewButton text="View on Twitter" href="/blog"></ViewButton>
                </div>
              </SimpleHeadlineAndTitleSection>
            </div>
          </div>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: await fetchBlogPosts(),
      portfolios: await fetchPortfolios(),
    },
    revalidate: 30,
  };
};

export default Home;
