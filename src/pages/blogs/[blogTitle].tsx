import PageLaypout from "@/components/layouts/page-layout";
import { getBlogById, getBlogs } from "@/lib/apis";
import { REVALIDATE_TIME } from "@/lib/constants";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { Markup } from "interweave";

interface BlogPageProps {
  error: string | string;
  blog: Blog;
}

const BlogPage: NextPage<BlogPageProps> = ({ error, blog }) => {
  const { id, title, body, body_md, author, image, credits } = blog;

  if (error) {
    <PageLaypout
      heading="Not Found"
      label={`Blog with ID ${id} does not exists, please go back to homepage`}
    >
      <p>{error}</p>
    </PageLaypout>;
  }

  return (
    <PageLaypout heading={title} label={author} className="text-center">
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
        {body_md ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => {
                return (
                  <h2
                    className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter"
                    {...props}
                  />
                );
              },
              p: (props) => (
                <p
                  {...props}
                  style={{
                    margin: "2rem auto",
                  }}
                />
              ),
              li: (props) => (
                <li
                  {...props}
                  style={{
                    margin: "0.5rem 3rem",
                  }}
                />
              ),
              a: (props) => (
                <a
                  {...props}
                  style={{
                    textDecoration: "underline",
                    color: "var(--blue)",
                  }}
                />
              ),
            }}
          >
            {body_md}
          </ReactMarkdown>
        ) : (
          <Markup content={body} />
        )}
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
