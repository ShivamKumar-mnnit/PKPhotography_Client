import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import CommentSection from '../components/CommentSection';

export default function PostPage({ slug }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  console.log(slug);

  useEffect(() => {
    if (!slug) return; // Exit early if slug is not available
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/post/getposts?slug=${slug}`);
        console.log(res);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <p className='text-center text-lg italic text-gray-600'>
        {post && `~ ${post.userId.username}`}
      </p>
      <Link
        href={`/search?category=${post && post.category}`} // Use Link from Next.js
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <div className="flex justify-center">
        <img
          src={post && post.image}
          alt={post && post.title}
          className='mt-10 p-3 max-h-[400px] w-fit object-cover'
        />
      </div>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1500).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      {/* <CommentSection postId={post._id} /> */}

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        {/* Recent posts rendering if needed */}
      </div>
    </main>
  );
}

// Fetch the slug from the URL params
export async function getServerSideProps(context) {
  const { slug } = context.params; // Extract slug from the context
  return {
    props: {
      slug,
    },
  };
}
