import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Markup } from "interweave";
import NextImage from "next/image";

// Shared between the public blog page (src/pages/blogs/[blogTitle].tsx) and
// the admin blog editor's live preview (src/components/admin/editor/BlogEditor.tsx)
// so what the editor shows while writing is exactly what ships. body_md
// (markdown, written by the Tiptap editor) is the canonical field — body
// (raw HTML) only remains for the handful of legacy posts that predate the
// Supabase/markdown migration and have never been re-saved since.
const BlogBody: React.FC<{ body?: string | null; body_md?: string | null }> = ({
  body,
  body_md,
}) => {
  if (body_md) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // react-markdown/remark-gfm pass extra bookkeeping props to
          // custom renderers (`node`, and for lists `ordered`/`checked`/
          // `index`/`siblingCount`) that aren't valid DOM attributes —
          // spreading them straight onto a native element throws React
          // "unknown attribute" warnings (e.g. `ordered={false}` on <li>).
          // Each renderer below destructures those out before spreading
          // the rest onto the element.
          h1: ({ node, level, ...rest }) => (
            <h2
              className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter"
              {...rest}
            />
          ),
          h2: ({ node, level, ...rest }) => (
            <h3 className="mt-10 mb-4 text-3xl font-bold" {...rest} />
          ),
          h3: ({ node, level, ...rest }) => (
            <h4 className="mt-8 mb-3 text-2xl font-semibold" {...rest} />
          ),
          p: ({ node, ...rest }) => (
            <p
              {...rest}
              style={{
                margin: "2rem auto",
              }}
            />
          ),
          li: ({ node, ordered, checked, index, siblingCount, ...rest }) => (
            <li
              {...rest}
              style={{
                margin: "0.5rem 3rem",
              }}
            />
          ),
          blockquote: ({ node, ...rest }) => (
            <blockquote
              className="my-6 border-l-4 border-yellow-700/60 pl-4 italic text-muted-foreground"
              {...rest}
            />
          ),
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              <span className="relative my-6 block h-[40vh] w-full">
                <NextImage
                  src={src}
                  alt={alt ?? ""}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </span>
            ) : null,
          a: ({ node, ...rest }) => (
            <a
              {...rest}
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
    );
  }

  return <Markup content={body ?? ""} />;
};

export default BlogBody;
