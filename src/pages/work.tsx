import { getOurWork } from "@/lib/queries";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Head from "next/head";
import WorkCard from "@/components/cards/work-card";

const FeaturedPage: NextPage<{
  work: Work[];
}> = ({ work }) => {
  return (
    <PageLaypout heading="Our Work" label="">
      <Head>
        <title>Our Work – Avance PR Case Studies & Client Campaigns</title>
        <meta name="description" content="Explore Avance PR's PR campaigns and client work across startup PR, crisis management, influencer & corporate communication." />
        <link rel="canonical" href="https://www.avancepr.in/work" />
        <meta property="og:title" content="Our Work – Avance PR Case Studies & Client Campaigns" />
        <meta property="og:description" content="Explore Avance PR's PR campaigns and client work across startup PR, crisis management, influencer & corporate communication." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/work" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {work.map((item) => (
          <WorkCard work={item} />
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const work = await getOurWork();

  return {
    props: {
      work,
    },
    revalidate: REVALIDATE_TIME.FEATURED_PAGE,
  };
};

export default FeaturedPage;
