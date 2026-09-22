import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";

export default function ThankYou() {
    return <MainLayout>
        <Head>
          <title>Thank You – Avance PR</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <div className="my-20">
        <div className="text-center font-medium md:text-3xl my-5">
                We would love to connect with you soon
        </div>
        <div className="text-center md:text-xl">
                Our team will reach out to you shortly
            </div>
        </div>
    </MainLayout>
}
