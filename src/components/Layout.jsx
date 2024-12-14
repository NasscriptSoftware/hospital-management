import Sidebar from './Sidebar/Sidebar';

const Layout = ({ children }) => {


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16"> {/* Add margin-left instead of padding */}
        <div className=" min-h-screen bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 