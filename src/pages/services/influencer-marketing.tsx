import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import Image from "next/image";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import Head from "next/head";

const data = [
  {
    heading:
      "Influencer Strategy & Campaign Design: Turning Objectives Into Authentic Engagement",
    text: "We begin by understanding your brand objectives, audience, and message — then design influencer campaigns that blend creativity with conversion. Every campaign is tailored to spark organic engagement and long-term brand affinity. Our strategic approach ensures that every influencer partnership moves your brand forward, creating meaningful connections that resonate with your target audience.",
  },
  {
    heading:
      "Talent Discovery & Collaboration: Finding the Perfect Voices for Your Brand",
    text: "With access to a wide network of influencers, creators, and digital storytellers across industries, we identify voices that align with your brand ethos. We manage negotiations, briefing, and coordination to ensure seamless execution. From macro creators to micro-influencers and niche community leaders, we connect you with authentic partners who can tell your story in ways that truly matter.",
  },
  {
    heading:
      "Content Planning & Creative Direction: Crafting Stories That Captivate",
    text: "We work closely with influencers to co-create authentic, platform-optimized content that resonates with their audience while staying true to your brand identity. From Instagram reels to YouTube videos — every piece is designed for impact. Our creative direction ensures that each collaboration produces content that feels genuine, engages audiences, and drives meaningful action.",
  },
  {
    heading:
      "Performance Tracking & ROI Measurement: Data-Driven Success",
    text: "Data drives everything we do. We measure engagement, reach, conversions, and sentiment to evaluate campaign effectiveness ensuring your investment translates into tangible outcomes. Our comprehensive analytics provide clear insights into campaign performance, helping you understand not just what worked, but why it worked and how to replicate success.",
  },
  {
    heading:
      "Celebrity & Thought-Leader Endorsements: Elevating Brand Aspirations",
    text: "Beyond digital influencers, we also facilitate collaborations with celebrities, industry leaders, and public figures, helping brands build aspirational value and large-scale awareness. These high-profile partnerships create powerful brand moments that capture attention, drive conversations, and establish your brand as a category leader.",
  },
];

const description = `At AvancePR, we understand that today's audiences trust people more than promotions and that's where influencers become your most powerful storytellers. Our Influencer Marketing services are built to connect brands with authentic voices who inspire, engage, and convert. We don't just collaborate with influencers — we craft strategic partnerships that amplify credibility, drive conversations, and build communities around your brand. From campaign strategy and talent curation to execution and performance analysis, we manage the entire influencer journey ensuring every collaboration aligns with your brand's vision, tone, and target audience. Whether it's macro creators, micro-influencers, or niche community leaders, we help you turn influence into measurable impact. Our approach goes beyond simple endorsements; we create authentic relationships between brands and influencers that result in compelling narratives, genuine engagement, and lasting brand loyalty.`;

const InfluencerMarketingPage: NextPage<{}> = ({ }) => {
  return (
    <ServicePageLaypout
      heading="Influencer Marketing"
      label="Transform Influence Into Impact"
      image={EXTERNAL_IMAGES.INCLUENCER_MARKETING}
      title="Where Authentic Voices Meet Brand Stories"
      data={data}
      description={description}
      textRightPadding={true}
    >
      <Head>
        <title>Influencer Marketing Agency India ‐ Avance PR</title>
        <meta name="description" content="Avance PR connects you with relevant influencers to amplify your brand. End-to-end influencer campaigns for lifestyle, tech & consumer brands." />
        <meta property="og:title" content="Influencer Marketing Agency India ‐ Avance PR" />
        <meta property="og:description" content="Avance PR connects you with relevant influencers to amplify your brand. End-to-end influencer campaigns for lifestyle, tech & consumer brands." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/influencer-marketing" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
    </ServicePageLaypout>
  );
};

export default InfluencerMarketingPage;