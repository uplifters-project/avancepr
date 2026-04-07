import { getOurClients, submitEnquiryForm } from "@/lib/apis";
import PageLaypout from "@/components/layouts/page-layout";
import { GetStaticProps, NextPage } from "next";
import { REVALIDATE_TIME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLinkedin, FaPhone } from "react-icons/fa";
import { FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ContactPage: NextPage<{
  clients: Client[];
}> = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    inquiry: "",
    companyName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const { fullName, email, inquiry, companyName, phone } = data;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await submitEnquiryForm({
        full_name: fullName,
        email: email,
        enquiry: inquiry,
        phone: phone,
        company_name: companyName,
      });

      if (res) {
        toast({
          title: "Form submitted successfully",
          type: "foreground",
        });

        setData({
          fullName: "",
          companyName: "",
          email: "",
          inquiry: "",
          phone: "",
        });

          //redirect to thank you page
        window.location.href = "/thank-you";
      } else {
        throw new Error("Failed to submit form, please enter all the data");
      }
    } catch (e: any) {
      toast({
        title: "Failed to submit form",
        type: "foreground",
        description:
          e?.message ?? "Failed to submit form, please enter all the data",
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    const newData = {
      ...data,
      [e.target.name]: e.target.value,
    };

    setData(newData);
  };

  return (
    <PageLaypout heading="" label="">
      <div className="max-w-screen-lg m-auto px-2 pb-16 w-full ">
        {/* <Image
          src="/images/contact-us.jpeg"
          height={300}
          width={300}
          alt="Contact Us"
          className="mx-auto"
        /> */}

        <div className="absolute w-screen top-20 left-0 h-[300px] overflow-hidden bg-[url(/images/contact-us-long.jpeg)] bg-cover">
          <div className="h-full w-full bg-black/20 flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <h3 className="text-xl text-white/70">
              Feel free to ask for details, don't save any questions!
            </h3>
          </div>

          {/* <Image
            src="/images/contact-us-long.jpeg"
            // height={425 * 2}
            // width={640 * 2}
            fill
            alt="Contact Us"
            className="mx-auto object-cover"
          /> */}
        </div>

        {/* <h2 className="text-xl text-yellow-700 font-bold">Contact Us</h2>
        <h2 className="py-4">
          Feel free to ask for details, don't save any questions!
        </h2> */}

        <div className="h-[160px]"></div>
        <div className="h-12 md:h-20"></div>

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
                <h1 className="py-2">Enquiries</h1>
                <p className="py-4">
                  Ms. Ritika Garg (Founder) <br />
                </p>

                <div className="p-5">
                  <ul>
                    <p className="text-gray-800 font-bold text-2xl pb-4"></p>
                    <li className="text-md pb-2 text-black px-3 py-2 rounded-md font-medium">
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
                    <li className="text-md pb-2 text-black px-3 py-0 rounded-md font-medium mt-3">
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
                    <li className="text-md pb-2 text-black px-3 py-0 rounded-md font-medium">
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
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Full Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-yellow-700"
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={onChange}
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
                      value={phone}
                      onChange={onChange}
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
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-yellow-700"
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Message</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-yellow-700"
                    rows={5}
                    name="inquiry"
                    value={inquiry}
                    onChange={onChange}
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="mt-4 mx-auto bg-yellow-700  hover:bg-yellow-600"
                  >
                    Send Message
                  </Button>
                </div>
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
