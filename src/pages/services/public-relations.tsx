import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";
import Image from "next/image";

const data = [
  {
    heading: "Media Relations",
    text: "In order to communicate the organization's mission, policies, and practices to the public in a positive, dependable, and trustworthy way, we collaborate with the media,",
  },
  {
    heading: "Electronic media",
    text: "We provide services like podcasts, radio and electronic channels. Organizations can use new media to build and benefit from two-way engagement with their target audience",
  },
  {
    heading: "Regional PR",
    text: "We perform PR activities that are focused on a specific geographical region or area. It involves crafting and implementing communication strategies to promote a brand, company, or individual within a specific locality or region",
  },
];

const description = 'Event PR, the art of weaving an enchanting narrative around your occasion, precisely promoting it to a targeted audience, and nurturing media attention to amplify its reach and impact, is a vital facet of public relations. This specialized discipline involves the expert orchestration of public relations events, serving as a linchpin in capturing the attention of the local community and potential consumers for a business, client, product, or service. By executing these events with finesse, organizations can enhance their reputation and significantly boost brand visibility. Ultimately, its about creating an immersive experience that not only captures hearts and minds but also grabs headlines.';


const PublicRelationsPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Public Relation"
      label=""
      image="/images/final_public_relation.png"
      title=""
      data={data}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default PublicRelationsPage;
