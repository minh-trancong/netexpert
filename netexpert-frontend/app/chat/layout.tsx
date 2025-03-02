"use client";

import React, { useEffect, useState, createContext, useRef } from "react";
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
import ReactMarkdown from "react-markdown";
import * as d3 from "d3";
import network from "@/public/assets/network.png";
import { getUserConversations } from "../services/services";

interface NestedChatLinks {
  timetitle: string;
  chats: ChatLinks[];
}

interface ChatLinks {
  title: string;
  id: string;
}
interface GraphData {
  networks: Array<{
    cost: number;
    devices: Array<{
      quantity: number;
      id: string;
      device_type: string;
      name: string;
      img_url: string;
    }>;
    network_diagram: Array<{
      connection_to: Array<string>;
      device_id: string;
    }>;
    type: string;
  }>;
}

export const LayoutContext = createContext<{
  setReportContent: (content: string | null) => void;
}>({ setReportContent: () => {} });

const layout = ({ children }: { children: React.ReactNode }) => {
  const [reportContent, setReportContent] = useState<any>(null);
  const [networkData, setNetworkData] = useState<GraphData | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [conservations, setConservations] = useState<any[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const createGraph = (
    content: GraphData,
    svgElement: SVGSVGElement | null
  ) => {
    if (!svgElement) return;

    // Take width height
    const boundingRect = svgElement.getBoundingClientRect();
    const width = boundingRect.width;
    const height = boundingRect.height;

    // Prepare nodes and links
    const nodes = content.networks[0].devices.map((device) => ({
      id: device.id,
      label: device.name,
      image: device.img_url,
      x: width / 2, // Center x property
      y: height / 2, // Center y property
    }));

    const links = content.networks[0].network_diagram.flatMap((diagram) =>
      diagram.connection_to.map((targetId) => ({
        source: diagram.device_id,
        target: targetId,
      }))
    );

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
          .distance(200) // Increase the distance between nodes
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(500, 200));

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
      .attr("width", 60) // Adjust image size
      .attr("height", 60)
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
      .attr("fill", "white") // Set label color to white
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

  const handleCloseRightPanel = () => {
    setIsRightOpen(false);
    setReportContent(null);
  };

  useEffect(() => {
    getUserConversations().then((data) => {
      setConservations(data);
    });
  }, []);

  useEffect(() => {
    if (reportContent) {
      let tmpData = {
        networks: reportContent.networks,
      };
      setNetworkData(tmpData);
      setIsRightOpen(true);
    }
  }, [reportContent]);

  useEffect(() => {
    if (networkData && svgRef.current) {
      console.log(networkData);
      createGraph(networkData, svgRef.current);
    }
  }, [networkData]);

  return (
    <LayoutContext.Provider value={{ setReportContent }}>
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
                    href={`/chat/${cons.id}`}
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
            <div
              className={`flex flex-col gap-3 w-full ${!isOpen && "hidden"}`}
            >
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
                  onClick={() => handleCloseRightPanel()}
                >
                  <X size={24} />
                </button>

                <div className="text-white px-12 py-8">
                  <table className="w-full my-8 text-left text-gray-300 ">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        <th className="border border-white p-2">Device ID</th>
                        <th className="border border-white p-2">Name</th>
                        <th className="border border-white p-2">Type</th>
                        <th className="border border-white p-2">Quantity</th>
                        {/* <th className="border border-white p-2">Cost</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {networkData?.networks[0].devices.map((device, index) => (
                        <tr key={index}>
                          <td className="border border-gray-700 p-2">
                            {device.id}
                          </td>
                          <td className="border border-gray-700 p-2">
                            {device.name}
                          </td>
                          <td className="border border-gray-700 p-2">
                            {device.device_type}
                          </td>
                          <td className="border border-gray-700 p-2">
                            {device.quantity}
                          </td>
                          {/* <td className="border border-gray-700 p-2">
                            ${device.quantity * device.cost}
                          </td> */}
                        </tr>
                      ))}
                      <tr>
                        <td className="border border-gray-700 p-2" colSpan={3}>
                          Total Cost
                        </td>
                        <td className="border border-gray-700 p-2">
                          ${networkData?.networks[0].cost}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {reportContent.report && (
                    <div>
                      <ReactMarkdown>{reportContent.report}</ReactMarkdown>
                    </div>
                  )}

                  <svg
                    ref={svgRef}
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* <button
            className="absolute top-5 right-5 z-50 p-2 bg-gray-800/70 text-white rounded-md"
            onClick={() => {
              setIsRightOpen(!isRightOpen);
              if (!isRightOpen) setIsOpen(false);
            }}
          >
            Toggle Right Panel
          </button> */}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default layout;
