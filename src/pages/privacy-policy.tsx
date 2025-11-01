import MainLayout from "@/components/layouts/main-layout";
import Script from "next/script";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      {/* Optional Google Tag Manager or Analytics scripts */}
      <head>
        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KLF4N81TNH" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KLF4N81TNH');
          `}
        </Script> */}
      </head>

      <div className="max-w-4xl mx-auto my-20 px-6 text-gray-700 leading-relaxed">
        <h1 className="text-4xl font-bold text-center text-yellow-700 mb-10">
          Privacy Policy
        </h1>

        <p>
          At Avance PR, accessible from{" "}
          <span className="font-medium">www.avancepr.com</span>, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that are collected and recorded
          by Avance PR and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and company name when you fill out forms on our website
          or contact us directly. We also automatically collect certain data
          like your IP address, browser type, and device information to improve
          our website experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          2. How We Use Your Information
        </h2>
        <p>
          The information we collect is used to:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Respond to your inquiries and provide services</li>
          <li>Improve our website and user experience</li>
          <li>Send updates or marketing communications (with consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          3. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies to store information about visitors’ preferences and
          optimize the user experience by customizing our web page content based
          on visitors’ browser type and other information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          4. Data Sharing and Security
        </h2>
        <p>
          We do not sell or rent your personal data to third parties. We may
          share information with trusted service providers who assist in
          operating our website, as long as they agree to keep your data secure
          and confidential.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can contact us at any time to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          6. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy or how we handle
          your information, please contact us at{" "}
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
