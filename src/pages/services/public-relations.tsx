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

const description = ``;

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
