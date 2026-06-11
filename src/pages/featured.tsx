import { getLatestNews } from "@/lib/apis";
import { fetchWithCache } from "@/lib/static-cache";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import NewsCard from "@/components/cards/news-card";

const FeaturedPage: NextPage<{
  news: News[];
}> = ({ news }) => {
  return (
    <PageLaypout heading="We got Featured" label="">
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {news.map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
            <NewsCard news={item} />
          </a>
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const news = await fetchWithCache("latest_news", getLatestNews);

  return {
    props: {
      news,
    },
    revalidate: REVALIDATE_TIME.FEATURED_PAGE,
  };
};

export default FeaturedPage;
