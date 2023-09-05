import PageLaypout from "@/components/layouts/page-layout";
import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import Image from "next/image";

const AboutPage: NextPage<{}> = ({}) => {
  return (
    <PageLaypout heading="About Us" label="" className="text-center">
      <div className="max-w-5xl mx-auto">
        <p>
          AvancePR is a highly regarded and comprehensive PR agency
          headquartered in Gurugram. Our core expertise lies in cultivating
          impactful connections with influencers and crafting effective
          corporate communications strategies. We take pride in offering a
          diverse range of campaigns tailored to suit the unique needs of our
          esteemed clientele. Through strategic media engagement, we diligently
          work towards enhancing brand personality and reputation, bolstering
          our clients' market presence.
        </p>
        <br />
        <p>
          At AvancePR, we specialize in several key sectors, including
          Technology (B2B, B2C), Education, Consumer Technology, Infrastructure,
          Retail, Lifestyle, Cybersecurity, FMCG, Real Estate, D2C, B2B2C,
          Startups, Travel, Astro Tech, Hospitality, Logistics, Healthcare, and
          Pharma. Our in-depth industry knowledge and extensive experience
          enable us to provide targeted and impactful PR solutions within these
          sectors. We understand the distinct challenges and opportunities that
          each industry presents, allowing us to devise tailored strategies that
          effectively meet our clients' specific objectives.
        </p>
        <br />
        <p>
          With a team of dedicated professionals, we are committed to adding
          significant brand value for our clients, aligned with their
          overarching business goals. Our skilled PR experts bring a wealth of
          knowledge and expertise to the table, implementing innovative and
          results-driven approaches that drive tangible outcomes. By leveraging
          our extensive network of media contacts and influencers, we secure
          valuable exposure and create compelling narratives that resonate with
          the target audience.
        </p>
        <br />
        <p>
          At AvancePR, our client-centric approach ensures that we fully
          understand the unique needs and aspirations of each brand we work
          with. We collaborate closely with our clients, developing strategic PR
          campaigns that align with their vision and aspirations. By
          meticulously crafting compelling messages and leveraging a mix of
          traditional and digital PR channels, we strive to elevate brand
          awareness, foster positive perceptions, and facilitate meaningful
          connections between our clients and their target market.
        </p>
      </div>

      <Separator className="max-w-4xl mx-auto my-16" />

      <div className="max-w-4xl mx-auto grid grid-cols-3">
        <div className="col-span-2">
          <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
            Founder & CEO
          </h2>

          <div className="text-left flex flex-col gap-y-4 mt-8">
            <p>
              Ms. Ritika Garg, the Founder & CEO of Avanace PR, brings with her
              a wealth of experience in the field. Over the years, she has
              worked for prestigious PR firms like Ogilvy, as well as smaller
              boutique agencies.
            </p>

            <p>
              During her career, Ms. Ritika has collaborated with more than 50
              brands and influential celebrities. She possesses strong media
              relations skills and a talent for crafting strategic plans that
              benefit brands across different industries.
            </p>

            <p>
              Currently based in Gurgaon, She leads a team of 10+ PR
              professionals at Avance PR. Her primary focus is on elevating
              Avance PR's reputation to become a renowned brand in the industry.
              With her dedication and hard work, she is actively striving
              towards achieving this goal.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-y-4">
          <Image
            src="/images/ritika.jpeg"
            height={500}
            width={500}
            alt="Ritika Garg"
            className="w-60 aspect-square rounded-full"
          />

          <h2 className="text-2xl font-bold text-muted-foreground">
            Ritika Garg
          </h2>
        </div>
      </div>
    </PageLaypout>
  );
};

export default AboutPage;
