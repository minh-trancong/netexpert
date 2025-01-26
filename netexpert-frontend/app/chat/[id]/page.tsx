"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import * as d3 from "d3";
import SendButtonSvg from "@/app/components/assets/SendButtonSvg";
import { authFetch } from "@/app/utils";
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
    devices: {
      id: string;
      device_type: string;
      name: string;
      quantity: number;
      img_url: string;
    }[];
    network_diagram: {
      device_id: string;
      connection_to: string[];
    }[];
    cost: number;
  };
}

interface Message {
  status: "success" | "error";
  messages: (MarkdownMessage | GraphMessage)[];
}

// Sample Messages
const sampleMessages: Message[] = [
  {
    status: "success",
    messages: [
      {
        from: "user",
        contenttype: "markdown",
        content: "Hello, how can I use graphs in my application?",
      },
      {
        from: "bot",
        contenttype: "markdown",
        content:
          "You can use libraries like **React Flow**, **D3.js**, or **Cytoscape.js** to create interactive graph visualizations.",
      },
    ],
  },
  {
    status: "success",
    messages: [
      {
        from: "bot",
        contenttype: "graph",
        content: {
          devices: [
            {
              id: "device1",
              device_type: "router",
              name: "Router A",
              quantity: 1,
              img_url: "https://via.placeholder.com/100",
            },
            {
              id: "device2",
              device_type: "switch",
              name: "Switch B",
              quantity: 2,
              img_url: "https://via.placeholder.com/100",
            },
          ],
          network_diagram: [
            {
              device_id: "device1",
              connection_to: ["device2"],
            },
            {
              device_id: "device2",
              connection_to: ["device1"],
            },
          ],
          cost: 1500.75,
        },
      },
    ],
  },
];

const ChatID = ({ params }:any ) => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setchatId] = useState("");

  useEffect(() => {
    if (params instanceof Promise) {
      params.then((resolvedParams) => {
        console.log("Resolved Params:", resolvedParams); // Inspect the resolved data
        console.log("ID:", resolvedParams.id); // Access the id
        setchatId(resolvedParams.id);
      });
    }

  }, [])

  const createGraph = (content: GraphMessage["content"], svgElement: SVGSVGElement | null) => {
    if (!svgElement) return;

    const devices = content.devices.map((device) => ({
      id: device.id,
      label: device.name,
      image: device.img_url,
      x: 0,
      y: 0,
    }));

    const links = content.network_diagram.flatMap((connection) =>
      connection.connection_to.map((target) => ({
        source: connection.device_id,
        target,
      }))
    );

    const width = 600;
    const height = 400;

    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(devices)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .selectAll("line")
      .data(links)
      .join("line");


    const node = svg
      .append("g")
      .selectAll<SVGImageElement, any>("image")
      .data(devices)
      .join("image")
      .attr("xlink:href", (d: any) => d.image) // Set image URL
      .attr("width", 40) // Adjust image size
      .attr("height", 40)
      .attr("x", -20) // Offset to center the image
      .attr("y", -20)
      .call(
        d3
          .drag<SVGImageElement, any>()
          .on("start", (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: d3.D3DragEvent<SVGImageElement, any, any>, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );


    node.append("title").text((d: any) => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      node.attr("x", (d: any) => d.x - 25).attr("y", (d: any) => d.y - 25);
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setInputValue("");

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        status: "success",
        messages: [
          {
            from: "user",
            contenttype: "markdown",
            content: (e.target as any).question.value,
          },
        ],
      },
    ]);

    const form = e.target as HTMLFormElement;
    const question = (form.elements.namedItem("question") as HTMLInputElement).value;

    try {

      const questionResponse = await authFetch("/api/chat/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ chatId, question }),
      }).then((response) => {
        if (response.status === 401) {
          window.location.href = "/login";
          return;
        } else if (response.status === 200) {
          return response.json();
        }
        return { error: true };
      }).then((data) => {
        if (data.error) {
          console.error("Error:", data);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              status: "error",
              messages: [
                {
                  from: "bot",
                  contenttype: "markdown",
                  content: "An error occurred while processing your question.",
                },
              ],
            },
          ]);

        } else {
          console.log(data);
          setMessages((prevMessages) => [
            ...prevMessages,
            data
          ]);
        
        }
      })
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full p-20 max-md:p-4 flex flex-col justify-between items-center gap-16">
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="w-full overflow-auto flex flex-col gap-9">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`w-full flex ${msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div className="gap-2 py-6 px-10 rounded-lg border border-[rgba(255,250,250,0.10)] bg-[rgba(255,255,255,0.20)] w-full max-w-[75%]">
                    {msg.contenttype === "graph" && (
                      <div className="h-96 w-full border">
                        <svg
                          ref={(ref) => {
                            if (ref) createGraph(msg.content, ref);
                          }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    )}
                    {msg.contenttype === "markdown" && (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex py-1 px-5 justify-between items-center w-full rounded-3xl border border-solid border-[#49D5E2] bg-[rgba(228,245,249,0.50)] shadow-[4px_12px_8px_0px_rgba(0,0,0,0.25)]"
      >
        <label className="flex justify-center items-center gap-2 p-2 w-full">
          <input
            name="question"
            className="w-full text-white text-large font-medium leading-[120%] placeholder:text-white placeholder:text-large placeholder:font-medium placeholder:leading-[120%]"
            placeholder="Ask anything from here"
            value={inputValue} // Controlled input value
            onChange={(e) => setInputValue(e.target.value)} // Update state on change
          />
        </label>         <button className="w-7 h-7">
          <SendButtonSvg className="w-7 h-7" />
        </button>
      </form>
    </div>
  );
};

export default ChatID;