import type { NextPage } from "next";
import Head from "next/head";
import SimpleHeadlineAndTitleSection from "../components/simple-headline-and-title-section";
import PaddingXWrapper from "../components/padding-x-wrapper";
import { TextInput, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormValues {
  email: string;
  name: string;
  message: string;
}

const Contact: NextPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "email is invalid."),
    },
  });

  const handleValidationPassed = async (values: FormValues) => {
    await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        message: values.message,
      }),
    });
  };

  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaddingXWrapper className="pt-8">
          <SimpleHeadlineAndTitleSection headline="Contact">
            <form onSubmit={form.onSubmit(handleValidationPassed)}>
              <TextInput
                required
                label="Email"
                placeholder="your@email.com"
                className="mt-5"
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Name"
                placeholder="Taro Yamada"
                className="mt-5"
                {...form.getInputProps("name")}
              />
              <Textarea
                required
                label="Your Message"
                placeholder="Your message"
                autosize
                minRows={2}
                className="mt-5"
                {...form.getInputProps("message")}
              />
              <div className="flex justify-center mt-10">
                <Button type="submit" size="lg">
                  Send message
                </Button>
              </div>
            </form>
          </SimpleHeadlineAndTitleSection>
        </PaddingXWrapper>
      </main>
    </div>
  );
};

export default Contact;
