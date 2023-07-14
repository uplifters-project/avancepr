import "@/styles/globals.css";
import "@/styles/_globals.css";

import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
