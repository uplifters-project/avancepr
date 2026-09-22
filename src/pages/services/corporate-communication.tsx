import { NextPage } from "next";
import ServicePageLaypout from "@/components/layouts/service-page-layout";
import { EXTERNAL_IMAGES } from "@/lib/constants";
import Head from "next/head";

const data = [
  {
    heading: "Press Conferences & Leadership Communication",
    text: "We plan and execute high-impact press conferences, town halls, and leadership engagements that project authority and authenticity. Our team ensures every communication moment from message framing to media handling reinforces your brand's credibility and influence.",
  },
  {
    heading: "Digital PR & Electronic Media",
    text: "From podcasts and webinars to radio and digital news channels, we help organizations leverage modern communication platforms for two-way engagement. Our digital PR strategies enhance visibility, build thought leadership, and keep your brand relevant in an evolving media landscape.",
  },
  {
    heading: "Media Relations & Content Strategy",
    text: "We work closely with journalists and editors to ensure your organization's mission, values, and milestones are communicated positively and consistently. Our team develops data-driven content and key messaging frameworks that position your brand as a reliable voice in your sector.",
  },
  {
    heading: "Regional PR & Localized Communication",
    text: "We understand that communication must resonate locally to have a national impact. Our regional PR initiatives focus on connecting with audiences in specific markets, languages, and cultures building strong community relationships while maintaining a unified national brand image.",
  },
];

const description = `At Avance PR, corporate communication is not just about what you say it's about how strategically, consistently, and authentically you say it. We help organizations build trust, clarity, and connection across every stakeholder group employees, investors, partners, media, and customers. Our goal is to ensure your brand's voice reflects its values while driving visibility, credibility, and long-term influence.

We craft messages that inspire confidence and strengthen reputation. We believe that every interaction is an opportunity to communicate purpose and our job is to make sure your message lands with precision and impact.`;

const CorporateCommunication: NextPage = () => {
  return (
    <ServicePageLaypout
      heading="Corporate Communication"
      label=""
      image={EXTERNAL_IMAGES.PUBLIC_RELATION}
      title=""
      data={data}
      description={description}
      textRightPadding
    >
      <Head>
        <title>Avance PR – Leading Corporate Communication Agency</title>
        <meta name="description" content="Avance PR helps brands build trust and reputation through strategic corporate communication, media relations, and leadership visibility." />
        <link rel="canonical" href="https://www.avancepr.in/services/corporate-communication" />
        <meta property="og:title" content="Avance PR – Leading Corporate Communication Agency" />
        <meta property="og:description" content="Avance PR helps brands build trust and reputation through strategic corporate communication, media relations, and leadership visibility." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/services/corporate-communication" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>

    </ServicePageLaypout>
  );
};

export default CorporateCommunication;