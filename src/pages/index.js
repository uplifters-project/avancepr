import Image from "next/image"
import Header from "./components/header"
import Footer from "./components/footer"
import Body from "./components/body"

export default function Home() {
  const Whatsapp = () => {
    return <div className="fixed right-6 bottom-6">
      <Image src="/whatsapp.webp" width={50} height={50} className="cursor-pointer hover:drop-shadow-md transition-all duration-100" onClick={() => { }} />
    </div>
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Body>
        Hi
        <Whatsapp />
      </Body>
      <Footer />
    </div>
  )
}
