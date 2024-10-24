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
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => (
        <Link key={card._id} href={`/client/${card._id}`}>
          <div className="shadow-lg p-4 cursor-pointer">
            <img src={card.imageUrl} alt={card.name} className="mb-3" />
            <h2 className="text-lg font-bold text-center">{card.name}</h2>
            <p className="text-center">{new Date(card.date).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserCards;