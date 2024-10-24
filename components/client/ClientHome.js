import Link from "next/link";
import Image from "next/image";
import {
  FaCartPlus,
  FaHeart,
  FaDownload,
  FaShareAlt,
  FaPlay,
} from "react-icons/fa";
import { useState } from "react";


const ClientHome = () => { 
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div >
      <header className="flex justify-between items-center p-4 bg-gray-50 shadow-sm">
        <div className="flex items-center">
          <Image src="" 
          alt="Logo" 
          className="h-10" 
          width={40} 
          height={40} 
          />
          <span className="ml-4 text-lg font-bold">PK PHOTOGRAPHY</span>
        </div>
      </header>

      <section className="text-center py-12 bg-pink-50">
        <h1 className="text-4xl font-serif font-light">Raj+Simran</h1> {/* Use cardData.name */}
        <p className="text-gray-500 text-sm mt-2">24-10-2024</p> {/* Use cardData.date */}
        <button className="mt-6 px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          View Gallery
        </button>
      </section>

      <nav className="flex flex-col md:flex-row justify-between items-center py-4 px-6 bg-white shadow-md">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm font-semibold text-gray-600">
          <li>
            <Link href="#" className="hover:text-black">
              Raj+Simran {/* Use cardData.name */}
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-black">
              Getting Ready
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-black">
              First Looks
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-black">
              Bridal Party
            </Link>
          </li>

          <li className="relative">
            <button
              className="hover:text-black"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              More
            </button>

            {showDropdown && (
              <ul
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg text-sm"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Ceremony</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Family Formals</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Details / Cocktail Hour</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Reception</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Dance Floor</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Wedding GIFs</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Engagement</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="#">Engagement GIFs</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm font-semibold text-gray-600 items-center mt-4 md:mt-0">
          <li className="flex items-center space-x-1 hover:text-black cursor-pointer">
            <FaCartPlus /> <span>Cart</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-black cursor-pointer">
            <FaHeart /> <span>Favorites</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-black cursor-pointer">
            <FaDownload /> <span>Download</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-black cursor-pointer">
            <FaShareAlt /> <span>Share</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-black cursor-pointer">
            <FaPlay /> <span>Slideshow</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default ClientHome;
