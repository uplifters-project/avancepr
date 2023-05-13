import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<>
			<div className="bg-yellow-300/80 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-10">
				<div className="p-3 ">
					<ul>
						<p className="text-black font-bold text-3xl pb-6">
							Avance<span className="text-yellow-900">PR</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Stocks
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Futures & Options
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Mutual Funds
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Fixed deposits
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							About
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Clients
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Services
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Blogs
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Testimonials
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Contact
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Support Portals
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							List Of Charges
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Downloads & Resources
						</li>
						<li className="text-gray-700 text-md pb-2 font-semibold hover:bg-black text-black hover:text-white px-3 py-2 rounded-md font-medium">
							Videos
						</li>
					</ul>
				</div>
			</div>
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