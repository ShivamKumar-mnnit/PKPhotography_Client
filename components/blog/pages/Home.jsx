import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import LeftSidebar from '../components/LeftSidebar';
import DashSidebar2 from '../components/DashSidebar2';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories] = useState(['Photography', 'Videography', 'Shoot', 'Products']); // Fixed categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const { currentUser } = useSelector((state) => state.user);

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

    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen flex flex-col md:flex-row my-20">
      <div className="hidden md:w-56 md:block my-20">
        <div className="sticky top-0">
          <LeftSidebar currentUser={currentUser} />
        </div>
      </div>

      <div className="flex-1">
        <div className='max-w-6xl mx-auto p-3 py-7'>
          {/* <h2 className='text-2xl font-semibold text-center'>Latest Blogs</h2> */}

          {/* Categories buttons */}
          <div className="my-4 text-center">

          <button
              onClick={() => setSelectedCategory('')} // Clear selection
              className={`mx-2 px-4 py-2 rounded ${
                selectedCategory === ''
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`mx-2 px-4 py-2 rounded ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {category}
              </button>
            ))}
           
          </div>

          {filteredPosts && filteredPosts.length > 0 && (
            <div className='max-w-6xl mx-auto p-3 py-7 flex flex-col gap-8'>
              {filteredPosts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
              <Link
                href={'/search'} // Use Next.js Link
                className='text-lg text-teal-500 hover:underline text-center'
              >
                View all Blogs
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-72 bg-white">
        <DashSidebar2 />
      </div>
    </div>
  );
}
