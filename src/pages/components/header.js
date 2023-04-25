import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return <div className="flex justify-between items-center p-4 h-fit bg-yellow-300/40">
        <div className="flex">
            <Image src="/logo.png" width={40} height={40} />
            <div className="text-2xl font-bold ml-2">AvancePR</div>
        </div>
        <div className="flex gap-4">
            <Link href="/services">Services</Link>
            <Link href="/clients">Clients</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/about">About Us</Link>
            <Link href="/case-study">Case Study</Link>
            <Link href="/blogs">Blogs</Link>
        </div>
    </div>
}