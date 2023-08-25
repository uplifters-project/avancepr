import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-scroll";
import NextLink from "next/link";

import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import Image from "next/image";
import { APP_ROUTES, EXTERNAL_LINKS } from "@/lib/constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className=" shadow-sm  w-full z-10 bg-[#FF9F00]">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-20  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <NextLink href={APP_ROUTES.HOME}>
                  <div className="mr-2">
                    <Image
                      src={"/Logo-modified.png"}
                      alt="Logo"
                      width={50}
                      height={50}
                    />
                  </div>
                </NextLink>

                <h1 className=" font-bold text-xl cursor-pointer">
                  Avance <span className="text-yellow-900/70">PR</span>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex space-x-4 justify-center items-center">
                  <NextLink
                    href={APP_ROUTES.ABOUT}
                    className="cursor-pointer text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    About Us
                  </NextLink>

                  <NextLink
                    href={APP_ROUTES.OUR_SERVICES}
                    className="cursor-pointer tet-black  text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Our Services
                  </NextLink>

                  <NextLink
                    href={APP_ROUTES.CLIENTS}
                    className="cursor-pointer text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Our Clients
                  </NextLink>

                  <NextLink
                    href={APP_ROUTES.ALL_BLOGS}
                    className="cursor-pointer text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Blogs
                  </NextLink>

                  <NextLink
                    href={APP_ROUTES.WORK}
                    className="cursor-pointer text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Our Work
                  </NextLink>

                  <NextLink
                    href={APP_ROUTES.CONTACT}
                    className="cursor-pointer text-md hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Contact Us
                  </NextLink>

                  <div>
                    <p className="cursor-pointer text-sm text-black hover:text-white hover:underline font-medium">
                      <NextLink href={`tel:${EXTERNAL_LINKS.PHONE}`}>
                        +91-9899707349
                      </NextLink>
                    </p>
                    <p className="cursor-pointer text-sm text-black hover:text-white hover:underline font-medium">
                      <NextLink
                        href={`mailto:${EXTERNAL_LINKS.EMAIL_AVANCEPR}`}
                      >
                        {EXTERNAL_LINKS.EMAIL_AVANCEPR}
                      </NextLink>
                    </p>
                    <div className="flex space-x-2 mt-2 px-4">
                      <NextLink href={EXTERNAL_LINKS.INSTAGRAM} target="_blank">
                        <FaInstagram
                          className="text-2xl cursor-pointer hover:text-white"
                          size={15}
                        />
                      </NextLink>

                      <NextLink href={EXTERNAL_LINKS.TWITTER} target="_blank">
                        <FaTwitter
                          className="text-2xl cursor-pointer hover:text-white"
                          size={15}
                        />
                      </NextLink>

                      <NextLink href={EXTERNAL_LINKS.LINKEDIN} target="_blank">
                        <FaLinkedin
                          className="text-2xl cursor-pointer hover:text-white"
                          size={15}
                        />
                      </NextLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-12 flex md:hidden ">
              <div>
                <p className="cursor-pointer text-sm text-black hover:text-white hover:underline font-medium">
                  +91-9899707349
                </p>
                <p className="cursor-pointer text-sm text-black hover:text-white hover:underline font-medium">
                  {" "}
                  info@avancepr.in
                </p>
                <div className="flex space-x-2 mt-2 px-4">
                  <FaInstagram
                    className="text-2xl cursor-pointer hover:text-white"
                    size={15}
                  />
                  <FaTwitter
                    className="text-2xl cursor-pointer hover:text-white"
                    size={15}
                  />
                  <FaLinkedin
                    className="text-2xl cursor-pointer hover:text-white"
                    size={15}
                  />
                </div>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="h-10 w-10 bg-black inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:10" id="mobile-menu">
              <div
                ref={ref}
                className="bg-white-300/70 px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <Link
                  activeClass="about"
                  to="about"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About Us
                </Link>
                <Link
                  activeClass="service"
                  to="service"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Our Services
                </Link>

                <Link
                  activeClass="clients"
                  to="clients"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Our Clients
                </Link>
                <Link
                  activeClass="blog"
                  to="blog"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Blogs
                </Link>
                <Link
                  activeClass="testimonials"
                  to="testimonials"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Testimonials
                </Link>

                <Link
                  activeClass="contact"
                  to="contact"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-black text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
