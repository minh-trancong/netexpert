"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import BinSvg from "../components/assets/BinSvg";
import ExternalSvg from "../components/assets/ExternalSvg";
import SettingsSvg from "../components/assets/SettingsSvg";
import MicSvg from "../components/assets/MicSvg";
import SendButtonSvg from "../components/assets/SendButtonSvg";
import { Menu, X } from "lucide-react";
import { authFetch } from "../utils";
import { getUserConversations } from "../services/services";

interface NestedChatLinks {
  timetitle: string;
  chats: ChatLinks[];
}

interface ChatLinks {
  title: string;
  id: string;
}

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conservations, setConservations] = useState<any[]>([]);

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

  useEffect(() => {
    getUserConversations().then((data) => {
      console.log("user conservation", data);
      setConservations(data);
    });
    // authFetch('/api/chats?limit=10').then((response) => {
    //   if (response.status === 401) {
    //     console.log('Unauthorized');
    //   }
    // }).then((data) => {
    //   console.log(data);
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });
  }, []);

  return (
    <div className="flex w-screen h-screen flex-col">
      <Header />

      <div className="relative h-full w-full flex justify-center items-center bg-black bg-[radial-gradient(ellipse_at_61.25%_46.98%,_rgba(129,236,255,0.40)_0%,_rgba(109,226,239,0.12)_79.36%,_rgba(255,255,255,0)_100%)] overflow-hidden">
        {/* Toggle Button (Only visible on mobile) */}
        <button
          className={`absolute top-5 left-5 z-50 p-2 bg-gray-800/70 text-white rounded-md md:hidden ${
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
          className={`fixed top-0 left-0 h-full bg-black bg-[linear-gradient(180deg,_rgba(0,5,5,0.20)_-7.36%,_rgba(162,242,254,0.20)_29.48%,_rgba(106,185,216,0.20)_48.12%,_rgba(255,255,255,0.20)_99.77%)] backdrop-blur-[20px] gap-8 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-80 p-7 pb-16" : "-translate-x-full w-0"}
          md:relative md:translate-x-0 md:w-80 flex flex-col md:p-7 md:pb-16`}
        >
          <div className=" flex justify-end">
            {/* Close Button (Only visible on mobile) */}
            <button
              className={`p-2 bg-gray-800/40 text-white rounded-md md:hidden`}
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Chat Links */}
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {/* {demoData.map((group, index) => (
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
            ))} */}
            <div className="flex flex-col">
              {conservations.map((cons, index) => (
                <Link
                  href={`chat/${cons.id}`}
                  key={index}
                  className="p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <p className="text-white text-medium font-light capitalize">
                    {"Chat " + cons.id}
                  </p>
                </Link>
              ))}
            </div>
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

        {/* Right Pane */}
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
