import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import Image from "next/image";

const data = [
  {
    heading: "Social Media Content",
    text: " We create social media content that is engaging and informative. Our team of experts ensures that the content is tailored to the specific needs of your target audience.",
  },
  {
    heading: "Website Content",
    text: "We create website content that is optimized for search engines and is designed to attract and retain visitors. Our content is informative, engaging, and helps establish your brand as an authority in your industry.",
  },

  {
    heading: "Articles",
    text: "We create articles that are informative and engaging. Our team of writers has experience in a wide range of industries and can create articles that are tailored to your specific needs.",
  },
  {
    heading: "Blogs",
    text: "We at AvancePR create blogs that are informative, engaging, and designed to attract and retain readers. Our team of writers has experience in a wide range of industries and can create blogs that are tailored to your specific needs.",
  },
  {
    heading: "Thought leadership",
    text: "Thought leadership arises as a source of creativity and inspiration where knowledge is the currency of development. At AvancePR, we are experts in developing and showcasing thought leadership that not only establishes you as an authority but also catalyzes radical change. Being regarded as a subject-matter expert in your field and a reliable source of original thoughts is the art of thought leadership. We help leaders in portraying themselves as industrial experts by maintaining their professional network for example their Linkedin accounts.",
  },
];

const description = `At AvancePR, our content marketing strategy revolves around the creation of high-quality and value-driven content that resonates with thorough meticulous research and analysis, we identify the informational needs, preferences, and pain points of the target market. Leveraging these insights, our team of skilled content creators and strategists develop compelling and informative content that not only addresses the audience's needs but also showcases our clients' industry knowledge, thought leadership, and unique value proposition. The strategic method of developing and delivering valuable, relevant, and consistent material to attract, engage, and eventually influence a clearly defined audience is known as content marketing. It's about giving true value that answers the audience's wants, objectives, and pain spots, rather than just promotion.`;

const ContentMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Content Marketing"
      label=""
      image="/images/content_marketing2.jpg"
      title=""
      data={data}
      description={description}
      useOnlyChild={true}
    >
      <div className="text-gray-500 grid grid-cols-2 lg:grid-cols-3 mt-16 w-full gap-4">
        <div className="grid grid-cols-2 justify-center gap-4 col-span-2">
          {data.slice(0, 4).map((item) => {
            return (
              <div className="col-span-2 sm:col-span-1 flex flex-col text-center md:text-left">
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
                    {item.heading}
                  </h3>
                </div>

                <p className="mb-6">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col col-span-2 lg:col-span-1 text-center md:text-left">
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
              {data[4].heading}
            </h3>
          </div>

          <p className="mb-6">{data[4].text}</p>
        </div>
      </div>
    </ServicePageLaypout>
  );
};

export default ContentMarketingPage;
