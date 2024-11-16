import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCartPlus,
  FaHeart,
  FaDownload,
  FaShareAlt,
  FaPlay,
} from "react-icons/fa";

const ClientHome = () => {
  const [selectedCard, setSelectedCard] = useState([]);
  const [images, setImages] = useState({});
  const [finalCard, setfinalCard] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = window.location.pathname;
    const parts = url.split("/");
    const lastId = parts[parts.length - 1];
    console.log("Last ID:", lastId);
  
    const storedCard = localStorage.getItem("selectedCard");
    if (storedCard) {
      setSelectedCard(JSON.parse(storedCard));
      console.log("Stored card:", JSON.parse(storedCard));
    }
    const fetchSelectedCard = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/client/cards`);
        const selectedCard = response.data.find((card) => card._id === lastId);
        setSelectedCard(selectedCard);
        console.log("Selected card:", selectedCard);
        const category = response.data.find((card) => card._id === lastId);
        setCategories(category.category);
      } catch (error) {
        console.error("Error fetching selected card:", error);
      }
    };
    
    fetchSelectedCard();
  }, [])
  const fetchImagesFromDrive = async (driveLink) => {
    if (!driveLink) {
      console.error("No drive link provided.");
      return;
    }
    const folderId = extractFolderId(driveLink);
    if (folderId) {
      const driveImages = await getImagesFromGoogleDrive(folderId);
      setImages((prev) => ({ ...prev, [folderId]: driveImages }));
    } else {
      console.error("Invalid drive link:", driveLink);
    }
  };

  const extractFolderId = (driveLink) => {
    const match = driveLink.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  };

  const getImagesFromGoogleDrive = async (folderId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=YOUR_API_KEY`
      );
      return response.data.files.map(
        (file) => `https://drive.google.com/uc?export=view&id=${file.id}`
      );
    } catch (error) {
      console.error("Error fetching images from Google Drive:", error);
    }
  };

  if (!selectedCard) return null;

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-50 shadow-sm">
        <div className="flex items-center">
          <Image src="" alt="Logo" width={40} height={40} className="h-10" />
          <span className="ml-4 text-lg font-bold">{finalCard.clientName || 'PK PHOTOGRAPHY'}</span>
        </div>
      </header>

      <section className="text-center py-12 bg-pink-50">
        <h1 className="text-4xl font-serif font-light">{finalCard.name}</h1>
        <p className="text-gray-500 text-sm mt-2">
          {new Date(finalCard.date).toLocaleDateString()}
        </p>
        <button className="mt-6 px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          View Gallery
        </button>
      </section>

      <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
        {/* Left-aligned Categories */}
        <ul className="flex flex-wrap space-x-4 text-sm font-semibold text-gray-600">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li
                key={index}
                className="hover:text-black cursor-pointer"
                onClick={() => fetchImagesFromDrive(category.images)}
              >
                <span className="text-blue-600 underline">
                  {category.name}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No categories available</li>
          )}
        </ul>

        {/* Right-aligned Icons */}
        <ul className="flex space-x-6 text-sm font-semibold text-gray-600 items-center">
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

      {/* Display images from Google Drive */}
      <section className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.keys(images).map((folderId) =>
          images[folderId].map((image, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt="Drive Image"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default ClientHome;