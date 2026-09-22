import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy – Avance PR</title>
        <meta name="description" content="Read Avance PR's privacy policy to learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://www.avancepr.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy – Avance PR" />
        <meta property="og:description" content="Read Avance PR's privacy policy to learn how we collect, use, and protect your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.avancepr.in/privacy-policy" />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="max-w-4xl mx-auto my-20 px-6 text-gray-700 leading-relaxed">
        <h1 className="text-4xl font-bold text-center text-yellow-700 mb-10">
          Privacy Policy
        </h1>

        <p>
          At <span className="font-semibold">Avance PR</span>, your privacy is our priority. 
          This Privacy Policy explains how we collect, use, protect, and share information 
          when you visit our website, engage with our services, or communicate with our team. 
          We are committed to maintaining the confidentiality and security of your personal 
          data at every step.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Information We Collect
        </h2>
        <p>We collect information that you voluntarily provide to us, such as when you:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Fill out a contact form on our website</li>
          <li>Subscribe to our newsletters or updates</li>
          <li>Share feedback or testimonials about our services</li>
          <li>Contact us with queries or requests for collaboration</li>
        </ul>
        <p className="mt-3">
          This information may include your name, email address, phone number, 
          organization details, and any other information you choose to share.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          How We Use the Information
        </h2>
        <p>
          We use the information collected to better understand your needs and 
          deliver a seamless experience. Specifically, we may use it for:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Maintaining internal records and client databases</li>
          <li>Improving our services, communication, and offerings</li>
          <li>Responding to your inquiries and feedback promptly</li>
          <li>Sharing updates, insights, or newsletters (only if you have opted in)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Use of Cookies
        </h2>
        <p>
          Our website uses cookies — small text files placed on your device — to enhance 
          your browsing experience. Cookies help us analyze web traffic, understand user 
          behavior, and improve our content and interface. These cookies collect only 
          technical or usage-related information and do not identify you personally.
        </p>
        <p className="mt-3">
          You may choose to disable cookies through your browser settings, though some 
          parts of the website may not function optimally as a result.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Data Retention
        </h2>
        <p>
          We retain your personal data only for as long as necessary to fulfill the 
          purposes described in this policy or as required by applicable laws. Once 
          your data is no longer needed, it will be securely deleted or anonymized.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Children’s Privacy
        </h2>
        <p>
          Our services and communications are intended for professionals and business 
          representatives. We do not knowingly collect personal information from 
          individuals under the age of 16 (or the applicable age of consent in your 
          jurisdiction). If such data is inadvertently collected, we will delete it promptly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Contact Us
        </h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or how we 
          handle your data, please contact us at{" "}
          <a
            href="mailto:info@avancepr.com"
            className="text-yellow-700 font-medium hover:underline"
          >
            info@avancepr.com
          </a>
          .
        </p>

        <p className="mt-10 text-center text-sm text-gray-500">
          Last updated: October 2025
        </p>
      </div>
    </MainLayout>
  );
}
