"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authFetch } from "@/app/utils";
import { getMockBlogData } from "@/app/utils/mockData";
import type { BlogItem } from "@/app/types/blog";
import Header from "@/app/components/Header";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    const mockData = getMockBlogData();
    setBlogs(mockData.blogs);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="w-full py-20 px-10 bg-gradient-to-b from-[rgba(129,236,255,0.2)] to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-h3 md:text-h1 font-bold text-white mb-6">
            Latest <span className="text-[#66E7F5]">Insights</span> & Updates
          </h1>
          <p className="text-[#8C8C8C] text-medium max-w-2xl mx-auto">
            Stay informed with our latest articles on network technology,
            connectivity solutions, and industry trends to enhance your
            understanding of digital infrastructure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id}>
              <div className="bg-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 w-full">
                  {blog.thumbnail ? (
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#49D5E2] to-[#66E7F5] opacity-50" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {blog.category && (
                      <span className="text-[#66E7F5] text-small font-medium">
                        {blog.category}
                      </span>
                    )}
                    <span className="text-[#8C8C8C] text-small">
                      {formatDate(blog.created_at)}
                    </span>
                  </div>
                  <h3 className="text-white text-h5 font-semibold mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-[#B5B5B5] text-medium line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
