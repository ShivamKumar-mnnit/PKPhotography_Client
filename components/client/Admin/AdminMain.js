import { useState } from 'react';
import axios from 'axios';

const AdminUploadForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { 
      alert('File size should be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); 
    };
    if (file) {
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = {
      name,
      date,
      image, 
    };

    try {
      await axios.post('http://localhost:4000/api/upload', cardData);
      alert('Wedding card uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4 mt-12">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          required
          className="block w-full"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Upload
      </button>
    </form>
  );
};

export default AdminUploadForm;
