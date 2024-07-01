import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16466088790"/>
        <Script>
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16466088790');` }
        </Script>
      </Head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
