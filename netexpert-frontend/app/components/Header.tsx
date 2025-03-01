"use client";
import React from "react";
import LogoSvg from "./assets/LogoSvg";
import Link from "next/link";
import MagnifyingGlassSvg from "./assets/MagnifyingGlassSvg";
import { User } from "lucide-react";

const Header = () => {
  const [user, setUser] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
  };

  const navs = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
    { name: "Chat", link: "/chat" },
  ];

  return (
    <div className="flex justify-between py-4 px-20 pr-10 items-center gap-4 w-full border-b-[0.5px] border-solid border-white bg-black">
      <div className="flex items-center gap-3 w-fit">
        <LogoSvg className="w-[46px] h-[42px]" />
        <p className="font-bold text-h3 text-white">NetExpert</p>
      </div>

      <div className="flex w-full justify-center items-center gap-4 max-lg:hidden">
        {navs.map((nav, index) => (
          <Link
            href={nav.link}
            key={index}
            className="font-semibold text-large text-white text-center flex p-3 flex-shrink-0 justify-center"
          >
            {nav.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6 w-fit">
        <div className="relative">
          {user ? (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center"
            >
              <User className="w-6 h-6 cursor-pointer text-white" />
            </button>
          ) : (
            <Link
              href="/login"
              className="flex py-3 px-9 justify-center items-center gap-2 rounded-lg bg-white font-semibold shadow-md hover:bg-slate-100 transition duration-300"
            >
              <div className=" w-12">
                <p className="text-center text-[16px] leading-[16px]">Log in</p>
              </div>
            </Link>
          )}
          {isOpen && (
            <div className="absolute right-0 top-12 z-40 bg-white text-black shadow-lg rounded-lg py-2 w-40 border border-gray-200">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
