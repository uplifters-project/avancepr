import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<>
			<div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-10 bg-[#FF9F00]">
				<div className="p-3 ">
					<ul>
						<Image src="/Logo.jpg" width={130} height={130} className="mx-auto" />
						<div className="text-black font-bold text-3xl pb-6 mx-auto text-center">
							Avance<span className="text-yellow-900">PR</span>
						</div>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							{/* <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" /> */}
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Quick Links</p>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							About Us
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Our Work
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							FAQs
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Careers
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Our Services</p>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Public Relation
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Content Marketing
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Social Media Marketing
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Influencer Marketing
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Events
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4"></p>
						<li className="text-gray-700 text-md pb-2 font-semibold text-black px-3 py-2 rounded-md font-medium">
							Robert Robertson,<br />
							1234 NW Bobcat Lane,<br />
							St. Robert,<br />
							MO 65584-5678
						</li>
					</ul>
				</div>
			</div >
			<div className="flex flex-col justify-center items-center text-center  p-5 bg-black">
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