import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";

const description = `Avance PR, a trusted provider of comprehensive marketing solutions, adeptly harnesses the power of influencer marketing to fortify brands' presence, optimize product visibility, and drive robust consumer engagement. By leveraging the credibility, trustworthiness, and expansive reach of influential personalities, Avance PR propels brand awareness to new heights.`;

const PublicRelationsPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Influencer Marketing"
      label=""
      image="/images/influencer_marketing.jpg"
      title=""
      data={[]}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default PublicRelationsPage;
