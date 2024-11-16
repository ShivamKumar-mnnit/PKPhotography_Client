import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a href="/" className="h-auto w-auto flex flex-row items-center">
          <Image
            src="" 
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="font-bold ml-[10px] hidden md:block text-black">
            PKPhotography
          </span>
        </a>

        <div className="flex flex-row gap-5 mr-10">
          <span className="text-black flex flex-row gap-5">
            <a href="/blog" className="cursor-pointer">
              Blogs
            </a>
            <a href="/client" className="cursor-pointer">
              Client Gallery
            </a>
            <a href="/Admin" className="cursor-pointer">
              Admin
            </a>
            <a href="/Auth" className="cursor-pointer">
              SignIn
            </a>
          </span>
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
