import { getOurWork } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import WorkCard from "@/components/cards/work-card";

const AboutPage: NextPage<{}> = ({}) => {
  return (
    <PageLaypout heading="About Us" label="" className="text-center">
      <p>
        AvancePR is a highly regarded and comprehensive PR agency headquartered
        in Gurugram. Our core expertise lies in cultivating impactful
        connections with influencers and crafting effective corporate
        communications strategies. We take pride in offering a diverse range of
        campaigns tailored to suit the unique needs of our esteemed clientele.
        Through strategic media engagement, we diligently work towards enhancing
        brand personality and reputation, bolstering our clients' market
        presence.
      </p>
      <br />
      <p>
        At AvancePR, we specialize in several key sectors, including Technology
        (B2B, B2C), Education, Consumer Technology, Infrastructure, Retail,
        Lifestyle, Cybersecurity, FMCG, Real Estate, D2C, B2B2C, Startups,
        Travel, Astro Tech, Hospitality, Logistics, Healthcare, and Pharma. Our
        in-depth industry knowledge and extensive experience enable us to
        provide targeted and impactful PR solutions within these sectors. We
        understand the distinct challenges and opportunities that each industry
        presents, allowing us to devise tailored strategies that effectively
        meet our clients' specific objectives.
      </p>
      <br />
      <p>
        With a team of dedicated professionals, we are committed to adding
        significant brand value for our clients, aligned with their overarching
        business goals. Our skilled PR experts bring a wealth of knowledge and
        expertise to the table, implementing innovative and results-driven
        approaches that drive tangible outcomes. By leveraging our extensive
        network of media contacts and influencers, we secure valuable exposure
        and create compelling narratives that resonate with the target audience.
      </p>
      <br />
      <p>
        At AvancePR, our client-centric approach ensures that we fully
        understand the unique needs and aspirations of each brand we work with.
        We collaborate closely with our clients, developing strategic PR
        campaigns that align with their vision and aspirations. By meticulously
        crafting compelling messages and leveraging a mix of traditional and
        digital PR channels, we strive to elevate brand awareness, foster
        positive perceptions, and facilitate meaningful connections between our
        clients and their target market.
      </p>
    </PageLaypout>
  );
};

export default AboutPage;
