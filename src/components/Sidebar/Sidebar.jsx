import { Link } from 'react-router-dom';
import { Home, Users, Building2, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { title: 'Home', path: '/', icon: <Home size={20} /> },
    { title: 'Employee', path: '/employee', icon: <Users size={20} /> },
    { title: 'Hospital', path: '/hospital', icon: <Building2 size={20} /> },
  ];

  return (
    <div className={`h-full bg-gray-800 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'} flex flex-col`}>
      <div className="p-6 relative flex-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-9 bg-gray-800 p-1 rounded-full border border-gray-700"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {isExpanded && (
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">ManPower Management</h2>
        )}

        <nav>
          <ul className="space-y-3 mt-16">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center mt-5 px-2 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:translate-x-1 hover:shadow-md ${
                    isExpanded ? 'gap-3' : 'justify-center'
                  }`}
                >
                  <span className="text-blue-400">{item.icon}</span>
                  {isExpanded && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <button
          onClick={() => {/* Add your logout logic here */}}
          className={`flex items-center px-2 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:translate-x-1 hover:shadow-md w-full ${
            isExpanded ? 'gap-3' : 'justify-center'
          }`}
        >
          <span className="text-red-400"><LogOut size={20} /></span>
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 