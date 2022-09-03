import type { NextPage } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { PortfolioList } from "../components/portfolio-list";
import { GetStaticProps } from "next";
import { fetchPortfolios } from "../lib/microcms-gateway";
import { Portfolio } from "../types/portfolio";

type Props = {
  portfolios: Portfolio[];
};

const Portfolio: NextPage<Props> = ({ portfolios }) => {
  return (
    <div>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline="Portfolio">
            <PortfolioList portfolios={portfolios} />
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default Portfolio;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      portfolios: await fetchPortfolios(),
    },
    revalidate: 30,
  };
};
