import type { NextPage } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import {Group, TextInput, Button, Textarea} from "@mantine/core";

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
          <SimpleHeadlineAndTitleSection headline="Contact">
            {/*<form onSubmit={form.onSubmit((values) => console.log(values))}>*/}
            <form>
              <TextInput
                required
                label="Email"
                placeholder="your@email.com"
              />
              <TextInput
                required
                label="Email"
                placeholder="your@email.com"
              />
              <Textarea
                required
                label="Email"
                placeholder="your@email.com"
              />

              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default Contact;
