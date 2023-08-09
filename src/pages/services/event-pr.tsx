import { NextPage } from "next";

import ServicePageLaypout from "@/components/layouts/service-page-layout";

const description = `Event PR entails the proficient management and execution of public relations events, which play a pivotal role in garnering the interest of both the local community and prospective consumers towards a business, client, product, or service. By orchestrating these events with utmost expertise, organizations can effectively bolster their reputation and significantly augment brand awareness. AvancePR, as a leading provider of event PR services, excels in leveraging these strategic initiatives to elevate our clients' brands to new heights.`;

const PublicRelationsPage: NextPage<{}> = ({}) => {
  return (
    <ServicePageLaypout
      heading="Event PR"
      label=""
      image="/content_marketing.jpg"
      title=""
      data={[]}
      description={description}
    >
      <></>
    </ServicePageLaypout>
  );
};

export default PublicRelationsPage;
