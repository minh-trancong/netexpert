'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getMockBlogData } from '@/app/utils/mockData';
import type { BlogItem } from '@/app/types/blog';

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        // const mockData = getMockBlogData();
        // setBlogs(mockData.blogs);
        getMockBlogData().then((data) => setBlogs(data.blogs));
    }, []);

    //   useEffect(() => {
    //     fetch("/api/blogs")
    //       .then((res) => res.json())
    //       .then((data) => setBlogs(data));
    //   }, []);

    const handleDelete = async (id: number) => {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        setBlogs(blogs.filter((blog) => blog.blog_id !== id));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Blogs</h1>
                <Link href="/blog/admin/edit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Create Blog
                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Thumbnail</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.blog_id} className="border cursor-pointer hover:bg-gray-50">
                            <td className="border p-2">
                                <img
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className=" aspect-square w-24 h-auto object-cover mx-auto"
                                />
                            </td>
                            <td className="border p-2">
                                <Link href={`/blog/${blog.blog_id}`}>{blog.title}</Link>
                            </td>
                            <td className="p-2">
                                <div className='flex space-x-2 justify-center'>
                                    <button
                                        onClick={() =>
                                            router.push(`/blog/admin/edit?id=${blog.blog_id}`)
                                        }
                                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.blog_id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
