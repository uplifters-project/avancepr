import { NextPage } from "next";
import ServicePageLaypout from "@/components/layouts/service-page-layout";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Head from "next/head";

const data = [
  {
    heading: "Brand Launch PR",
    text: "We help startups make a powerful first impression with launch campaigns that grab attention. From press releases and founder stories to curated media coverage, we ensure your brand's debut creates impact from day one.",
  },
  {
    heading: "Investor & Funding Communication",
    text: "Whether it's announcing a seed round or scaling after Series A, we craft funding stories that not only highlight your growth but also build investor confidence. Our messaging focuses on vision, traction, and innovation the three pillars investors look for.",
  },
  {
    heading: "Founder Profiling & Thought Leadership",
    text: "We position founders as industry voices through interviews, guest articles, LinkedIn storytelling, and panel placements. The goal is to make your leadership visible, relatable, and credible in the eyes of media, partners, and customers.",
  },
  {
    heading: "Product & Innovation Showcasing",
    text: "We amplify product milestones and innovations through targeted media outreach, influencer seeding, and digital storytelling, ensuring your technology or offering gets noticed by the right audience at the right time.",
  },
  {
    heading: "Crisis & Reputation Management",
    text: "For startups, reputation is currency. We help you anticipate, navigate, and resolve communication challenges with speed and sensitivity protecting your brand image while maintaining stakeholder trust.",
  },
];

const description = `At Avance PR, we understand that every startup begins with a bold idea but to scale, it needs a strong story. Our Startup PR services are designed to help emerging brands build credibility, attract investors, and gain media visibility in crowded markets. We specialize in positioning founders as thought leaders, crafting compelling launch narratives, and creating momentum that drives both attention and trust.

We know startups move fast so we move faster. From pre-launch buzz to post-funding visibility, our agile and insight-driven approach ensures your communication aligns with your business goals, funding stage, and market priorities. At Avance PR, we don't just create news, we build reputations that grow with your company.`;

// Extracted checkmark icon component
const CheckmarkIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

// Extracted service item component
const ServiceItem = ({
  heading,
  text,
  className
}: {
  heading: string;
  text: string;
  className?: string
}) => (
  <div className={cn("flex flex-col", className)}>
    <div className="flex justify-start items-center mb-2">
      <CheckmarkIcon />
      <h3 className="font-heading text-2xl font-bold">{heading}</h3>
    </div>
    <p className="mb-6">{text}</p>
  </div>
);

const PRForStartups: NextPage = () => {
  return (
    <ServicePageLaypout
      heading="PR For Startups"
      label=""
      image={EXTERNAL_IMAGES.CONTENT_MARKETING}
      title=""
      data={data}
      description={description}
      useOnlyChild={true}
    >

      <Head>
        <title>Top Startup PR Agency in India | Avance PR</title>
        <meta name="description" content="Avance PR empowers startups with strategic storytelling, media visibility, and founder positioning to build credibility and attract investors." />
        <meta property="og:title" content="Top Startup PR Agency in India | Avance PR" />
        <meta property="og:description" content="Avance PR empowers startups with strategic storytelling, media visibility, and founder positioning to build credibility and attract investors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/startup-pr" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>

      <div className="text-gray-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 w-full gap-4 md:text-left">
        {data.map((item, index) => (
          <ServiceItem
            key={item.heading}
            heading={item.heading}
            text={item.text}
            className={cn(
              // Make the last item span full width on medium screens
              index === 4 && "md:col-span-2 lg:col-span-1"
            )}
          />
        ))}
      </div>
    </ServicePageLaypout>
  );
};

export default PRForStartups;