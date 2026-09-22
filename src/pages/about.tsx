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
      className="text-justify"
    >
      <Head>
        <title>About Avance PR – PR Services & Experts in India</title>
        <meta name="description" content="Meet Avance PR: Gurugram-based PR firm specializing in startup PR, corporate communications and brand reputation. Strong media & influencer networks." />
        <link rel="canonical" href="https://www.avancepr.in/about" />
        <meta property="og:title" content="About Avance PR – PR Services & Experts in India" />
        <meta property="og:description" content="Meet Avance PR: Gurugram-based PR firm specializing in startup PR, corporate communications and brand reputation. Strong media & influencer networks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/about" />
        <meta property="og:image" content="https://www.avancepr.in/og-image.png" />
      </Head>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-justify">
            <p className="text-lg leading-relaxed text-gray-700">
              Avance PR is a highly regarded and comprehensive public relations agency
              headquartered in Gurugram, known for crafting powerful narratives that drive
              visibility, credibility, and influence. We don&rsquo;t believe in a one-size-fits-all
              approach — because every brand is different. Our strength lies in understanding
              each client&rsquo;s unique story, audience, and ambition, and then designing tailored
              communication strategies that truly reflect their identity. From strategic media
              engagement and influencer collaborations to reputation and crisis management,
              every campaign we craft is built to create meaningful impact and measurable results.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
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

          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about_us_1.jpg"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Avance PR Office"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-700 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-700 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        <Separator className="my-16" />

        {/* What Makes Us Different Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/team-image-about-us.webp"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Avance PR Team"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-700 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-700 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Here&rsquo;s what makes us <span className="text-yellow-700">different</span> (and effective):
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-700 transition-colors duration-300">
                    <span className="text-yellow-700 font-bold text-xl group-hover:text-white">✓</span>
                  </div>
                </div>
                <div className="text-justify">
                  <h3 className="font-bold text-gray-900 mb-2">Strategic Positioning</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We go beyond press releases. We dig into your story, find your voice, and align it with what the media and your audience actually care about.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-700 transition-colors duration-300">
                    <span className="text-yellow-700 font-bold text-xl group-hover:text-white">✓</span>
                  </div>
                </div>
                <div className="text-justify">
                  <h3 className="font-bold text-gray-900 mb-2">High-Impact Media Relations</h3>
                  <p className="text-gray-700 leading-relaxed">
                    With a strong network of top journalists and editors, we help you earn visibility in major outlets not ads, but editorial stories that build real trust.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-700 transition-colors duration-300">
                    <span className="text-yellow-700 font-bold text-xl group-hover:text-white">✓</span>
                  </div>
                </div>
                <div className="text-justify">
                  <h3 className="font-bold text-gray-900 mb-2">Influencers & Celebrity Connects</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We foster media-influencer conversations that amplify reach organically and authentically.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-700 transition-colors duration-300">
                    <span className="text-yellow-700 font-bold text-xl group-hover:text-white">✓</span>
                  </div>
                </div>
                <div className="text-justify">
                  <h3 className="font-bold text-gray-900 mb-2">LinkedIn Thought Leadership</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Founders who are visible get funded, followed, and featured. We manage CXO LinkedIn profiles to build your personal brand and grow a strong community of investors, collaborators, and future customers. Because your network is your net worth.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-700 transition-colors duration-300">
                    <span className="text-yellow-700 font-bold text-xl group-hover:text-white">✓</span>
                  </div>
                </div>
                <div className="text-justify">
                  <h3 className="font-bold text-gray-900 mb-2">Tailored Campaigns for Your Industry</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We&rsquo;ve delivered results for over 100 clients in various sectors like Tech, Fintech, EdTech, D2C, Healthcare, Cybersecurity, Real Estate, EV, Hospitality and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Founder Section */}
        <div className="mb-20">
          <h2 className="text-5xl text-center font-bold text-yellow-700 mb-16 animate-showLetterByLetter">
            Meet Our Founder & CEO
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Founder Image */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-64 h-64 relative">
                  <Image
                    src="/images/ritika.jpeg"
                    fill
                    sizes="256px"
                    alt="Ritika Garg"
                    className="rounded-full object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-yellow-700 ring-offset-4"></div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Ritika Garg</h3>
              <p className="text-lg text-yellow-700 font-medium mt-2">Founder & CEO</p>
              
              {/* Awards Badges */}
              <div className="mt-6 space-y-2 text-center">
                <div className="inline-block bg-yellow-50 px-4 py-2 rounded-full">
                  <p className="text-sm font-semibold text-yellow-900">ET 40 Under 40</p>
                </div>
                <div className="inline-block bg-yellow-50 px-4 py-2 rounded-full ml-2">
                  <p className="text-sm font-semibold text-yellow-900">ET Women Leaders</p>
                </div>
              </div>
            </div>

            {/* Founder Bio */}
            <div className="lg:col-span-2 space-y-6 text-justify">
              <p className="text-lg leading-relaxed text-gray-700">
                Driven by a passion for storytelling and a vision to redefine India&rsquo;s PR landscape, Ritika Garg founded Avance PR with one clear mission to help brands communicate with clarity, creativity, and credibility.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Under her leadership, Avance PR has evolved from a boutique agency into one of India&rsquo;s fastest-growing strategic communications firms, trusted by over 100 brands across industries including technology, education, sustainability, hospitality, and finance.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Ritika&rsquo;s professional journey began at Ogilvy, one of the world&rsquo;s most respected communication networks, where she honed her expertise in strategic communications, media relations, and brand storytelling. Her experience across diverse sectors has shaped her belief that PR is not just about visibility, it&rsquo;s about building trust, influence, and business impact.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Her leadership philosophy is rooted in data-driven storytelling and purpose-led branding. Over the years, she has spearheaded campaigns that have generated extensive national media coverage, elevated brand reputation, and created tangible results for startups and corporates alike.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Recognized by The Economic Times 40 Under 40 and ET Women Leaders Awards, Ritika stands among India&rsquo;s most promising young entrepreneurs known for her ability to blend creative vision with strategic execution.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Today, she continues to champion innovation, authenticity, and people-first leadership, inspiring her team and clients to think bigger, communicate bolder, and build brands that truly make an impact.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-700 p-6 rounded-r-lg">
                <p className="text-lg leading-relaxed text-gray-900 italic">
                  "At Avance PR, every brand has a story worth telling and telling it right makes all the difference."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLaypout>
  );
};

export default AboutPage;