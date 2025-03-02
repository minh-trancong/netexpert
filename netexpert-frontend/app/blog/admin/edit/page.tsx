'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBlog, getBlogById, updateBlog } from '@/app/services/blogServices';

export default function BlogEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (blogId) {
            // fetch(`/api/blogs/${blogId}`)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         setTitle(data.title);
            //         setThumbnail(data.thumbnail);
            //         setContent(data.content);
            //     });
            getBlogById(parseInt(blogId, 10)).then((data) => {
                setTitle(data.title);
                setThumbnail(data.thumbnail);
                setContent(data.content);
            });
        }
    }, [blogId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // const method = blogId ? 'PUT' : 'POST';
        // await fetch(`/api/blogs${blogId ? `/${blogId}` : ''}`, {
        //     method,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title, thumbnail, content }),
        // });
        if (blogId) {
            updateBlog(parseInt(blogId, 10), {
                title,
                thumbnail,
                content,
                category: 'default', // or set the appropriate category value
            });
        } else {
            createBlog({
                title,
                thumbnail,
                content,
                category: 'default', // or set the appropriate category value
            });
        }
        router.push('/blog/admin');
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white shadow-md border border-slate-200 rounded-lg mt-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {blogId ? 'Edit Blog' : 'Create Blog'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                    <input
                        className="ring-[1px] ring-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title..."
                    />
                </div>

                {/* Thumbnail URL Input */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Thumbnail URL
                    </label>
                    <input
                        type="text"
                        className="ring-[1px] ring-slate-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Enter image URL..."
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />
                    {thumbnail && (
                        <img
                            src={thumbnail}
                            alt="Thumbnail Preview"
                            className="mt-4 w-full h-48 object-cover rounded-lg shadow"
                        />
                    )}
                </div>

                {/* Markdown Content */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Markdown Content
                    </label>
                    <textarea
                        className="ring-[1px] ring-slate-300 p-3 w-full h-40 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog content here..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {blogId ? 'Update Blog' : 'Create Blog'}
                </button>
            </form>
        </div>
    );
}
