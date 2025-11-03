import { NextPage } from "next";
import ServicePageLaypout from "@/components/layouts/service-page-layout";
import { cn } from "@/lib/utils";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import Head from "next/head";

const data = [
  {
    heading: "Social Media Strategy & Planning",
    text: "We develop platform-specific strategies aligned with your business goals, audience behavior, and brand tone. Every post, campaign, and interaction is guided by a clear objective — from awareness to advocacy.",
  },
  {
    heading: "Content Creation & Calendar Management",
    text: "Our creative team designs visually striking, story-led content including static posts, reels, carousels, and brand stories supported by an organized content calendar for consistency and performance.",
  },
  {
    heading: "Community Engagement & Growth",
    text: "We don't just post, we build conversations. Our engagement specialists ensure active interaction with followers, influencers, and communities to foster trust and strengthen brand loyalty.",
  },
  {
    heading: "Performance Tracking & Optimization",
    text: "We monitor analytics across platforms, tracking metrics like reach, engagement, sentiment, and conversions. Our reports don't just show data, they uncover insights that drive better creative and business outcomes.",
  },
  {
    heading: "Paid Campaigns & Influencer Integrations",
    text: "We combine organic strategies with targeted paid promotions and influencer tie-ins to maximize visibility and ensure every campaign reaches the right audience at the right time.",
  },
];

const description = `At Avance PR, we believe social media is more than just posts and hashtags — it's where your brand builds relationships, reputation, and relevance. Our Social Media Management services are designed to help you create a powerful digital presence that tells your story consistently, creatively, and strategically. From crafting engaging content to driving meaningful engagement, we manage your brand's voice across platforms to ensure it inspires, informs, and influences.

We blend data-driven insights with storytelling expertise to design social strategies that strengthen community connections and amplify visibility. Whether you're a startup looking to build awareness or an established brand aiming to deepen engagement, we ensure your digital footprint reflects your identity and fuels growth.`;

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

const SocialMediaMarketingPage: NextPage = () => {
  return (
    <ServicePageLaypout
      heading="Social Media Management"
      label=""
      image={EXTERNAL_IMAGES.SOCIAL_MEDIA_MARKETING}
      title=""
      data={data}
      description={description}
      useOnlyChild={true}
    >

      <Head>
        <title>Social Media Marketing Agency India ‐ Avance PR</title>
        <meta name="description" content="Let Avance PR create engaging social media strategies, content & campaigns to grow your followers, engagement & brand visibility online." />
        <meta property="og:title" content="Social Media Marketing Agency India ‐ Avance PR" />
        <meta property="og:description" content="Let Avance PR create engaging social media strategies, content & campaigns to grow your followers, engagement & brand visibility online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/social-media-marketing" />
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

export default SocialMediaMarketingPage;