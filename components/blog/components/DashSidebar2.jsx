import React, { useEffect, useState } from 'react';
import { Sidebar } from "flowbite-react";
import Link from "next/link"; // Import Link from Next.js
import PostCard2 from './PostCard2';

// Dummy data for ads and news
const ads = [
  { id: 1, image: 'https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg', link: 'https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg' },
  { id: 2, image: 'https://adphotography.in/wp-content/uploads/2021/03/couple_635_2.jpg', link: 'https://adphotography.in/wp-content/uploads/2021/03/couple_635_2.jpg' },
  { id: 3, image: 'https://visualeducation.com/wp-content/uploads/2017/12/web-Job_10215flatA.jpg', link: 'https://visualeducation.com/wp-content/uploads/2017/12/web-Job_10215flatA.jpg' },
  { id: 4, image: 'https://i.ytimg.com/vi/qx5Q3brn4RA/maxresdefault.jpg', link: 'https://i.ytimg.com/vi/qx5Q3brn4RA/maxresdefault.jpg' },
];

const news = [
  { id: 1, title: 'New Camera Gear Released!', link: '/news/gear-release' },
  { id: 2, title: '10 Photography Tips for Beginners', link: '/news/tips' },
];

export default function DashSidebar2() {
  const [adIndex, setAdIndex] = useState(0);

  // Rotating ads every 4 seconds
  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 4000);

    return () => clearInterval(adInterval);
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <Sidebar className="w-full md:w-72 bg-gray-100 p-4 rounded-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-4">

          {/* Ads Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Offers</h2>
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <a href={ads[adIndex].link} target="_blank" rel="noopener noreferrer">
                <img
                  src={ads[adIndex].image}
                  alt={`Ad ${adIndex + 1}`}
                  className="w-full h-auto object-cover"
                />
              </a>
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className='max-w-6xl mx-auto p-3 py-7'>
            {posts && posts.length > 0 && (
              <div className='flex flex-col gap-6 items-center'>
                <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className='max-w-6xl mx-auto p-3 py-7 flex flex-col gap-8'>
                  {/* Show only 3 recent posts */}
                  {posts.slice(0, 3).map((post) => (
                    <PostCard2 key={post._id} post={post} />
                  ))}
                </div>
                <Link
                  href={'/search'} // Use Next.js Link for navigation
                  className='text-lg text-teal-500 hover:underline text-center'
                >
                  View all posts
                </Link>
              </div>
            )}
          </div>

          {/* News Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Latest News</h2>
            <div className="space-y-4">
              {news.map((item) => (
                <Link key={item.id} href={item.link} className="block text-teal-500 hover:underline">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
