import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import Image from "next/image";

const data = [
  {
    heading: "Press Conference",
    text: " When your message has to be heard loud and clear, a press conference serves as an effective communication tool. AvancePR specialises in organising smooth and compelling press conferences that capture attention, ignite dialogues, and communicate your message straight to the public. Which aids in bringing the company's voice straight to the audience's ears. ",
  },
  {
    heading: "Media Interview",
    text: "Media interviews are an effective way to share your skills and shape public image. AvancePR understands the complexities of many interview formats, such as TV appearances and radio shows, as well as print and digital media. We assist you in navigating each scenario with grace and leaving an unforgettable impression.",
  },

];

const description = `The skill of creating a captivating story around your event, carefully advertising it to a specific audience, and cultivating media coverage that increases its exposure and influence is known as event PR. Event PR entails the proficient management and execution of public relations events, which play a pivotal role in garnering the interest of both the local community and prospective consumers towards a business, client, product, or service. By orchestrating these events with the utmost expertise, organizations can effectively bolster their reputation and significantly augment brand awareness. It all comes down to crafting an immersive experience that grabs hearts, minds, and headlines. AvancePR, as a leading provider of event PR services, excels at leveraging these strategic initiatives to elevate our clients' brands to new heights. Our skilled communicators craft great press releases, captivating pitches, and meaningful content that reaches journalists and influencers. We carefully harness media ties to acquire coverage that broadens the impact of your events.`;

const ContentMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Event PR"
      label=""
      image="/images/event.jpg"
      title=""
      data={data}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default ContentMarketingPage;
