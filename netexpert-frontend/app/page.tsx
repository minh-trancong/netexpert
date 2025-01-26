"use client"

import Image from "next/image";
import Header from "./components/Header";
import SendButtonSvg from "./components/assets/SendButtonSvg";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-col justify-center bg-[url('/assets/Homepage.png')] bg-cover bg-center bg-no-repeat bg-lightgray">
      <Header />
      <div className="w-full h-full flex py-0 px-20 flex-start flex-col justify-center gap-10">
        <div className="flex w-1/2 flex-col flex-start gap-5">
          <div className="flex flex-col flex-start gap-[13px]">
            <p className="text-small font-normal text-white text-transparent bg-clip-text bg-gradient-to-b from-[#CCE6F5] to-[#FFF]">
              Revolutionalizing Connectivity with AI Precision
            </p>
            <p className="text-[#C7EBEB] font-[Inter] text-[54px] font-extrabold leading-[120%] uppercase">
              Empower Networks with Smart AI
            </p>
          </div>
          <p className="text-medium font-medium text-[#C7EBEB] opacity-75">
            Unlock a new era of seamless connectivity and unparalleled performance, cutting-edge AI-driven technology, meticulously crafted to meet the needs of professionals seeking efficiency and enterprises striving for innovation and growth.
          </p>
        </div>
        <div className="flex w-fit py-2 px-6 justify-center items-center gap-[52px] rounded-[20px] border border-[#95F1F4] bg-[rgba(5,197,245,0.5)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <p className="text-large font-medium text-[#F2F2F2]">
            How can I help you 
          </p>
          <SendButtonSvg className="w-6 h-6 flex-shrink-0"/>
        </div>
      </div>
    </div>
  )
}
