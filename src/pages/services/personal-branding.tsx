import { NextPage } from "next";

import ServicePageLayout from "@/components/layouts/service-page-layout";
import Image from "next/image";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import Head from "next/head";

const data = [
  {
    heading:
      "LinkedIn Management: Transform Your Professional Presence Into a Thought Leadership Hub",
    text: "We transform your LinkedIn presence into a powerful storytelling platform. Our team manages your content calendar, ghostwrites strategic posts, and builds engagement with journalists, investors, and peers — turning your profile into a hub of thought leadership and credibility. Every post is crafted to communicate leadership, inspire trust, and create lasting professional impact.",
  },
  {
    heading:
      "Panel Discussions & Industry Forums: Position Your Voice Where It Matters Most",
    text: "We strategically position you in relevant industry panels and conferences to showcase your expertise and network with key decision-makers. From ideation to representation, we ensure your voice adds perspective, authority, and presence in every conversation. Let us help you become the industry leader others look to for insights and innovation.",
  },
  {
    heading:
      "Podcasts & Digital Interviews: Connect Authentically With Your Audience",
    text: "Whether as a guest or host, podcasts are a gateway to authentic connection. We identify the right platforms, curate talking points, and help you communicate your journey and insights in ways that resonate deeply with your audience. Your story deserves to be heard — we make sure it reaches the right ears.",
  },
  {
    heading:
      "Speakerships & Keynote Opportunities: Command the Stage With Authority",
    text: "We help you secure and prepare for keynote sessions, fireside chats, and leadership summits, placing you in front of the right audiences. Every appearance is designed to reinforce your thought leadership and strengthen your public profile. From pitch to podium, we ensure you deliver impact that resonates long after the applause.",
  },
  {
    heading:
      "Talk Shows & Media Features: Amplify Your Voice Across Every Platform",
    text: "We collaborate with digital and broadcast platforms to feature you on talk shows, business interviews, and expert segments, amplifying your voice beyond traditional PR. Our storytelling-led approach ensures every feature reflects your authentic brand and professional identity, creating memorable moments that define your public persona.",
  },
];

const description = `At AvancePR, we believe your personal brand is your most powerful asset — the story people tell about you when you're not in the room. We help founders, CXOs, and industry leaders build authentic, authoritative, and consistent visibility across media, digital, and professional platforms. Our personal branding strategies go beyond aesthetics — they're built to position you as a thought leader, open opportunities, and elevate your professional influence. We design a tailored roadmap that reflects your voice, values, and vision. Every platform, post, and appearance is crafted to communicate leadership, inspire trust, and create lasting impact. From LinkedIn management to keynote opportunities, from podcast features to media appearances, we orchestrate a comprehensive personal branding strategy that transforms your expertise into influence and your vision into industry leadership.`;

const PersonalBrandingPage: NextPage<{}> = ({ }) => {
  return (
    <ServicePageLayout
      heading="Personal Branding"
      label="Elevate Your Professional Identity"
      image={EXTERNAL_IMAGES.CREATIVE}
      title="Build Your Legacy, One Story at a Time"
      data={data}
      description={description}
      textRightPadding={true}
    >
      <Head>
        <title>Founder & CXO Personal Branding Experts | Avance PR</title>
        <meta name="description" content="Avance PR helps founders, CXOs, and leaders build powerful personal brands through strategic storytelling, LinkedIn positioning, podcasts, and media visibility." />
        <link rel="canonical" href="https://www.avancepr.in/services/personal-branding" />
        <meta property="og:title" content="Founder & CXO Personal Branding Experts | Avance PR" />
        <meta property="og:description" content="Avance PR helps founders, CXOs, and leaders build powerful personal brands through strategic storytelling, LinkedIn positioning, podcasts, and media visibility." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/personal-branding" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
    </ServicePageLayout>
  );
};

export default PersonalBrandingPage;