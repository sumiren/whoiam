import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Text, ThemeIcon } from "@mantine/core";
import { IconBrandTwitter, IconBrandFacebook } from "@tabler/icons";

const About: NextPage = () => {
  const pink = "bg-pink-600";

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={pink + " px-4 py-10 text-white"}>
          <Text className="text-4xl font-bold">Sumiren Portfolio</Text>
          <Text className="mt-2 text-l font-semibold">
            Aboutページです
          </Text>
          <div className="mt-10">
            <ThemeIcon variant="filled" className={pink}>
              <IconBrandTwitter></IconBrandTwitter>
            </ThemeIcon>
            <ThemeIcon variant="filled" className={pink}>
              <IconBrandFacebook></IconBrandFacebook>
            </ThemeIcon>
          </div>
        </section>
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


export default About;
