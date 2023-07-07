import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import Layout from "./Layout";

const Halign = ({ children }) => {
  return <div className="flex justify-around bg-gray-400 p-5">
    {children}
  </div>
}

const VAlign = ({ children }) => {
  return <div className="flex flex-col justify-center align-middle justify-items-center bg-gray-400 p-5 mx-auto">
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
    <div className="flex flex-col h-screen">
      <Header />
      <Body>
        <Halign>
          <div>
            <div className="text-4xl">About Us</div>
          </div>
          <div>Lorem ipsum dolor wingardium leviosa alohomora expelliramus</div>
        </Halign>
        <VAlign>
          <div>
            <div className="text-4xl">About Us</div>
          </div>
          <div>Lorem ipsum dolor wingardium leviosa alohomora expelliramus</div>
        </VAlign>
      </Body>
      <Whatsapp />
      <Footer />
      <Layout /> {/* Add the Layout component here */}
    </div>
  );
}
