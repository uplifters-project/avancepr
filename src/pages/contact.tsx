import { getOurClients } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLinkedin, FaPhone } from "react-icons/fa";
import { FaTwitter, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: NextPage<{
  clients: Client[];
}> = () => {
  return (
    <PageLaypout heading="Contact Us" label="Get in Touch with Us!">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full ">
        <h2 className="text-xl text-yellow-700 font-bold">Contact Us</h2>
        <h2 className="py-4">
          Feel free to ask for details, don't save any questions!
        </h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-md shadow-yellow-700 rounded-xl p-4">
            <div className="lg:p-4 h-full ">
              <div>
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src="/contact.jpg"
                  alt="contact"
                  width={500}
                  height={500}
                />
              </div>
              <div>
                <h1 className="py-2">Business Enqiries</h1>
                <p className="py-4">
                  Ms. Ritika Garg (Founder) <br />
                </p>

                <div className="p-5">
                  <ul>
                    <p className="text-gray-800 font-bold text-2xl pb-4"></p>
                    <li className="text-gray-700 text-md pb-2 font-semibold text-black px-3 py-2 rounded-md font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-white border border-black p-2">
                          <FaPhone className="text-black text-1xl cursor-pointer hover:text-orange-600" />
                        </div>
                        <p className="ml-2">
                          <a
                            href="tel:9899707349"
                            className="text-black hover:underline"
                          >
                            Phone : 98997 07349
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
                            Email : info@avancepr.in
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
                            Email : ritika@avancepr.in
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-3 w-full h-auto shadow-md shadow-yellow-700 rounded-xl lg:p-4">
            <h2 className="text-xl text-yellow-700 font-bold pt-6 pl-4">
              Get a Call back
            </h2>
            <h2 className="py-4 pl-4">
              Please fill the form below with all the details. Our team would
              love to get in touch with you and understand your requirements.
            </h2>
            <div className="p-4">
              <form
                action="https://getform.io/f/08ebcd37-f5b5-45be-8c13-714f011ce060"
                method="POST"
              >
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Full Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-yellow-700"
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">
                      Phone Number
                    </label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-yellow-700"
                      type="text"
                      name="phone"
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">
                    Email Address
                  </label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-yellow-700"
                    type="email"
                    name="email"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-yellow-700"
                    type="text"
                    name="subject"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Message</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-yellow-700"
                    rows={10}
                    name="message"
                  ></textarea>
                </div>
                <button className="w-full p-4 text-gray-100 mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLaypout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const clients = await getOurClients();

  return {
    props: {
      clients,
    },
    revalidate: REVALIDATE_TIME.CLIENT_PAGE,
  };
};

export default ContactPage;
