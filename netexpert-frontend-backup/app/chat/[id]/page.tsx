"use client";

import React, { JSX, useRef } from "react";
import ReactMarkdown from "react-markdown";
import * as d3 from "d3";
import SendButtonSvg from "@/app/components/assets/SendButtonSvg";

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
          nodes: [
            {
              id: "1",
              type: "custom",
              data: {
                label: "Node 1",
                image: "https://via.placeholder.com/50",
              },
            },
            {
              id: "2",
              type: "custom",
              data: {
                label: "Node 2",
                image: "https://via.placeholder.com/50",
              },
            },
            {
              id: "3",
              type: "custom",
              data: {
                label: "Node 3",
                image:
                  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
              },
            },
          ],
          edges: [
            {
              id: "e1-2",
              source: "1",
              target: "2",
            },
            {
              id: "e2-3",
              source: "2",
              target: "3",
            },
          ],
        },
      },
    ],
  },
];

// TypeScript-compatible Component
const ChatID: React.FC = () => {
  const [messages] = React.useState<Message[]>(sampleMessages);

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
        <div className="w-full overflow-auto flex flex-col gap-9">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`w-full flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
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
        className="flex py-1 px-5 justify-between items-center w-full rounded-3xl border border-solid border-[#49D5E2] bg-[rgba(228,245,249,0.50)] shadow-[4px_12px_8px_0px_rgba(0,0,0,0.25)]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="flex justify-center items-center gap-2 p-2 w-full">
          <input
            className="w-full text-white text-large font-medium leading-[120%] placeholder:text-white placeholder:text-large placeholder:font-medium placeholder:leading-[120%]"
            placeholder="Ask anything from here"
          />
        </label>
        <button className="w-7 h-7">
          <SendButtonSvg className="w-7 h-7" />
        </button>
      </form>
    </div>
  );
};

export default ChatID;
