import MainLayout from "@/components/layouts/main-layout";
import Script from "next/script";

export default function ThankYou() {
    return <MainLayout>
        <head>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16466088790" />
            <Script>
                {`if(typeof window != 'undefined'){
                    gtag('event', 'conversion', {'send_to': 'AW-16466088790/wws4CNuJwr0ZENam0qs9'});
                }`}
            </Script>
        </head>
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