"use client"; // Ensure this is a client component
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const UserCards = () => {
  const [cards, setCards] = useState([]);

  // Fetch all cards when the component mounts
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/cards");
        setCards(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleClick = (cardId) => {
    const selectedCard = cards.find((card) => card._id === cardId);
    console.log(selectedCard);
    localStorage.setItem("selectedCard", JSON.stringify(selectedCard));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
  {cards.map((card) => (
    <div 
      key={card._id} 
      className="shadow-lg p-4 cursor-pointer w-64 h-80 mx-auto flex flex-col items-center"
    >
      <div className="w-full h-40 overflow-hidden">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-lg font-bold text-center mt-3">{card.name}</h2>
      <p className="text-center text-sm">{new Date(card.date).toLocaleDateString()}</p>
      <Link href={`/client/${card._id}`}>
        <button 
          className="text-blue-500 mt-auto"
          onClick={() => handleClick(card._id)}
        >
          View Details
        </button>
      </Link>
    </div>
  ))}
</div>

  );
};

export default UserCards;
