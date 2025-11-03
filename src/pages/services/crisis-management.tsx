import { NextPage } from "next";
import ServicePageLaypout from "@/components/layouts/service-page-layout";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import Head from "next/head";

const data = [
  {
    heading: "Real-Time Crisis Response",
    text: "We monitor conversations across traditional and digital media to identify potential threats before they escalate. Our 24/7 response team ensures timely, transparent, and tactful communication that helps your brand stay in control of the story.",
  },
  {
    heading: "Reputation Risk Assessment",
    text: "Before a crisis strikes, we help brands assess vulnerabilities through proactive audits and scenario planning. This allows us to develop clear protocols and messaging frameworks for faster, coordinated responses.",
  },
  {
    heading: "Media & Stakeholder Communication",
    text: "We manage all outward-facing communication with precision from press statements and media queries to internal messages for employees, investors, and customers. Our aim is to ensure consistency, calm, and credibility in every interaction.",
  },
  {
    heading: "Crisis Training & Preparedness",
    text: "Our experts conduct media training and crisis simulation workshops for leadership teams, preparing them to handle sensitive situations confidently and communicate effectively under pressure.",
  },
  {
    heading: "Reputation Rebuilding",
    text: "Once the storm passes, we focus on rebuilding trust through positive storytelling, community engagement, and strategic visibility initiatives that reposition your brand as responsible, transparent, and growth-oriented.",
  },
];

const description = `In today's fast-moving digital world, a single moment can define or damage a brand. At Avance PR, we specialize in Crisis Communication and Reputation Management, helping brands navigate challenging situations with strategy, speed, and sensitivity. Our goal is simple: to protect your brand's integrity while restoring trust and confidence across all stakeholders.

From internal miscommunication to product backlash, social media firestorms, or leadership controversies, we work behind the scenes and in the spotlight to control narratives, manage perceptions, and minimize long-term impact. We believe every crisis, when handled with clarity and compassion, can become an opportunity to reinforce brand credibility and resilience.`;

const CrisisManagement: NextPage = () => {
  return (
    <ServicePageLaypout
      heading="Crisis Management"
      label=""
      image={EXTERNAL_IMAGES.EVENT_PR}
      title=""
      data={data}
      description={description}
      textRightPadding
    >
      <Head>
        <title>Brand Reputation & Crisis Communication Experts | Avance PR</title>
        <meta name="description" content="Avance PR is helping brands protect reputation, control narratives, and rebuild trust through strategic, transparent, and timely communication." />
        <meta property="og:title" content="Brand Reputation & Crisis Communication Experts | Avance PR" />
        <meta property="og:description" content="Avance PR is helping brands protect reputation, control narratives, and rebuild trust through strategic, transparent, and timely communication." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/crisis-management" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>
    </ServicePageLaypout>
  );
};

export default CrisisManagement;