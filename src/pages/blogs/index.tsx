import { getBlogs } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";

import BlogCard from "@/components/cards/blog-cards";

const BlogsPage: NextPage<{
  blogs: BlogPreview[];
}> = ({ blogs }) => {
  return (
    <PageLaypout
      heading="Blogs"
      label="Blog especially curated for students by our experts"
    >
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
