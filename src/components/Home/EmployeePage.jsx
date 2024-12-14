import  { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Search,
  X
} from 'lucide-react';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', position: 'Software Engineer', contract: '6 Months', department: 'Engineering', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', position: 'Project Manager', contract: 'Full-time', department: 'Management', avatar: null },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@company.com', position: 'UX Designer', contract: '6 Months', department: 'Design', avatar: null },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@company.com', position: 'Data Analyst', contract: '3 Months', department: 'Analytics', avatar: null },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@company.com', position: 'DevOps Engineer', contract: 'Full-time', department: 'IT', avatar: null },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    contract: '',
    department: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterContract, setFilterContract] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContractFilter = filterContract ? employee.contract === filterContract : true;
    const matchesDepartmentFilter = filterDepartment ? employee.department === filterDepartment : true;
    return matchesSearch && matchesContractFilter && matchesDepartmentFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setSelectedEmployee(prev => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewEmployee(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );
    } else {
      const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
      const employeeToAdd = { 
        id: newId, 
        ...newEmployee,
        avatar: null 
      };
      setEmployees((prevEmployees) => [...prevEmployees, employeeToAdd]);
    }
    handleCloseModal();
  };

  const handleEdit = (employee) => {
    setIsEditMode(true);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employeeId) => {
    setEmployees((prevEmployees) => 
      prevEmployees.filter((emp) => emp.id !== employeeId)
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedEmployee(null);
    setNewEmployee({ name: '', email: '', position: '', contract: '', department: '' });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterContract('');
    setFilterDepartment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-2 md:p-8">
      <div className="mx-auto">
        <div className="bg-white rounded-lg md:rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <Users size={28} className="text-white" />
                <h1 className="text-xl md:text-3xl font-bold">Employee Management</h1>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all text-sm md:text-base"
              >
                <UserPlus size={18} />
                Add Employee
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-3 md:p-6 bg-gray-50 border-b">
            {/* Mobile View */}
            <div className="block md:hidden space-y-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-sm"
                  value={filterContract}
                  onChange={(e) => setFilterContract(e.target.value)}
                >
                  <option value="">All Contracts</option>
                  <option value="Full-time">Full-time</option>
                  <option value="6 Months">6 Months</option>
                  <option value="3 Months">3 Months</option>
                </select>
                <select
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-sm"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Management">Management</option>
                  <option value="Design">Design</option>
                  <option value="Analytics">Analytics</option>
                  <option value="IT">IT</option>
                </select>
                {(searchTerm || filterContract || filterDepartment) && (
                  <button 
                    onClick={resetFilters}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-4">
              <select
                className="w-48 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-base"
                value={filterContract}
                onChange={(e) => setFilterContract(e.target.value)}
              >
                <option value="">All Contracts</option>
                <option value="Full-time">Full-time</option>
                <option value="6 Months">6 Months</option>
                <option value="3 Months">3 Months</option>
              </select>
              
              <select
                className="w-48 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-base"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Design">Design</option>
                <option value="Analytics">Analytics</option>
                <option value="IT">IT</option>
              </select>

              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {(searchTerm || filterContract || filterDepartment) && (
                <button 
                  onClick={resetFilters}
                  className="self-center text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Employee List */}
          <div className="p-3 md:p-6">
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm md:text-base">
                No employees found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="bg-white shadow-lg rounded-xl md:rounded-2xl p-4 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm md:text-base">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-semibold">{employee.name}</h3>
                          <p className="text-gray-500 text-xs md:text-sm break-all">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 self-end md:self-auto">
                        <button 
                          onClick={() => handleEdit(employee)}
                          className="text-purple-500 hover:bg-purple-50 p-1.5 md:p-2 rounded-full"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(employee.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 md:p-2 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Position:</span>
                        <span className="font-medium">{employee.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{employee.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract:</span>
                        <span className="font-medium text-purple-600">{employee.contract}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md p-4 md:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
              {isEditMode ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={isEditMode ? selectedEmployee.name : newEmployee.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={isEditMode ? selectedEmployee.email : newEmployee.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={isEditMode ? selectedEmployee.position : newEmployee.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Department</label>
                  <select
                    name="department"
                    value={isEditMode ? selectedEmployee.department : newEmployee.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Design">Design</option>
                    <option value="Analytics">Analytics</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Contract</label>
                  <select
                    name="contract"
                    value={isEditMode ? selectedEmployee.contract : newEmployee.contract}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                    required
                  >
                    <option value="">Select Contract Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="6 Months">6 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full md:w-auto text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 w-full md:w-auto text-sm md:text-base"
                >
                  {isEditMode ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;