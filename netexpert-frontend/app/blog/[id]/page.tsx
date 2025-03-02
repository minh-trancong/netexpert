import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Footer from '@/app/components/Footer';
import ai from '@/public/assets/ai.jpg';

import detailBlogData from '@/app/mock/detailBlogDate.json';

const relatedArticles = [
    {
        id: '1',
        title: 'A reliable Ally for Accessing Your Connection',
        date: 'December 1, 2024',
        img_url:
            'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: '2',
        title: 'Wireless efforts Aid New Website in IoT',
        date: 'December 6, 2024',
        img_url:
            'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: '3',
        title: 'ARCEP Top Chooses ePerf for Its Data Management',
        date: 'December 9, 2024',
        img_url:
            'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

export default function BlogPost() {
    return (
        <div>
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Main Content */}

                {/* Header */}
                <div className=" space-y-4 pb-4">
                    <div>
                        <a href="#" className=" text-slate-400 font-semibold text-base">
                            Home / News
                        </a>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">{detailBlogData['title']}</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        By Tracy Wilson • November 16, 2023
                    </p>
                </div>

                {/* Body */}
                <div className="flex">
                    <div className="w-full md:w-3/4">
                        <Image
                            src={ai}
                            alt="AI Cyber Security"
                            className="mt-4 rounded-lg aspect-video object-cover"
                        />
                        <div className="mt-6 space-y-4">
                            <ReactMarkdown>{detailBlogData['content']}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Sidebar - Categories */}
                    <div className="hidden md:block md:w-1/4 md:ml-8 mt-10 md:mt-0">
                        <h2 className="text-2xl font-semibold text-[#232536]">Categories</h2>
                        <ul className="mt-4 space-y-2 text-gray-600 font-semibold pl-4">
                            <li className="hover:text-blue-500 cursor-pointer">All</li>
                            <li className="hover:text-blue-500 cursor-pointer">News</li>
                            <li className="hover:text-blue-500 cursor-pointer">
                                Network Optimization
                            </li>
                            <li className="hover:text-blue-500 cursor-pointer">Technology</li>
                            <li className="hover:text-blue-500 cursor-pointer">Digital Services</li>
                        </ul>
                    </div>
                </div>

                {/* Related Articles */}
                <div className=" pt-12">
                    <h2 className="text-3xl font-bold text-gray-800 pb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                        {relatedArticles.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blog/${blog.id}`}
                                className="border rounded-xl hover:shadow-md transition"
                            >
                                <Image
                                    src={blog.img_url}
                                    alt="AI Cyber Security"
                                    width={1260}
                                    height={750}
                                    className=" rounded-xl aspect-[4/3] object-cover shadow-md"
                                />
                                <div className=" px-6 pt-6 pb-4">
                                    <p className="text-gray-400 text-sm">{blog.date}</p>
                                    <h3 className="text-lg font-semibold text-gray-900 mt-2">
                                        {blog.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
