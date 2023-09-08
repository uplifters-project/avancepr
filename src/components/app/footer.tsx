import React from "react";
import Image from "next/image";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import { FaLinkedin, FaPhone } from "react-icons/fa";
import Link from "next/link";
import { APP_ROUTES, EXTERNAL_LINKS } from "@/lib/constants";

function Footer() {
  return (
    <>
      <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-10 bg-[#FF9F00]">
        <div className="p-3 ">
          <ul>
            <Link href={APP_ROUTES.HOME}>
              <Image
                src="/Logo_footer.jpg"
                width={130}
                height={130}
                className="mx-auto"
                alt="Logo"
              />
              <div className="text-black font-bold text-3xl pb-6 mx-auto text-center">
                Avance<span className="text-yellow-900">PR</span>
              </div>
            </Link>
            <div className="flex gap-6 pb-5">
              <Link href={EXTERNAL_LINKS.INSTAGRAM} target="_blank">
                <FaInstagram className="text-2xl cursor-pointer hover:text-white" />
              </Link>

              <Link href={EXTERNAL_LINKS.TWITTER} target="_blank">
                <FaTwitter className="text-2xl cursor-pointer hover:text-white" />
              </Link>

              <Link href={EXTERNAL_LINKS.LINKEDIN} target="_blank">
                <FaLinkedin className="text-2xl cursor-pointer hover:text-white" />
              </Link>
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Quick Links</p>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.ABOUT}>About Us</Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.WORK}>Our Work</Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.FAQ}>FAQs</Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.NEWS}>Featured</Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.TESTIMONIALS}>Testimonials</Link>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">
              Our Services
            </p>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.SERVICES.PUBLIC_RELATIONS}>
                Public Relation
              </Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.SERVICES.CONTENT_MARKETING}>
                Content Marketing
              </Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.SERVICES.SOCIAL_MEDIA_MARKETING}>
                Social Media Marketing
              </Link>
            </li>
            <li className="ext-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.SERVICES.INFLUENCER_MARKETING}>
                Influencer Marketing
              </Link>
            </li>
            <li className="text-md pb-2 hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
              <Link href={APP_ROUTES.SERVICES.EVENT_MANAGEMENT}>
                Event Management
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4"></p>
            <li className="text-md pb-2 text-black px-3 py-2 rounded-md font-medium">
              <div className="flex items-center">
                <div className="rounded-full bg-white border border-black p-2">
                  <FaMapMarkerAlt className="text-black text-1xl cursor-pointer hover:text-yellow-600" />
                </div>
                <div className="ml-2">
                  <p className="text-black">10, Poorvi Marg</p>
                  <p className="text-black">DLF Phase 2, Sector 25</p>
                  <p className="text-black">Gurugram - 122002</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-white border border-black p-2">
                  <FaPhone className="text-black text-1xl cursor-pointer hover:text-orange-600" />
                </div>
                <p className="ml-2">
                  <a
                    href="tel:9899707349"
                    className="text-black hover:underline"
                  >
                    98997 07349
                  </a>
                </p>
              </div>
            </li>
            <li className="text-gray-700 text-md pb-2 font-semibold text-black px-3 py-0 rounded-md font-medium">
              <div
                className="flex items-center"
                style={{ marginBottom: "10px" }}
              >
                <div className="rounded-full bg-white border border-black p-2">
                  <FaEnvelope className="text-black text-1xl cursor-pointer hover:text-orange-600" />
                </div>
                <p className="ml-2">
                  <a
                    href="mailto:info@avancepr.in"
                    className="text-black hover:underline"
                  >
                    info@avancepr.in
                  </a>
                </p>
              </div>
            </li>
            <li className="text-gray-700 text-md pb-2 font-semibold text-black px-3 py-0 rounded-md font-medium">
              <div
                className="flex items-center"
                style={{ marginBottom: "10px" }}
              >
                <div className="rounded-full bg-white border border-black p-2">
                  <FaEnvelope className="text-black text-1xl cursor-pointer hover:text-orange-600" />
                </div>
                <p className="ml-2">
                  <a
                    href="mailto:info@avancepr.in"
                    className="text-black hover:underline"
                  >
                    ritika@avancepr.in
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-2 m-0 bg-black">
        <h1 className=" text-yellow-300/80 font-semibold">
          © 2023 All rights reserved by{" "}
          <span className="hover:text-white font-semibold cursor-pointer">
            AvancePR{" "}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;
