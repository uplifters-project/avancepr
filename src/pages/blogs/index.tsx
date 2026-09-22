import { getBlogs } from "@/lib/queries";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Head from "next/head";

import BlogCard from "@/components/cards/blog-cards";

const BlogsPage: NextPage<{
  blogs: BlogPreview[];
}> = ({ blogs }) => {
  return (
    <PageLaypout heading="Blogs" label="">
      <Head>
        <title>Blog – PR & Communications Insights | Avance PR</title>
        <meta name="description" content="Insights on public relations, media strategy, influencer marketing & crisis communication from the Avance PR team." />
        <link rel="canonical" href="https://www.avancepr.in/blogs" />
        <meta property="og:title" content="Blog – PR & Communications Insights | Avance PR" />
        <meta property="og:description" content="Insights on public relations, media strategy, influencer marketing & crisis communication from the Avance PR team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/blogs" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {blogs.map((item) => (
          <BlogCard blog={item} key={item.id} />
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const blogs = await getBlogs();

  return {
    props: {
      blogs,
    },
    revalidate: REVALIDATE_TIME.BLOG_PAGES,
  };
};

export default BlogsPage;
