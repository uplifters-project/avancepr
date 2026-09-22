import PageLaypout from "@/components/layouts/page-layout";
import { getBlogById, getBlogs } from "@/lib/queries";
import { REVALIDATE_TIME, SITE_URL } from "@/lib/constants";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BlogBody from "@/components/blog/BlogBody";

interface BlogPageProps {
  error?: string | null;
  blog: Blog | null;
}

const BlogPage: NextPage<BlogPageProps> = ({ error, blog }) => {
  if (error || !blog) {
    return (
      <PageLaypout
        heading="Not Found"
        label="This blog does not exist, please go back to homepage"
      >
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <p>{error}</p>
      </PageLaypout>
    );
  }

  const { id, title, body, body_md, author, image, credits } = blog;
  const canonicalUrl = `${SITE_URL}/blogs/${id}`;
  const description = `Read "${title}" by ${author} on the Avance PR blog.`;

  return (
    <PageLaypout heading={title} label={author} className="text-center">
      <Head>
        <title>{title} – Avance PR Blog</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {image && <meta property="og:image" content={image} />}
      </Head>
      <div className="mt-8 mx-auto mb-4 h-[50vh] max-h-[50vh] max-w-full">
        {image ? (
          <Image
            src={image}
            alt="Blog Image"
            fill
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
            className="h-full w-auto !relative"
          />
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "lightgrey",
              borderRadius: "0.5rem",
            }}
          ></div>
        )}
      </div>

      <p className="mb-12 text-muted-foreground">{credits}</p>

      <div className="text-left text-lg">
        <BlogBody body={body} body_md={body_md} />
      </div>
    </PageLaypout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const blogs = await getBlogs();

  const paths = blogs.map((blog) => {
    return { params: { blogTitle: blog.id.toString() } };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const blogTitle = context?.params?.blogTitle;

  try {
    const blogId = parseInt(blogTitle?.toString() ?? "");
    const blog = await getBlogById(blogId);

    if (!blog || blog.id !== blogId) {
      throw new Error("Blog not found");
    }

    return {
      props: {
        error: null,
        blog,
      },
      revalidate: REVALIDATE_TIME.BLOG_PAGES,
    };
  } catch (e: any) {
    return {
      props: {
        blog: null,
        error: e?.message ?? "Failed to get blog",
      },
      revalidate: REVALIDATE_TIME.BLOG_PAGES,
    };
  }
};

export default BlogPage;
