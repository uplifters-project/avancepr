import { getOurWork } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import WorkCard from "@/components/cards/work-card";
import { faqData } from "@/lib/data";
import FAQs from "@/components/app/faq";

const FAQPage: NextPage<{
  faq: FAQ[];
}> = ({ faq }) => {
  return (
    <PageLaypout heading="FAQs" label="All your questions answered">
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
