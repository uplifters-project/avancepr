import { getOurClients } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import NewsCard from "@/components/cards/news-card";
import ClientCard from "@/components/cards/client-card";

const ClientsPage: NextPage<{
  clients: Client[];
}> = ({ clients }) => {
  return (
    <PageLaypout heading="Clients" label="Our Clients">
      <div className="flex flex-row gap-5 flex-auto flex-wrap justify-center">
        {clients.map((item) => (
          <ClientCard client={item} />
        ))}
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const clients = await getOurClients();

  return {
    props: {
      clients,
    },
    revalidate: REVALIDATE_TIME.CLIENT_PAGE,
  };
};

export default ClientsPage;
