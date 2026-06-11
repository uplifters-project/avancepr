import { getOurWork } from "@/lib/apis";
import { fetchWithCache } from "@/lib/static-cache";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import WorkCard from "@/components/cards/work-card";

const FeaturedPage: NextPage<{
  work: Work[];
}> = ({ work }) => {
  return (
    <PageLaypout heading="Our Work" label="">
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {work.map((item) => (
          <WorkCard work={item} />
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const work = await fetchWithCache("our_work", getOurWork);

  return {
    props: {
      work,
    },
    revalidate: REVALIDATE_TIME.FEATURED_PAGE,
  };
};

export default FeaturedPage;
