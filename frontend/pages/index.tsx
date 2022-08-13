import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandTwitter, IconBrandFacebook } from "@tabler/icons";
import { ReactNode } from "react";
import { ViewButton } from "../components/view-button";
import { BlogList } from "../components/blog-list";
import { Portfolio, PortfolioList } from "../components/portfolio-list";

const Home: NextPage = () => {
  const pink = "bg-pink-600";
  const blogPosts = [...Array(5)].map((_) => ({
    header: "This is a header",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    date: "2022.07.11",
  }));
  const portfolios: Portfolio[] = [...Array(2)].map((_) => ({
    thumbnail: "/portfolio-thumbnail.png",
    title: "sumiren ブログ",
    description:
      "技術ブログをやっています。フルスタックエンジニアの浅く広めの技術発信が中心です。月に4本くらい発信します",
    period: "2022.05 -",
  }));

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={pink + " px-4 py-10 text-white"}>
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4 lg:flex lg:justify-between">
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
        </section>

        <div className="my-10">
          <SimpleSection title="Blog">
            <BlogList blogPosts={blogPosts} />
            <div className="flex justify-center">
              <ViewButton text="View All" href="/blog"></ViewButton>
            </div>
          </SimpleSection>
        </div>

        <div className="my-20">
          <SimpleSection title="Portfolio">
            <PortfolioList portfolios={portfolios} />
            <div className="flex justify-center">
              <ViewButton text="View All" href="/blog"></ViewButton>
            </div>
          </SimpleSection>
        </div>
      </main>

      <section className="bg-stone-600 px-4 py-10 text-white mt-20">
        <Text className="text-4xl font-bold">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
      </section>
      <section className="bg-stone-600 px-4 py-10 text-white mt-20">
        <Text className="text-4xl font-bold">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
      </section>

      <section className="bg-stone-600 px-4 py-10 text-white mt-20">
        <Text className="text-4xl font-bold">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
      </section>

      <section className="bg-stone-600 px-4 py-10 text-white mt-20">
        <Text className="text-4xl font-bold">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
        <Text className="text-4xl font-bold mt-4">テスト文言</Text>
      </section>
    </div>
  );
};

const SimpleSection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <>
      <section className="px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-3/4 lg:flex lg:justify-between">
            <div>
              <Text className="text-3xl font-bold">{title}</Text>
              <div className="mt-12">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  console.log("get static props");
  return {
    props: {},
  };
};

export default Home;
