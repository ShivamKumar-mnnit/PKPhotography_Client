import React from 'react';
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsX,
  BsYoutube,
  BsLinkedin
} from "react-icons/bs";

export default function Social() {
  return (
    <div className="bg-blue-500 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 px-4">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/itspkphotography.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 flex items-center gap-2 text-lg"
        >
          <BsInstagram className="text-2xl" />
          <span>Instagram</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/pkfashionphotography"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 flex items-center gap-2 text-lg"
        >
          <BsFacebook className="text-2xl" />
          <span>Facebook</span>
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/pkphotographym"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 flex items-center gap-2 text-lg"
        >
          <BsX className="text-2xl" />
          <span>Twitter</span>
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@itspkphotography"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 flex items-center gap-2 text-lg"
        >
          <BsYoutube className="text-2xl" />
          <span>YouTube</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/pkphotography/?originalSubdomain=in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 flex items-center gap-2 text-lg"
        >
          <BsLinkedin className="text-2xl" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
