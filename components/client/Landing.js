import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineGlobal } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Head>
        <title>PK Photography</title>
        <meta name="description" content="Client Portal for PK Photography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center mt-20"> 
 
        
        <div className="flex space-x-4 mt-4">
          <Link href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook alt="Facebook" className="w-6 h-6" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram alt="Instagram" className="w-6 h-6" />
          </Link>
        </div>

        <h1 className="mt-10 text-xl font-bold text-black md:text-3xl">
          PK PHOTOGRAPHY
        </h1>

        <p className="mt-6 text-base text-gray-700 md:text-lg">
          Welcome to the client portal. Here is where you can view, download, and share your photos.
          OH! You can also order prints if you'd like :). Please contact me for your password
          or any other assistance needed!
        </p>

        <div className="mt-10 space-y-4 text-sm text-gray-500 md:text-base">
          <div className="flex items-center justify-center space-x-2">
            <AiOutlineGlobal className="w-5 h-5" />
            <Link href="" target="_blank" rel="noreferrer" className="hover:underline">
              pkphotography.com
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CgMail className="w-5 h-5" />
            <Link href="mailto:pkphotography@gmail.com" className="hover:underline">
              pkphotography@gmail.com
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
