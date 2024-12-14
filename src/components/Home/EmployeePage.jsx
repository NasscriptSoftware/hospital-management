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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users size={32} className="text-white" />
                <h1 className="text-3xl font-bold">Employee Management</h1>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
              >
                <UserPlus size={20} />
                Add Employee
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-grow ">
                <Search className=" left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search employees by name, email, or position..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={filterContract}
                onChange={(e) => setFilterContract(e.target.value)}
              >
                <option value="">All Contracts</option>
                <option value="Full-time">Full-time</option>
                <option value="6 Months">6 Months</option>
                <option value="3 Months">3 Months</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
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
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Employee List */}
          <div className="p-6">
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No employees found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{employee.name}</h3>
                          <p className="text-gray-500 text-sm">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(employee)}
                          className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(employee.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
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
                        <span className="font-medium text-green-600">{employee.contract}</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEditMode ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={isEditMode ? selectedEmployee.name : newEmployee.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={isEditMode ? selectedEmployee.email : newEmployee.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={isEditMode ? selectedEmployee.position : newEmployee.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={isEditMode ? selectedEmployee.department : newEmployee.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-gray-700 mb-2">Contract</label>
                  <select
                    name="contract"
                    value={isEditMode ? selectedEmployee.contract : newEmployee.contract}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Contract Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="6 Months">6 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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