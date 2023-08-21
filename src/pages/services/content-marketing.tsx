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

const description = `At AvancePR, our content marketing strategy revolves around the creation of high-quality and value-driven content that resonates with through meticulous research and analysis, we identify the informational needs, preferences, and pain points of the target market. Leveraging these insights, our team of skilled content creators and strategists develop compelling and informative content that not only addresses the audience's needs but also showcases our clients' industry knowledge, thought leadership, and unique value proposition. The strategic method of developing and delivering valuable, relevant, and consistent material to attract, engage, and eventually influence a clearly defined audience is known as content marketing. It's about giving true value that answers the audience's wants, objectives, and pain spots, rather than just promotion.`;

const ContentMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Content Marketing"
      label=""
      image="/images/content_marketing2.jpg"
      title=""
      data={data}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default ContentMarketingPage;
