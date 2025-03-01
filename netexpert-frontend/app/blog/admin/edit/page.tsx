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
                category: 'default' // or set the appropriate category value
            });
        }
        else{
            createBlog({
                title,
                thumbnail,
                content,
                category: 'default' // or set the appropriate category value
            });
        }
        router.push('/blog/admin');
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{blogId ? 'Edit Blog' : 'Create Blog'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Title</label>
                    <input
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Thumbnail</label>
                    <input
                        className="border p-2 w-full"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Markdown Content</label>
                    {/* For Markdown support, you could use a specialized editor, e.g. @uiw/react-md-editor */}
                    <textarea
                        className="border p-2 w-full h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {blogId ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
}
