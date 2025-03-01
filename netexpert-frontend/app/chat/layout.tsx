"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import BinSvg from "../components/assets/BinSvg";
import ExternalSvg from "../components/assets/ExternalSvg";
import SettingsSvg from "../components/assets/SettingsSvg";
import MicSvg from "../components/assets/MicSvg";
import SendButtonSvg from "../components/assets/SendButtonSvg";
import { Menu, X } from "lucide-react";
import { authFetch } from "../utils";
import network from "@/public/assets/network.png";

interface NestedChatLinks {
  timetitle: string;
  chats: ChatLinks[];
}

interface ChatLinks {
  title: string;
  id: string;
}

const tmpTableData = [
  {
    option: 1,
    provider: "ABC Company",
    cost: 450,
    strengths:
      "Excellent balance between quality and affordability, specialized in small business networks.",
    specialty: "Small Business",
    link: "#",
  },
  {
    option: 2,
    provider: "Budget Connect",
    cost: 300,
    strengths: "Low-cost solutions, suitable for basic installations.",
    specialty: "Basic Installations",
    link: "#",
  },
  {
    option: 3,
    provider: "Elite Network",
    cost: 700,
    strengths:
      "Top-tier products and services, ideal for businesses prioritizing performance and scalability.",
    specialty: "High-Performance and Scalable Solutions",
    link: "#",
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const demoData: NestedChatLinks[] = [
    {
      timetitle: "Today",
      chats: [
        {
          title: "John Doe",
          id: "1",
        },
        {
          title: "Jane Doe",
          id: "2",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
    {
      timetitle: "Yesterday",
      chats: [
        {
          title: "John Doe",
          id: "3",
        },
        {
          title: "Jane Doe",
          id: "4",
        },
      ],
    },
  ];

  // useEffect(() => {
  //   authFetch('/api/chats?limit=10').then((response) => {
  //     if (response.status === 401) {
  //       console.log('Unauthorized');
  //     }
  //   }).then((data) => {
  //     console.log(data);
  //   }).catch((error) => {
  //     console.error('Error:', error);
  //   });

  // }, []);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="relative h-full w-full flex-1 flex flex-col md:flex-row pt-[72px] justify-center items-center bg-black bg-[radial-gradient(ellipse_at_61.25%_46.98%,_rgba(129,236,255,0.40)_0%,_rgba(109,226,239,0.12)_79.36%,_rgba(255,255,255,0)_100%)] overflow-hidden">
        {/* Toggle Button (Only visible on mobile) */}
        <button
          className={`absolute top-5 left-5 z-50 p-2 bg-gray-800/70 text-white rounded-md  ${
            isOpen ? "hidden" : ""
          }`}
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Backdrop (Closes sidebar when clicked) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Left Pane */}
        <div
          className={`${
            isOpen
              ? "translate-x-0 w-80 p-7 pt-24 md:pt-7 pb-16 opacity-100"
              : "-translate-x-full w-0 opacity-0"
          }
          fixed md:relative md:translate-x-0 top-0 left-0 h-full z-40
          bg-black bg-[linear-gradient(180deg,_rgba(0,5,5,0.20)_-7.36%,_rgba(162,242,254,0.20)_29.48%,_rgba(106,185,216,0.20)_48.12%,_rgba(255,255,255,0.20)_99.77%)]
          backdrop-blur-[20px] gap-8 transition-all duration-300 ease-in-out
          flex flex-col`}
        >
          <div className=" flex justify-end">
            {/* Close Button (Only visible on mobile) */}
            <button
              className={`p-2 bg-gray-800/40 text-white rounded-md `}
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Chat Links */}
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {demoData.map((group, index) => (
              <div key={index} className="mb-6">
                <p className="text-white text-extra-small font-semibold mb-3">
                  {group.timetitle}
                </p>
                <div className="flex flex-col">
                  {group.chats.map((chat) => (
                    <Link
                      href={`${chat.id}`}
                      key={chat.id}
                      className="p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                      <p className="text-[#8C8C8C] text-medium font-light capitalize">
                        {chat.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Links */}
          <div className={`flex flex-col gap-3 w-full ${!isOpen && "hidden"}`}>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                console.log("Clear all conversations clicked");
              }}
            >
              <BinSvg className="w-6 h-6" />
              <p className="text-white font-semibold text-extra-small">
                Clear all conversations
              </p>
            </div>
            <Link href="faq" className="flex items-center gap-3">
              <ExternalSvg className="w-6 h-6" />
              <p className="text-white font-semibold text-extra-small">
                Update and FAQ's
              </p>
            </Link>
            <Link href={"settings/chat"} className="flex items-center gap-3">
              <SettingsSvg className="w-6 h-6" />
              <p className="text-white font-semibold text-extra-small">
                Settings
              </p>
            </Link>
          </div>
        </div>

        <div className="w-full h-full relative">
          <div className="h-full w-full overflow-y-auto">{children}</div>
        </div>

        {/* Right Pane */}
        <div
          className={`fixed top-0 right-0 h-full bg-black backdrop-blur-[20px] transition-all duration-500 ease-in-out ${
            isRightOpen ? "translate-x-0 w-[60%] p-7" : "translate-x-full w-0"
          } flex flex-col z-50 overflow-auto`}
        >
          {isRightOpen && (
            <div>
              <button
                className={`p-2 text-white rounded-md w-fit hover:bg-slate-700/40 transition-all duration-200 ease-in-out`}
                onClick={() => setIsRightOpen(false)}
              >
                <X size={24} />
              </button>

              <div className="text-white px-12 py-8">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Proposed Network Configuration
                </h1>
                <ul className="mt-4 space-y-2 text-gray-300 md:text-xl list-disc list-inside">
                  <li>
                    <strong>Internet Connection:</strong> Connects to the
                    Firewall for security.
                  </li>
                  <li>
                    <strong>Firewall:</strong> Directs traffic to the Router and
                    Wi-Fi Access Point.
                    <ul className="list-disc list-inside ml-5">
                      <li>Router</li>
                      <li>Wi-Fi Access Point</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Router:</strong> Distributes connection to Switches
                    for wired devices.
                    <ul className="list-disc list-inside ml-5">
                      <li>Switch</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Switch:</strong> Connects to Server, PCs, and
                    Printer.
                    <ul className="list-disc list-inside ml-5">
                      <li>Server</li>
                      <li>PCs</li>
                      <li>Printer</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Wi-Fi Access Point:</strong> Provides wireless
                    connectivity.
                  </li>
                </ul>

                <Image
                  src={network}
                  alt={"Network Diagram"}
                  className="max-w-2xl mt-8"
                />

                <table className="w-full mt-8 text-left text-gray-300">
                  <thead className="bg-[#00AFA9] text-white">
                    <tr>
                      <th className="border border-white p-2">Option</th>
                      <th className="border border-white p-2">Provider</th>
                      <th className="border border-white p-2">Cost</th>
                      <th className="border border-white p-2">Strengths</th>
                      <th className="border border-white p-2">Specialty</th>
                      <th className="border border-white p-2">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tmpTableData.map((data, index) => (
                      <tr key={index}>
                        <td className="border border-gray-700 p-2">
                          {data.option}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {data.provider}
                        </td>
                        <td className="border border-gray-700 p-2">
                          ${data.cost}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {data.strengths}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {data.specialty}
                        </td>
                        <td className="border border-gray-700 p-2">
                          <Link
                            href={data.link}
                            className="text-blue-400 underline"
                          >
                            Visit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <button
          className="absolute top-5 right-5 z-50 p-2 bg-gray-800/70 text-white rounded-md"
          onClick={() => {
            setIsRightOpen(!isRightOpen);
            if (!isRightOpen) setIsOpen(false);
          }}
        >
          Toggle Right Panel
        </button>
      </div>
    </div>
  );
};

export default layout;
