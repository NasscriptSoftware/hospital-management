import Sidebar from './Sidebar/Sidebar';

const Layout = ({ children }) => {


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-[1rem]"> {/* padding-left matches sidebar width */}
        <div className="p-8 min-h-screen bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 