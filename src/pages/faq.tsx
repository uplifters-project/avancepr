import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Head from "next/head";
import WorkCard from "@/components/cards/work-card";
import { faqData } from "@/lib/data";
import FAQs from "@/components/app/faq";

const FAQPage: NextPage<{
  faq: FAQ[];
}> = ({ faq }) => {
  return (
    <PageLaypout heading="FAQs" label="All your questions answered">
      <Head>
        <title>FAQs – Avance PR</title>
        <meta name="description" content="Answers to common questions about Avance PR's public relations, media, influencer & crisis communication services." />
        <link rel="canonical" href="https://www.avancepr.in/faq" />
        <meta property="og:title" content="FAQs – Avance PR" />
        <meta property="og:description" content="Answers to common questions about Avance PR's public relations, media, influencer & crisis communication services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/faq" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
      <FAQs faq={faq} />
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const faq = faqData;

  return {
    props: {
      faq,
    },
    revalidate: REVALIDATE_TIME.FAQPAGE,
  };
};

export default FAQPage;
