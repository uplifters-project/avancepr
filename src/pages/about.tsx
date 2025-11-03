import PageLaypout from "@/components/layouts/page-layout";
import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const AboutPage: NextPage = () => {
  return (
    <PageLaypout
      heading="About Us"
      label=""
      className="text-center md:text-left"
    >
      <Head>
        <title>About Avance PR – PR Services & Experts in India</title>
        <meta name="description" content="Meet Avance PR: Gurugram-based PR firm specializing in startup PR, corporate communications and brand reputation. Strong media & influencer networks." />
        <meta property="og:title" content="About Avance PR – PR Services & Experts in India" />
        <meta property="og:description" content="Meet Avance PR: Gurugram-based PR firm specializing in startup PR, corporate communications and brand reputation. Strong media & influencer networks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/about" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="grid gap-x-8 items-center grid-cols-5 gap-y-8">
          <div className="col-span-5 md:col-span-3 flex flex-col gap-4">
            <p className="">
              Avance PR is a highly regarded and comprehensive public relations agency
              headquartered in Gurugram, known for crafting powerful narratives that drive
              visibility, credibility, and influence. We don&rsquo;t believe in a one-size-fits-all
              approach — because every brand is different. Our strength lies in understanding
              each client&rsquo;s unique story, audience, and ambition, and then designing tailored
              communication strategies that truly reflect their identity. From strategic media
              engagement and influencer collaborations to reputation and crisis management,
              every campaign we craft is built to create meaningful impact and measurable results.
            </p>

            <p className="">
              With a proven track record across industries including Technology (B2B & B2C),
              Education, Consumer Tech, Infrastructure, Retail, Lifestyle, Cybersecurity, FMCG,
              Real Estate, D2C, B2B2C, Startups, Travel, Astro Tech, Hospitality, Logistics,
              Healthcare, and Pharma, Avance PR brings together creativity, strategy, and insight
              to deliver exceptional outcomes. Our team of experienced professionals partners
              closely with clients to strengthen brand narratives, build trust, and enhance
              reputation across traditional and digital platforms. At Avance PR, we don&rsquo;t just
              tell stories — we shape perceptions, spark conversations, and help brands grow
              with purpose.
            </p>
          </div>

          <Image
            src="/images/about_us_1.png"
            height={426}
            width={640}
            alt=""
            className="col-span-5 md:col-span-2"
          />
        </div>

        <Separator className="max-w-5xl mx-auto my-8" />

        <div className="grid gap-x-8 items-center grid-cols-5 gap-y-8">
          <Image
            src="/images/about_us_2.png"
            height={480}
            width={640}
            alt=""
            className="col-span-5 md:col-span-2"
          />

          <div className="col-span-5 md:col-span-3 flex flex-col gap-4">
            <h2 className="text-3xl font-bold mb-4">
              Here&rsquo;s what makes us different (and effective):
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <span className="text-yellow-700 font-bold">•</span>
                <div>
                  <strong>Strategic Positioning:</strong> We go beyond press releases. We dig into your story, find your voice, and align it with what the media and your audience actually care about.
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-yellow-700 font-bold">•</span>
                <div>
                  <strong>High-Impact Media Relations:</strong> With a strong network of top journalists and editors, we help you earn visibility in major outlets not ads, but editorial stories that build real trust.
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-yellow-700 font-bold">•</span>
                <div>
                  <strong>Influencers & Celebrity Connects:</strong> We foster media-influencer conversations that amplify reach organically and authentically.
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-yellow-700 font-bold">•</span>
                <div>
                  <strong>LinkedIn Thought Leadership:</strong> Founders who are visible get funded, followed, and featured. We manage CXO LinkedIn profiles to build your personal brand and grow a strong community of investors, collaborators, and future customers. Because your network is your net worth.
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-yellow-700 font-bold">•</span>
                <div>
                  <strong>Tailored Campaigns for Your Industry:</strong> We&rsquo;ve delivered results for over 100 clients in various sectors like Tech, Fintech, EdTech, D2C, Healthcare, Cybersecurity, Real Estate, EV, Hospitality and more.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="max-w-5xl mx-auto my-8" />

      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-y-8">
        <div className="col-span-3 md:col-span-2">
          <h2 className="text-5xl text-center font-bold text-yellow-700 animate-showLetterByLetter">
            Founder & CEO
          </h2>

          <div className="flex flex-col gap-y-4 mt-8">
            <p>
              Driven by a passion for storytelling and a vision to redefine India&rsquo;s PR landscape, Ritika Garg founded Avance PR with one clear mission to help brands communicate with clarity, creativity, and credibility.
            </p>

            <p>
              Under her leadership, Avance PR has evolved from a boutique agency into one of India&rsquo;s fastest-growing strategic communications firms, trusted by over 100 brands across industries including technology, education, sustainability, hospitality, and finance.
            </p>

            <p>
              Ritika&rsquo;s professional journey began at Ogilvy, one of the world&rsquo;s most respected communication networks, where she honed her expertise in strategic communications, media relations, and brand storytelling. Her experience across diverse sectors has shaped her belief that PR is not just about visibility, it&rsquo;s about building trust, influence, and business impact.
            </p>

            <p>
              Her leadership philosophy is rooted in data-driven storytelling and purpose-led branding. Over the years, she has spearheaded campaigns that have generated extensive national media coverage, elevated brand reputation, and created tangible results for startups and corporates alike.
            </p>

            <p>
              Recognized by The Economic Times 40 Under 40 and ET Women Leaders Awards, Ritika stands among India&rsquo;s most promising young entrepreneurs known for her ability to blend creative vision with strategic execution.
            </p>

            <p>
              Today, she continues to champion innovation, authenticity, and people-first leadership, inspiring her team and clients to think bigger, communicate bolder, and build brands that truly make an impact.
            </p>

            <p>
              At Avance PR, she believes every brand has a story worth telling and telling it right makes all the difference.
            </p>
          </div>
        </div>

        <div className="col-span-3 md:col-span-1 flex flex-col justify-center items-center gap-y-4">
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