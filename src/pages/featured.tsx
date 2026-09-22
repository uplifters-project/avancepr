import { getLatestNews } from "@/lib/queries";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Head from "next/head";
import NewsCard from "@/components/cards/news-card";

const FeaturedPage: NextPage<{
  news: News[];
}> = ({ news }) => {
  return (
    <PageLaypout heading="We got Featured" label="">
      <Head>
        <title>Avance PR in the News – Media Features & Press Coverage</title>
        <meta name="description" content="See where Avance PR and its clients have been featured in the press and media coverage." />
        <link rel="canonical" href="https://www.avancepr.in/featured" />
        <meta property="og:title" content="Avance PR in the News – Media Features & Press Coverage" />
        <meta property="og:description" content="See where Avance PR and its clients have been featured in the press and media coverage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/featured" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
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
  const news = await getLatestNews();

  return {
    props: {
      news,
    },
    revalidate: REVALIDATE_TIME.FEATURED_PAGE,
  };
};

export default FeaturedPage;
