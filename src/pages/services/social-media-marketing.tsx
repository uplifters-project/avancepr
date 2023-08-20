import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";

const data = [
  {
    heading: "Social media handles",
    text: "Our Social Media Team provides a comprehensive suite of services that includes the development of a Social Media Plan and Calendar, ensuring the client’s social media handles are optimized and utilized effectively.",
  },
  {
    heading: "Campaign planning",
    text: "Campaign Planning is essential for achieving your business objectives. Our experienced team works closely to develop targeted campaigns that are designed to engage the audience, increase brand awareness, and drive conversions. We utilize the latest technologies and techniques to ensure that your campaigns are optimized for maximum impact.",
  },
  {
    heading: "Analytics Report",
    text: "At Avance PR, we believe that data-driven decision-making is essential for achieving your business objectives. That's why we provide comprehensive Analytics Reporting that offers valuable insights into your social media performance.",
  },
  {
    heading: "Performance marketing and lead generation",
    text: "At Avance PR, we understand that Performance Marketing and Lead Generation are vital components of any successful marketing strategy. Our experienced team works closely with the client’s to develop targeted campaigns that are designed to drive traffic, generate leads, and increase conversions. We utilize the latest technologies and techniques to ensure that your campaigns are optimized for maximum impact, including social media advertising, email marketing, and search engine optimization. With Avance PR,  Performance Marketing and Lead Generation strategies are effective and tailored to your specific business needs.",
  },
];

const description = `Social media has evolved into a tool for building personalized connections with clients and potential clients. Our knowledgeable Social Media Team works with your company to embrace sponsored media, owned media, and earned media while integrating the most recent social media trends, techniques, and helpful advice. Avance PR utilizes
the appropriate technologies to reach your target audience.`;

const SocialMediaMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Social Media Marketing"
      label=""
      image="/images/social_media_marketing.jpg"
      title=""
      data={data}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default SocialMediaMarketingPage;
