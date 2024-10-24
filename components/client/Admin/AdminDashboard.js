import { useState } from 'react';
import AdminMain from './AdminMain'; // Import the form component

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('uploadForm'); // State to track active component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'uploadForm':
        return <AdminMain />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex mt-16"> {/* Add margin-top here */}
      {/* Left Sidebar */}
      <nav className="w-1/4 h-screen bg-gray-800 text-white">
        <ul className="p-4 space-y-4">
          <li>
            <button
              onClick={() => setActiveComponent('uploadForm')}
              className="w-full text-left hover:bg-gray-600 px-4 py-2 rounded-lg"
            >
              Upload Wedding Card
            </button>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
