import { Link } from 'react-router-dom';
import { 
  Home, 
  // LayoutDashboard, 
  Building2,
  Users,
  Bell, 
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { title: 'Home', path: '/', icon: <Home size={20} /> },
    // { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Hospital', path: '/hospital', icon: <Building2 size={20} /> },
    { title: 'Employee', path: '/employee', icon: <Users size={20} /> },
  ];

  return (
    <div className={`relative min-h-screen bg-white shadow-lg transition-all duration-300 z-10 ${isExpanded ? 'w-64' : 'w-16'}`}>
      {/* Toggle Button - Positioned absolutely */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-purple-600 text-white rounded-full p-1.5 hover:bg-purple-700 transition-colors"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo or Brand */}
      <div className="p-4 border-b border-gray-100  ">
        <div className={`flex items-center ${!isExpanded && 'justify-center'}`}>
          {/* Add your logo here */}
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          {isExpanded && <span className="ml-3 font-semibold text-gray-700">ManPower Management </span>}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors
                  ${item.path === window.location.pathname ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}
                  ${isExpanded ? 'px-4 py-2.5 gap-3' : 'p-2.5 justify-center'}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isExpanded && <span className="font-medium">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 w-full p-2 border-t border-gray-100">
        <Link
          to="/notifications"
          className={`flex items-center rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors
            ${isExpanded ? 'px-4 py-2.5 gap-3' : 'p-2.5 justify-center'}`}
        >
          <span className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              7
            </span>
          </span>
          {isExpanded && (
            <span className="font-medium">Notifications</span>
          )}
        </Link>
        
        <button
          onClick={() => {/* Add your logout logic here */}}
          className={`w-full flex items-center rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors mt-1
            ${isExpanded ? 'px-4 py-2.5 gap-3' : 'p-2.5 justify-center'}`}
        >
          <LogOut size={20} />
          {isExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 