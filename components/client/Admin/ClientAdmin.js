import { useState, useEffect } from "react";
import axios from "axios";

const ClientAdmin = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/cards");
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleAddCategory = () => {
    if (!categoryName || !driveLink) {
      alert("Please provide both category name and Google Drive link.");
      return;
    }

    const newCategory = { categoryName, driveLink };
    setCategories([...categories, newCategory]);
    setCategoryName("");
    setDriveLink("");
  };

  const handleClientSelection = (e) => {
    const selectedClient = clients.find((client) => client._id === e.target.value);
    setClientId(selectedClient?._id || "");
    setName(selectedClient?.name || "");
  };

  const handleSubmit = async (e, id, category) => {
    e.preventDefault();

    if (!id || category.length === 0) {
      alert("Please select a client and add at least one category.");
      return;
    }

    try {
      const formattedCategories = category.map((cat) => ({
        categoryName: cat.categoryName,
        driveLink: cat.driveLink,
      }));

      const response = await axios.put("http://localhost:4000/api/update-category", {
        id,
        category: formattedCategories,
      });

      if (response.status === 200) {
        console.log("Category updated successfully:", response.data);
        setClientId("");
        setName("");
        setCategories([]);
        alert("Card updated successfully!");
      } else {
        console.error("Failed to update category:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update the card. Please try again.");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, clientId, categories)}
      className="flex flex-col items-center py-10 space-y-6"
    >
      <div className="w-3/4 md:w-1/2">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Select Client</label>
        <select
          onChange={handleClientSelection}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:border-yellow-600"
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
        {name && <p className="text-green-600 mt-2">Selected Client: {name}</p>}
      </div>

      <div className="w-3/4 md:w-1/2">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Add Category</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:border-yellow-600"
        />
        <input
          type="text"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="Google Drive Link"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:border-yellow-600"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="mt-2 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700"
        >
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories added yet.</p>
      ) : (
        <ul className="w-3/4 md:w-1/2 mt-4">
          {categories.map((category, index) => (
            <li key={index} className="flex justify-between py-2 px-4 border-b border-gray-200">
              <span>{category.categoryName}</span>
              <a
                href={category.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700"
        disabled={!clientId || categories.length === 0}
      >
        Save Card
      </button>
    </form>
  );
};

export default ClientAdmin;
