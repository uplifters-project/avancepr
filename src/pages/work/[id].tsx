import PageLaypout from "@/components/layouts/page-layout";
import { getOurWork } from "@/lib/apis";
import { REVALIDATE_TIME } from "@/lib/constants";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { Markup } from "interweave";

interface BlogPageProps {
  error?: string | null;
  work: Work;
}

const BlogPage: NextPage<BlogPageProps> = ({ error, work }) => {
  const { id, image, banner, content, description, created_at, updated_at } =
    work;

  if (error) {
    <PageLaypout
      heading="Not Found"
      label={`Blog with given ID does not exists, please go back to homepage`}
    >
      <p>{error}</p>
    </PageLaypout>;
  }

  return (
    <PageLaypout heading={content} label={""} className="text-center">
      <div className="mt-8 mx-auto mb-4 h-[50vh] max-h-[50vh] max-w-full">
        {image ? (
          <Image
            src={banner}
            alt="Blog Image"
            fill
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

      {/* <p className="mb-12 text-muted-foreground">{credits}</p> */}

      {/* TODO: Text Overflow */}
      <div className="overflow-auto text-left text-lg">
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
          {description}
        </ReactMarkdown>
      </div>
    </PageLaypout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const workItems = await getOurWork();

  const paths = workItems.map((work) => {
    return { params: { id: work.id.toString() } };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;

  try {
    const workId = parseInt(id?.toString() ?? "");
    const workItems = await getOurWork();

    const work = workItems.find((w) => w.id === workId);

    if (!work || work.id !== workId) {
      throw new Error("Work not found");
    }

    return {
      props: {
        error: null,
        work: work,
      },
      revalidate: REVALIDATE_TIME.WORK_PAGES,
    };
  } catch (e: any) {
    return {
      props: {
        work: null,
        error: e?.message ?? "Failed to get work",
      },
      revalidate: REVALIDATE_TIME.WORK_PAGES,
    };
  }
};

export default BlogPage;
