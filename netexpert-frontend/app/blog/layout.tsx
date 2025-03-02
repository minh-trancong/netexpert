"use client";
import React from "react";
import Header from "@/app/components/Header";
import Footer from '@/app/components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-black flex flex-col">
      <Header />

      <div className="bg-white">{children}</div>
    </div>
  );
};

export default Layout;
