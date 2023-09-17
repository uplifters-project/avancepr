import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import Image from "next/image";

const data = [
  {
    heading:
      "Instagram: Influencer Magic Can Help You Improve Your Instagram Game",
    text: " Say goodbye to the mundane and welcome to the remarkable. AvancePR provides the power of Influencer Marketing designed just for Instagram. Consider showcasing your business to thousands of engaged followers with stunning images and real tales. We're your secret weapon for increasing likes, followers, and achieving genuine business outcomes. Are you prepared to make your feed the talk of the town? Let's get started. ",
  },
  {
    heading:
      "Facebook: AvancePR Can Help You Unlock the Potential of Influencer Marketing",
    text: "Are you ready to elevate your company's social media presence? Introducing our specialist Influencer Marketing services, which are specifically intended to increase your Facebook exposure and interaction. We're here to help your company shine brighter than before, from selecting the ideal influencers to creating fascinating content. Join forces with us and let's build a buzz that lasts across time.    ",
  },
  {
    heading:
      "Youtube:Do you want to attract the attention of video-savvy audiences? ",
    text: "There is no need to look any further! YouTube Influencer Marketing by AvancePR converts views into followers and subscribers into customers. Let's work together to find influencers that can represent your business in engaging, shareable films that reach millions of people. Are you ready to put your brand in the spotlight? Let's get the camera rolling! ",
  },
];

const description = `The skill of creating a captivating story around your event, carefully advertising it to a specific audience, and cultivating media coverage that increases its exposure and influence is known as event PR. Event PR entails the proficient management and execution of public relations events, which play a pivotal role in garnering the interest of both the local community and prospective consumers towards a business, client, product, or service. By orchestrating these events with the utmost expertise, organizations can effectively bolster their reputation and significantly augment brand awareness. It all comes down to crafting an immersive experience that grabs hearts, minds, and headlines. AvancePR, as a leading provider of event PR services, excels at leveraging these strategic initiatives to elevate our clients' brands to new heights. Our skilled communicators craft great press releases, captivating pitches, and meaningful content that reaches journalists and influencers. We carefully harness media ties to acquire coverage that broadens the impact of your events.`;

const ContentMarketingPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Influencer Marketing"
      label=""
      image="/images/likes-social-media.jpg"
      title=""
      data={data}
      description={description}
      textRightPadding={true}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default ContentMarketingPage;
