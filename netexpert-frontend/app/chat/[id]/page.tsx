"use client";

import React, { JSX, useRef } from "react";
import ReactMarkdown from "react-markdown";
import * as d3 from "d3";
import io from "socket.io-client";
import SendButtonSvg from "@/app/components/assets/SendButtonSvg";
import QuestionInCircleSvg from "@/app/components/assets/QuestionInCircleSvg";
import ChevronRightSvg from "@/app/components/assets/ChevronRightSvg";
import RefreshSvg from "@/app/components/assets/RefreshSvg";
import ThumbsUpSvg from "@/app/components/assets/ThumbsUpSvg";
import ThumbsDownSvg from "@/app/components/assets/ThumbsDownSvg";
import ClipboardSvg from "@/app/components/assets/ClipboardSvg";
import VolumeSvg from "@/app/components/assets/VolumeSvg";
import { useParams } from "next/navigation";

import messageData from "@/app/data/messageData.json";

const socket = io("http://localhost:4000");

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
  const [mess, setMessages] =
    React.useState<(MarkdownMessage | GraphMessage)[]>();
  const [hoveredMessage, setHoveredMessage] = React.useState<{
    parentIndex: number;
    childIndex: number;
  } | null>(null);
  const [input, setInput] = React.useState("");
  const [botTyping, setBotTyping] = React.useState(false); // State to track bot typing
  const params = useParams();
  const id = params["id"];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mess, botTyping]); // Runs when messages change or bot starts typing

  React.useEffect(() => {
    // Load previous chat history
    socket.emit("loadChat", id);
    socket.on("chatHistory", (history) => {
      setMessages(history);
      console.log("history", history);
    });

    // Listen for bot typing status
    socket.on("botTyping", ({ chatId, isTyping }) => {
      if (chatId === id) {
        setBotTyping(isTyping);
      }
    });

    // Listen for bot messages
    socket.on("botMessage", ({ chatId: responseChatId, message }) => {
      if (responseChatId === id) {
        setBotTyping(false); // Stop bot typing animation
        setMessages((prev) => (prev ? [...prev, message] : [message]));
      }
    });

    return () => {
      socket.off("chatHistory");
      socket.off("botTyping");
      socket.off("botMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      from: "user",
      contenttype: "markdown",
      content: input.trim(),
    };

    // Send message with chat ID
    socket.emit("userMessage", { chatId: id, message: userMessage });

    // Update UI immediately
    setMessages((prev) => (prev ? [...prev, userMessage] : [userMessage]));

    // Show bot typing animation automatically
    setBotTyping(true);

    setInput("");
  };

  const createGraph = (
    content: GraphMessage["content"],
    svgElement: SVGSVGElement | null
  ) => {
    if (!svgElement) return;

    // Prepare nodes and links
    const nodes = content.nodes.map((node) => ({
      id: node.id,
      label: node.data.label,
      image: node.data.image,
      x: 0, // Add x property
      y: 0, // Add y property
    }));

    const links = content.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const width = 600;
    const height = 400;

    // Clear previous SVG content
    const svg = d3.select<SVGSVGElement, unknown>(svgElement);
    svg.selectAll("*").remove();

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg
      .append("g")
      .attr("stroke", "#aaa")
      .attr("strokeWidth", 2)
      .selectAll("line")
      .data(links)
      .join("line");

    // Create custom image nodes
    const node = svg
      .append("g")
      .selectAll<SVGImageElement, any>("image")
      .data(nodes)
      .join("image")
      .attr("xlink:href", (d: any) => d.image) // Set image URL
      .attr("width", 40) // Adjust image size
      .attr("height", 40)
      .attr("x", -20) // Offset to center the image
      .attr("y", -20)
      .call(
        d3
          .drag<SVGImageElement, any>()
          .on(
            "start",
            (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
          )
          .on(
            "drag",
            (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
              d.fx = event.x;
              d.fy = event.y;
            }
          )
          .on(
            "end",
            (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
          )
      );

    node.append("title").text((d: any) => d.label); // Add tooltip to images

    // Add labels
    const label = svg
      .append("g")
      .selectAll<SVGTextElement, any>("text")
      .data(nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", 25) // Position below the image
      .attr("font-size", 12)
      .text((d: any) => d.label);

    // On each tick, update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      node.attr("x", (d: any) => d.x - 20).attr("y", (d: any) => d.y - 20);

      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y + 30);
    });
  };

  return (
    <div className="w-full h-full p-20 max-md:p-4 flex flex-col justify-between items-center gap-16">
      {/* {tooltip.content && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
          }}
        >
          {tooltip.content}
        </div>
      )} */}
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div ref={chatContainerRef} className="w-full overflow-auto scrollbar-none flex flex-col gap-9">
          {/* {messages.map((message, index) => ( */}
          <React.Fragment>
            {mess &&
              mess.map((msg, idx) => (
                <div
                  key={idx}
                  className={`w-full flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                  onMouseEnter={() =>
                    setHoveredMessage({ parentIndex: 0, childIndex: idx })
                  }
                  onMouseLeave={() => setHoveredMessage(null)}
                >
                  <div className="w-fit max-w-[55%]">
                    <div className="gap-2 py-6 px-10 rounded-lg border border-[rgba(255,250,250,0.10)] bg-[rgba(255,255,255,0.20)] ">
                      {msg.contenttype === "graph" && (
                        <div className=" aspect-video h-96 w-auto border">
                          <svg
                            ref={(ref) => {
                              if (ref) createGraph(msg.content, ref);
                            }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      )}
                      {msg.contenttype === "markdown" && (
                        <div className=" text-white">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {msg.from === "bot" && idx == 0 && (
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
              ))}

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
      </div>
      <form
        className="flex py-1 px-5 justify-between items-center w-full rounded-3xl border border-solid border-[#49D5E2] bg-[rgba(228,245,249,0.50)] shadow-[4px_12px_8px_0px_rgba(0,0,0,0.25)]"
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
  );
};

export default ChatID;
