import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'; 

// Utility function to strip HTML tags
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

export default function PostCard2({ post }) {
  // State for share dialog and custom message
  const [customMessage, setCustomMessage] = useState("");

  // Construct the URL for sharing
  const currentArticleUrl = encodeURIComponent(window.location.origin + `/blogpost/${post.slug}`);
  const encodedMessage = encodeURIComponent(customMessage ? `${customMessage} ` : '');

  return (
    <div className='group relative w-full h-auto overflow-hidden rounded-lg transition-all'>
      <div className='p-4'>

        {/* Post Title - Restricted to 4 lines */}
        <p className='text-sm font-semibold mb-2 line-clamp-4'>
          {post.title}
        </p>

        {/* Post Image (Small Square) */}
        <Link href={`/blogpost/${post.slug}`} passHref>
          <img
            src={post.image}
            alt='post cover'
            className='h-32 w-32 object-cover rounded-md transition-all duration-300 cursor-pointer'
          />
        </Link>

        {/* Share and Comment Icons */}
       
      </div>
    </div>
  );
}
