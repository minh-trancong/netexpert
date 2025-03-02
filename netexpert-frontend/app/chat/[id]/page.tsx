"use client";

import React, { JSX, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";

// import io from "socket.io-client";
import SendButtonSvg from "@/app/components/assets/SendButtonSvg";
import QuestionInCircleSvg from "@/app/components/assets/QuestionInCircleSvg";
import ChevronRightSvg from "@/app/components/assets/ChevronRightSvg";
import RefreshSvg from "@/app/components/assets/RefreshSvg";
import ThumbsUpSvg from "@/app/components/assets/ThumbsUpSvg";
import ThumbsDownSvg from "@/app/components/assets/ThumbsDownSvg";
import ClipboardSvg from "@/app/components/assets/ClipboardSvg";
import VolumeSvg from "@/app/components/assets/VolumeSvg";
import { useParams } from "next/navigation";

import { getChatHistory, getResponse } from "@/app/services/services";

import messageData from "@/app/data/messageData.json";
import { LayoutContext } from "@/app/chat/layout"; // Import context

// const socket = io("http://localhost:4000");

// Interfaces
interface MarkdownMessage {
  from: "user" | "bot";
  contenttype: "markdown";
  content: string;
}

interface GraphMessage {
  from: "bot";
  contenttype: "graph";
  content: {
    nodes: {
      id: string;
      type: "custom";
      data: {
        label: string;
        image: string;
      };
    }[];
    edges: {
      id: string;
      source: string;
      target: string;
    }[];
  };
}

interface Message {
  status: "success" | "error";
  messages: (MarkdownMessage | GraphMessage)[];
}

// Sample Messages
const sampleMessages: Message[] = messageData as Message[];

const sampleFollowUps: String[] = [
  "How many devices do you plan to connect to the network?",
  "What type of internet connection do you currently have?",
  "Would you like recommendations for cost-effective equipment?",
];

// TypeScript-compatible Component
const ChatID: React.FC = () => {
  // const messages = sampleMessages;
  const [mess, setMessages] = React.useState<any[]>();
  const [hoveredMessage, setHoveredMessage] = React.useState<{
    parentIndex: number;
    childIndex: number;
  } | null>(null);
  const [input, setInput] = React.useState("");
  const [botTyping, setBotTyping] = React.useState(false); // State to track bot typing
  const params = useParams();
  const conservation_id = params["id"] as string;
  const user_id = localStorage.getItem("user_id") || "";
  const { setReportContent } = useContext(LayoutContext); // Use context

  const chatContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [mess, botTyping]); // Runs when messages change or bot starts typing

  React.useEffect(() => {
    getChatHistory(conservation_id, user_id, "").then((data) => {
      console.log("chat history", data);
      setMessages(data);
    });
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Update UI immediately
    let processUserMessage = {
      is_ai_response: false,
      message: input.trim(),
    };
    setMessages((prev) =>
      prev ? [...prev, processUserMessage] : [processUserMessage]
    );

    // Show bot typing animation automatically
    setBotTyping(true);

    // Send message with chat ID
    getResponse(input.trim()).then((response) => {
      setMessages((prev) => (prev ? [...prev, response] : response));
      setBotTyping(false);

      // Check for report attribute
      if (response.report) {
        setReportContent(response);
      }
    });

    setInput("");
  };

  const openReportPanel = (content : any) => {
    console.log("Open report panel", content);
    setReportContent(content);
  }



  return (
    <div className="w-full h-full px-8 lg:px-10 2xl:px-20 max-md:p-4 flex flex-col justify-between items-center gap-16">
      <div className="w-full h-screen flex flex-col overflow-hidden pb-12">
        <div
          ref={chatContainerRef}
          className="w-full h-full overflow-auto scrollbar-none flex flex-col gap-9 pt-8"
        >
          {/* {messages.map((message, index) => ( */}
          <React.Fragment>
            {mess &&
              mess.map((msg, idx) => {
                let contentType = "report";
                if (msg.networks === undefined || msg.networks.length == 0) {
                  contentType = "markdown";
                }

                return (
                  <div
                    key={idx}
                    className={`w-full flex ${
                      !msg.is_ai_response ? "justify-end" : "justify-start"
                    }`}
                    onMouseEnter={() =>
                      setHoveredMessage({ parentIndex: 0, childIndex: idx })
                    }
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <div className="w-fit max-w-[55%]">
                      <div className="gap-2 p-3 lg:py-6 lg:px-10 w-fit rounded-lg border border-[rgba(255,250,250,0.10)] bg-[rgba(255,255,255,0.20)] ">
                        {contentType === "report" && (
                          <div>
                            <h1 className=" text-white">{msg.message}</h1>
                            <button
                              onClick={() => openReportPanel(msg)}
                              className=" text-blue-500 hover:text-blue-400 transition-colors duration-200 underline"
                            >
                              Check the report
                            </button>
                          </div>
                        )}
                        {contentType === "markdown" && (
                          <div className=" text-white">
                            <ReactMarkdown>{msg.message}</ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {msg.is_ai_response && idx == 0 && (
                        <div className=" text-white pt-4 pl-8">
                          <div>
                            <h3 className=" text-lg">Follow-ups:</h3>
                            <div className=" font-light space-y-3 pt-2 pl-6 cursor-pointer">
                              {sampleFollowUps.map((msg, idx) => (
                                <div
                                  className=" flex items-center border-0 border-b-[1px] border-b-slate-400 w-1/2"
                                  key={idx}
                                >
                                  <QuestionInCircleSvg className="w-7 h-7" />
                                  <p className=" pl-4">{msg}</p>
                                  <ChevronRightSvg className=" w-4 h-4 ml-auto" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tool bar - Smooth Animation*/}
                      {msg.from === "bot" && (
                        <div
                          className={`mt-4 flex justify-center gap-4 bg-white/5 px-4 py-1 rounded-full w-fit transition-all duration-300 ease-in-out ${
                            hoveredMessage?.parentIndex === 0 &&
                            hoveredMessage?.childIndex === idx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2 pointer-events-none"
                          }`}
                        >
                          <button className="p-2 hover:bg-gray-700 rounded-lg ">
                            <RefreshSvg className="text-gray-400 w-5 h-5" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg">
                            <ThumbsUpSvg className="text-gray-400 w-5 h-5" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg">
                            <ThumbsDownSvg className="text-gray-400 w-5 h-5" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg">
                            <ClipboardSvg className="text-gray-400 w-5 h-5" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg">
                            <VolumeSvg className="text-gray-400 w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* Bot Typing Animation */}
            {botTyping && (
              <div className="message bot typing-animation justify-start">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </React.Fragment>
          {/* ))} */}
        </div>

        <form
          className="flex mt-4 py-1 px-5 justify-between items-center w-full rounded-3xl border border-solid border-[#49D5E2] bg-[rgba(228,245,249,0.50)] shadow-[4px_12px_8px_0px_rgba(0,0,0,0.25)]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="flex justify-center items-center gap-2 p-2 w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full text-white text-large font-medium leading-[120%] placeholder:text-white placeholder:text-large placeholder:font-medium placeholder:leading-[120%]"
              placeholder="Ask anything from here"
            />
          </label>
          <button className="w-7 h-7" onClick={sendMessage}>
            <SendButtonSvg className="w-7 h-7" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatID;
