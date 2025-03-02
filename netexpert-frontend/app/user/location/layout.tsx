import type { Metadata } from "next";
import Header from "@/app/components/Header";

export default function LocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}
