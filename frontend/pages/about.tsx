import type { NextPage } from "next";
import Head from "next/head";
import { Text } from "@mantine/core";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline="About">
            <div className="flex items-center">
              <Text className="text-3xl font-semibold">sumiren</Text>
              <Text className="ml-4 text-base text-m_dark-2 font-semibold">
                (@sumiren_t)
              </Text>
            </div>
            <Text className="mt-10 text-lg">
              エンジニアリングマネージャ
              <br />兼 フリーランスエンジニア（副業）
            </Text>
            <Text className="mt-6 text-lg font-semibold">得意技術</Text>
            <Text className="mt-2 text-lg">
              AWS Firebase Next.js TypeScript mabl テスト自動化 Salesforce
            </Text>
            <Text className="mt-6 text-lg font-semibold">保持資格</Text>
            <Text className="mt-2 text-lg">
              AWS認定ソリューションアーキテクト - プロフェッショナル | IPA
              高度試験 4種合格
            </Text>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default About;
