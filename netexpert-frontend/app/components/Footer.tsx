import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import LogoSvg from './assets/LogoSvg';

export default function Footer() {
    return (
        <footer className="bg-[#CCE6F5] text-gray-700 mt-12">
            <div className="max-w-6xl mx-auto py-10 px-6 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Left Side - Vision & Socials */}
                <div className=" space-y-6">
                    <div className="flex justify-center sm:justify-start items-center space-x-2">
                        <div className="w-8 h-8">
                            <LogoSvg className="w-[46px] h-[42px]" />
                        </div>
                    </div>
                    <p className="mt-2 text-sm">
                        Our vision is to provide convenience and help improve in the rural area.
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                        <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                        <FaTwitter className="w-6 h-6 cursor-pointer hover:text-blue-400" />
                        <FaInstagram className="w-6 h-6 cursor-pointer hover:text-pink-500" />
                    </div>
                </div>

                {/* About Section */}
                <div className="">
                    <h3 className="font-semibold text-center sm:text-right">About</h3>
                    <ul className="mt-2 space-y-2 text-sm text-center sm:text-right">
                        <li className="hover:text-blue-500 cursor-pointer">Home</li>
                        <li className="hover:text-blue-500 cursor-pointer">Product</li>
                        <li className="hover:text-blue-500 cursor-pointer">Suggestion</li>
                        <li className="hover:text-blue-500 cursor-pointer">About us</li>
                    </ul>
                </div>

                {/* Community Section */}
                <div className="">
                    <h3 className="font-semibold text-center sm:text-right">Community</h3>
                    <ul className="mt-2 space-y-2 text-sm text-center sm:text-right">
                        <li className="hover:text-blue-500 cursor-pointer">Chatbox AI</li>
                        <li className="hover:text-blue-500 cursor-pointer">Blog</li>
                        <li className="hover:text-blue-500 cursor-pointer">Contact us</li>
                    </ul>
                </div>

                {/* Socials Section */}
                <div className="">
                    <h3 className="font-semibold text-center sm:text-right">Socials</h3>
                    <ul className="mt-2 space-y-2 text-sm text-center sm:text-right">
                        <li className="hover:text-blue-500 cursor-pointer">Discord</li>
                        <li className="hover:text-blue-500 cursor-pointer">Instagram</li>
                        <li className="hover:text-blue-500 cursor-pointer">Twitter</li>
                        <li className="hover:text-blue-500 cursor-pointer">Facebook</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 text-sm pt-6 pb-12 text-center sm:flex sm:justify-between items-center max-w-6xl mx-auto ">
                <p className=" font-semibold">©2025 NetExpert. All rights reserved</p>
                <div className="flex justify-center space-x-6 mt-2 sm:mt-0 font-semibold">
                    <p className="hover:text-blue-500 cursor-pointer">Privacy & Policy</p>
                    <p className="hover:text-blue-500 cursor-pointer">Terms & Condition</p>
                </div>
            </div>
        </footer>
    );
}
