import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import DashSidebar1 from '../components/LeftSidebar';
import DashSidebar2 from '../components/DashSidebar2';
import Head from 'next/head';
import Link from 'next/link'; // Use Next.js Link

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/post/getPosts');
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error.message);
      }
    };
    fetchPosts();
  }, []);

  // Generate a default description if no posts are available
  const defaultDescription = "Welcome to PK Photography. Explore our latest posts showcasing stunning photography.";
  const metaDescription = posts.length > 0 ? posts[0].description : defaultDescription;

  return (
    <div className="min-h-screen flex flex-col md:flex-row my-20">
      
      {/* Hide the sidebar on small screens and display it on medium screens */}
      {/* <div className="hidden md:w-56 md:block">
        <div className="sticky top-0">
          <DashSidebar1 />
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex-1">
        <div className='max-w-6xl mx-auto p-3 py-7'>
          
          <h2 className='text-2xl font-semibold text-center'>Latest Posts</h2>
          {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 items-center'>
              <div className='max-w-6xl mx-auto p-3 py-7 flex flex-col gap-8'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              {/* Next.js Link component */}
              <Link href={'/search'}>
                <a className='text-lg text-teal-500 hover:underline text-center'>View all posts</a>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar for ads/news */}
      <div className="md:w-72">
        <DashSidebar2 />
      </div>
    </div>
  );
}
