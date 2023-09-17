import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import { cn } from "@/lib/utils";

const data = [
  {
    heading: "Social media handles",
    text: "Our Social Media Team provides a comprehensive suite of services that includes the development of a Social Media Plan and Calendar, ensuring the client’s social media handles are optimized and utilized effectively. ",
  },
  {
    heading: "Analytics Report",
    text: "At Avance PR, we believe that data-driven decision-making is essential for achieving your business objectives. That's why we provide comprehensive Analytics Reporting that offers valuable insights into your social media performance. ",
  },
  {
    heading: "Campaign planning",
    text: "Campaign planning is essential for achieving your business objectives. Our experienced team works closely to develop targeted campaigns that are designed to engage the audience, increase brand awareness, and drive conversions. We utilize the latest technologies and techniques to ensure that your campaigns are optimized for maximum impact. ",
  },
  {
    heading: "Performance marketing and lead generation",
    text: "At AvancePR, we understand that Performance Marketing and Lead Generation are vital components of any successful marketing strategy. Our experienced team works closely with clients to develop targeted campaigns that are designed to drive traffic, generate leads, and increase conversions. We utilize the latest technologies and techniques to ensure that your campaigns are optimized for maximum impact, including social media advertising, email marketing, and search engine optimization. With AvancePR,  Performance Marketing and Lead Generation strategies are effective and tailored to your specific business needs.    ",
  },
];

const description = `Social media has evolved into a tool for building personalized connections with clients and potential clients. Our knowledgeable Social Media Team works with your company to embrace sponsored media, owned media, and earned media while integrating the most recent social media trends, techniques, and helpful advice. AvancePR utilizes
the appropriate technologies to reach your target audience.`;

const SocialMediaMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Social Media Marketing"
      label=""
      image="/images/social_media.jpg"
      title=""
      data={data}
      description={description}
      useOnlyChild={true}
      // textRightPadding
    >
      <div className="text-gray-500 grid grid-cols-2 lg:grid-cols-3 mt-16 w-full gap-4 md:text-left">
        <div className="grid grid-cols-2 justify-center gap-4 col-span-2">
          {data.slice(0, 3).map((item, i) => {
            return (
              <div
                className={cn(
                  "flex flex-col col-span-2 md:col-span-1",
                  i === 2 ? "col-span-2 md:col-span-2" : ""
                )}
              >
                <div className="flex justify-start items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>

                  <h3 className="font-heading text-2xl font-bold">
                    {item.heading}
                  </h3>
                </div>

                <p className="mb-6 pl-7 md:pl-0">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col col-span-2 lg:col-span-1">
          <div className="flex justify-center md:justify-start items-center mb-2">
            <svg
              className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>

            <h3 className="font-heading text-2xl font-bold">
              {data[3].heading}
            </h3>
          </div>

          <p className="mb-6 pl-7 md:pl-0">{data[3].text}</p>
        </div>
      </div>
    </ServicePageLaypout>
  );
};

export default SocialMediaMarketingPage;
