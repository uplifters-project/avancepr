import { getOurWork } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import WorkCard from "@/components/cards/work-card";

const AboutPage: NextPage<{}> = ({}) => {
  return (
    <PageLaypout heading="About Us" label="">
      <h1>About Us</h1>
    </PageLaypout>
  );
};

export default AboutPage;
