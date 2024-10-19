import { useEffect, useState } from "react";

export default function CommentCount({ postId }) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setCommentCount(data.length); // Count the number of comments
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className='flex items-center space-x-2'>
      <p>{commentCount}</p> {/* Display the number of comments */}
    </div>
  );
}
