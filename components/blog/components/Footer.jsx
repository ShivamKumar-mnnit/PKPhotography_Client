import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsX,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import logo from '../images/logo.webp';
import Social from './Social';

export default function FooterCom() {
  return (
    <>
      <Social />
      <footer className="bg-white py-10 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
            
            {/* Column 1: Logo, Tagline, and Contact Info */}
            <div className="col-span-2">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-32 h-auto mb-4" // Adjust logo size
                />
              </Link>
              <p className="text-sm text-gray-700 font-semibold">
                Capturing Life’s Moments with Passion and Precision
              </p>
              {/* Contact Info */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Contact</h3>
                <ul className="text-sm space-y-2">
                  <li>
                    <span className="text-gray-800 font-semibold">Phone:</span>
                    <span className="ml-2 text-gray-600">+91 8888766 739</span>
                  </li>
                  <li>
                    <span className="text-gray-800 font-semibold">Email:</span>
                    <span className="ml-2 text-gray-600">prabhakar@photography.com</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://pkphotography.in/corporate-headshots/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                    HeadShots
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/portrait-gallery/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                    Portrait
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/gallery/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                    Wedding & Events
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/portfolio-gallery/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/interior-design/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                    Interior
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Videography */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Videography</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://pkphotography.in/wedding/" className="text-gray-600 hover:text-teal-500">
                    Wedding & Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-teal-500">
                    Live Streaming
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-teal-500">
                    Corporate Ads
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-teal-500">
                    Product Ads
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-teal-500">
                    Influencer Videos
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Useful Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Useful Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/sign-up" className="text-gray-600 hover:text-teal-500">
                    Sign-Up
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/career/" className="text-gray-600 hover:text-teal-500">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/faqs/" className="text-gray-600 hover:text-teal-500">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-teal-500">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/book-session/" className="text-gray-600 hover:text-teal-500">
                    Booking
                  </a>
                </li>
                <li>
                  <a href="https://pkphotography.in/privacy-policy/" className="text-gray-600 hover:text-teal-500">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Social Media Icons and Copyright */}
          <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} PK Photography. All Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="https://www.facebook.com/pkfashionphotography" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                <BsFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/itspkphotography.in/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                <BsInstagram size={24} />
              </a>
              <a href="https://x.com/pkphotographym" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                <BsX size={24} />
              </a>
              <a href="https://www.youtube.com/@itspkphotography" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                <BsYoutube size={24} />
              </a>
              <a href="https://www.linkedin.com/company/pkphotography/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">
                <BsLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
