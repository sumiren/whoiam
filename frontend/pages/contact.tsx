import type { NextPage } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { PortfolioList } from "../components/portfolio-list";
import { dummyPortfolios } from "../lib/dummy-portfolios";

const Contact: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Conctact</title>
        <meta name="description" content="Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline="Portfolio">
            <PortfolioList portfolios={dummyPortfolios} />
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default Contact;
