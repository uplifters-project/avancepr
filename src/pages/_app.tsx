import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import "@/styles/_globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn(fontSans.variable, fontHeading.variable)}>
      {/* <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --font-sans: ${fontSans.variable};
          --font-heading: ${fontHeading.variable}
        }`,
        }}
      /> */}
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
