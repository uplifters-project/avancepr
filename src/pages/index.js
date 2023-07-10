import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import Layout from "./Layout";
import Gallery from "./components/clientGallery";
import InfiniteScroll from "./components/infiniteScroll";

const Halign = ({ children }) => {
  return <div className="flex justify-around p-5 m-10">
    {children}
  </div>
}

const VAlign = ({ children }) => {
  return <div className="flex flex-col m-10 justify-center align-middle justify-items-center p-5 mx-auto">
    {children}
  </div>
}

export default function Home() {
  const Whatsapp = () => {
    return (
      <div className="fixed right-6 bottom-6">
        <Image
          src="/whatsapp.webp"
          width={50}
          height={50}
          className="cursor-pointer hover:drop-shadow-md transition-all duration-100"
          onClick={() => { }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Body>
        <Halign>
          <div className="my-5">
            <div className="text-4xl">About Us</div>
          </div>
          <div className="max-w-[40%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </Halign>
        <VAlign>
          <div className="mx-auto my-5">
            <div className="text-4xl">Our Services</div>
          </div>
          <div className="max-w-[40%] text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </VAlign>
        <Gallery />
        <InfiniteScroll />
      </Body>
      <Whatsapp />
      <Footer />
      <Layout /> {/* Add the Layout component here */}
    </div>
  );
}
