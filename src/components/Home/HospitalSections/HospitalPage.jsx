import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";

const staticJobNotifications = [
  {
    id: 1,
    position: "Senior Cardiologist",
    hospitalId: 1,
    hospitalName: "Doha Hospital",
    department: "Cardiology",
    requiredProfession: "Doctor",
    education: "MD, DM Cardiology",
    experience: "5+ years",
    skills: "Cardiac Surgery, Echo, ECG",
    salary: 1500,
    status: "Active",
    description: "Looking for experienced cardiologist for full-time position",
    datePosted: "2024-03-01",
    deadline: "2024-04-01",
  },
  {
    id: 2,
    position: "Head Nurse",
    hospitalId: 2,
    hospitalName: "Al Khor Hospital ",
    department: "Emergency",
    requiredProfession: "Nurse",
    education: "BSc Nursing",
    experience: "3+ years",
    skills: "Emergency Care, Team Management",
    salary: 8000,
    status: "Active",
    description: "Seeking experienced head nurse for emergency department",
    datePosted: "2024-03-05",
    deadline: "2024-04-15",
  },
  {
    id: 3,
    position: "Pediatrician",
    hospitalId: 1,
    hospitalName: "Master Hospital",
    department: "Pediatrics",
    requiredProfession: "Doctor",
    education: "MD Pediatrics",
    experience: "2+ years",
    skills: "Child Healthcare, Vaccination",
    salary: 1200,
    status: "Active",
    description: "Looking for passionate pediatrician to join our team",
    datePosted: "2024-03-10",
    deadline: "2024-04-10",
  },
];

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Doha Hospital",
      location: "Al Sadd, Doha",
      contact: "+974-4444-1111",
      type: "multi-specialty",
    },
    {
      id: 2,
      name: "Al Khor Hospital",
      location: "Al Khor City",
      contact: "+974-4444-2222",
      type: "general",
    },
    {
      id: 3,
      name: "Master Hospital",
      location: "West Bay, Doha",
      contact: "+974-4444-3333",
      type: "specialty",
    },
    {
      id: 4,
      name: "Qatar Medical Center",
      location: "Al Wakrah",
      contact: "+974-4444-4444",
      type: "multi-specialty",
    },
    {
      id: 5,
      name: "Pearl Medical Complex",
      location: "The Pearl-Qatar",
      contact: "+974-4444-5555",
      type: "specialty",
    },
  ]);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      hospital: "Doha Hospital",
      profession: "Doctor",
      department: "Cardiology",
      contact: "+974-5555-1111",
      email: "john.doe@hospital.com",
      contractPeriod: "2024-01-01 to 2024-12-31",
      salary: 150000,
    },
    {
      id: 2,
      name: "Jane Smith",
      hospital: "Al Khor Hospital",
      profession: "Nurse",
      department: "Emergency",
      contact: "+974-5555-2222",
      email: "jane.smith@hospital.com",
      contractPeriod: "2024-01-01 to 2025-01-01",
      salary: 80000,
    },
    {
      id: 3,
      name: "Alice Johnson",
      hospital: "Master Hospital",
      profession: "Doctor",
      department: "Pediatrics",
      contact: "+974-5555-3333",
      email: "alice.johnson@hospital.com",
      contractPeriod: "2024-02-01 to 2024-08-01",
      salary: 120000,
    },
  ]);

  const [newHospital, setNewHospital] = useState({
    id: "",
    name: "",
    location: "",
    contact: "",
    type: "",
  });

  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    hospitalId: "",
    profession: "",
    department: "",
    education: "",
    experience: "",
    skills: "",
    contactNumber: "",
    email: "",
    contractStartDate: "",
    contractEndDate: "",
    salary: "",
  });

  const [jobNotifications, setJobNotifications] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHospitalModal, setShowHospitalModal] = useState(false);

  const handleAddHospital = (e) => {
    e.preventDefault();
    const newHospitalData = { ...newHospital, id: Date.now() };
    setHospitals([...hospitals, newHospitalData]);
    console.log("New hospital added:", newHospitalData);
    setNewHospital({
      id: "",
      name: "",
      location: "",
      contact: "",
      type: "",
    });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    // Find the selected hospital's name
    const selectedHospital = hospitals.find(h => h.id === parseInt(newEmployee.hospitalId));
    
    const newEmployeeData = {
      ...newEmployee,
      id: Date.now(),
      hospital: selectedHospital?.name, // Add hospital name
      contact: newEmployee.contactNumber, // Map contactNumber to contact
      contractPeriod: `${newEmployee.contractStartDate} to ${newEmployee.contractEndDate}` // Format contract period
    };
    
    setEmployees([...employees, newEmployeeData]);
    console.log("New employee added:", newEmployeeData);
    
    setNewEmployee({
      id: "",
      name: "",
      hospitalId: "",
      profession: "",
      department: "",
      education: "",
      experience: "",
      skills: "",
      contactNumber: "",
      email: "",
      contractStartDate: "",
      contractEndDate: "",
      salary: "",
    });
    
    setShowEmployeeForm(false);
  };

  useEffect(() => {
    console.log("Updated hospitals list:", hospitals);
  }, [hospitals]);

  useEffect(() => {
    console.log("Updated employees list:", employees);
  }, [employees]);

  useEffect(() => {
    setJobNotifications(staticJobNotifications);
  }, []);

  const filterEmployees = (jobNotification) => {
    return employees.filter((employee) => {
      const matchesProfession =
        employee.profession.toLowerCase() ===
        jobNotification.requiredProfession.toLowerCase();
      const matchesDepartment =
        employee.department.toLowerCase() ===
        jobNotification.department.toLowerCase();

      return matchesProfession && matchesDepartment;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedEmployee && !event.target.closest('.modal-content')) {
        setSelectedEmployee(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEmployee]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHospitalModal && !event.target.closest('.modal-content')) {
        setShowHospitalModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHospitalModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmployeeForm && !event.target.closest('.modal-content')) {
        setShowEmployeeForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmployeeForm]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-purple-600 border-b border-gray-200 pb-4">
        Services Management System
      </h1>

      <Tab.Group>
        <Tab.List className="flex flex-wrap gap-2 rounded-xl bg-purple-100 p-2 mb-6 sm:mb-8 lg:mb-10">
          {["Hospitals", "Employees", "Job Notifications"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full sm:w-auto rounded-lg py-2.5 px-4 text-sm font-medium leading-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60
                ${
                  selected
                    ? "bg-purple-600 text-white shadow"
                    : "text-purple-700 hover:bg-purple-200 hover:text-purple-900"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Hospitals Panel */}
          <Tab.Panel>
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-purple-600">
                  Add New Hospital
                </h2>
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setShowHospitalModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg 
                               hover:bg-purple-700 transition-colors duration-200 
                               font-medium shadow-sm hover:shadow-md 
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60"
                  >
                    Add Services
                  </button>
                </div>

                {showHospitalModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="modal-content bg-white rounded-xl max-w-2xl w-full mx-auto">
                      {/* Modal Header */}
                      <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Add New Hospital
                        </h2>
                        <button 
                          onClick={() => setShowHospitalModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="p-6">
                        <form
                          onSubmit={(e) => {
                            handleAddHospital(e);
                            setShowHospitalModal(false);
                          }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <div className="relative">
                            <input
                              type="text"
                              id="hospitalName"
                              placeholder="Hospital Name"
                              value={newHospital.name}
                              onChange={(e) =>
                                setNewHospital({ ...newHospital, name: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                                         focus:border-transparent transition duration-200"
                              required
                            />
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Location"
                              value={newHospital.location}
                              onChange={(e) =>
                                setNewHospital({
                                  ...newHospital,
                                  location: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                                         focus:border-transparent transition duration-200"
                              required
                            />
                          </div>

                          <div className="relative">
                            <input
                              type="tel"
                              placeholder="Contact Number"
                              value={newHospital.contact}
                              onChange={(e) =>
                                setNewHospital({
                                  ...newHospital,
                                  contact: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                                         focus:border-transparent transition duration-200"
                              required
                            />
                          </div>

                          <div className="relative">
                            <select
                              value={newHospital.type}
                              onChange={(e) =>
                                setNewHospital({ ...newHospital, type: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                                         focus:border-transparent transition duration-200"
                              required
                            >
                              <option value="">Select Hospital Type</option>
                              <option value="general">General Hospital</option>
                              <option value="specialty">Specialty Hospital</option>
                              <option value="multi-specialty">Multi-Specialty Hospital</option>
                            </select>
                          </div>

                          {/* Modal Footer */}
                          <div className="col-span-2 flex justify-end gap-3 mt-4">
                            <button
                              type="button"
                              onClick={() => setShowHospitalModal(false)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-purple-600 text-white px-4 py-2 rounded-lg 
                                       hover:bg-purple-700 transition-colors duration-200 
                                       font-medium shadow-sm hover:shadow-md"
                            >
                              Add Hospital
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-gray-800">
                    Service List
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["ID", "NAME", "LOCATION", "CONTACT", "TYPE"].map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {hospitals.map((hospital) => (
                          <tr
                            key={hospital.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                              {hospital.id}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                              {hospital.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">
                              {hospital.location}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                              {hospital.contact}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                {hospital.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Employees Panel */}
          <Tab.Panel>
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowEmployeeForm(true)}
                  className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg 
                           hover:bg-purple-700 transition-colors duration-200 
                           font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60"
                >
                  Add Employee
                </button>
              </div>

              {showEmployeeForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="modal-content bg-white rounded-xl max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Add New Employee
                      </h2>
                      <button 
                        onClick={() => setShowEmployeeForm(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                      <form
                        onSubmit={(e) => {
                          handleAddEmployee(e);
                          setShowEmployeeForm(false);
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {/* Employee Name */}
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            value={newEmployee.name}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                name: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="name"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Employee Name
                          </label>
                        </div>

                        {/* Hospital Select */}
                        <div className="relative">
                          <select
                            id="hospitalId"
                            value={newEmployee.hospitalId}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                hospitalId: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          >
                            <option value="">Select The Hospital</option>
                            {hospitals.map((hospital) => (
                              <option key={hospital.id} value={hospital.id}>
                                {hospital.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="hospitalId"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Hospital
                          </label>
                        </div>

                        {/* Profession Select */}
                        <div className="relative">
                          <select
                            id="profession"
                            value={newEmployee.profession}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                profession: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          >
                            <option value="">Select The Profession</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Technician">Technician</option>
                            <option value="Administrator">Administrator</option>
                          </select>
                          <label
                            htmlFor="profession"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Profession
                          </label>
                        </div>

                        {/* Department Select */}
                        <div className="relative">
                          <select
                            id="department"
                            value={newEmployee.department}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                department: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          >
                            <option value="">Select The Department</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                          </select>
                          <label
                            htmlFor="department"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Department
                          </label>
                        </div>

                        {/* Education */}
                        <div className="relative">
                          <input
                            type="text"
                            id="education"
                            value={newEmployee.education}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                education: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="education"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Education
                          </label>
                        </div>

                        {/* Experience */}
                        <div className="relative">
                          <input
                            type="text"
                            id="experience"
                            value={newEmployee.experience}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                experience: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="experience"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Experience
                          </label>
                        </div>

                        {/* Skills */}
                        <div className="relative">
                          <input
                            type="text"
                            id="skills"
                            value={newEmployee.skills}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                skills: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="skills"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Skills
                          </label>
                        </div>

                        {/* Contact Number */}
                        <div className="relative">
                          <input
                            type="tel"
                            id="contactNumber"
                            value={newEmployee.contactNumber}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                contactNumber: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="contactNumber"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Contact Number
                          </label>
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={newEmployee.email}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                email: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Email
                          </label>
                        </div>

                        {/* Contract Start Date */}
                        <div className="relative">
                          <input
                            type="date"
                            id="contractStartDate"
                            value={newEmployee.contractStartDate}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                contractStartDate: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="contractStartDate"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Contract Start Date
                          </label>
                        </div>

                        {/* Contract End Date */}
                        <div className="relative">
                          <input
                            type="date"
                            id="contractEndDate"
                            value={newEmployee.contractEndDate}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                contractEndDate: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="contractEndDate"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Contract End Date
                          </label>
                        </div>

                        {/* Salary */}
                        <div className="relative">
                          <input
                            type="number"
                            id="salary"
                            value={newEmployee.salary}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                salary: e.target.value,
                              })
                            }
                            className="peer w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                            required
                          />
                          <label
                            htmlFor="salary"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                     transition-all duration-200 peer-placeholder-shown:top-2.5 
                                     peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                          >
                            Salary
                          </label>
                        </div>

                        {/* Modal Footer */}
                        <div className="col-span-2 flex justify-end gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setShowEmployeeForm(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg 
                                     hover:bg-purple-700 transition-colors duration-200 
                                     font-medium shadow-sm hover:shadow-md"
                          >
                            Save Employee
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-gray-800">
                  Employees List
                </h2>
                {employees.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-base sm:text-lg">
                      No employees added yet
                    </p>
                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                      Add your first employee using the form above
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {[
                            "ID",
                            "Name",
                            "Hospital",
                            "Profession",
                            "Department",
                            "Contact",
                            "Email",
                            "Contract Period",
                            "Salary",
                          ].map((header) => (
                            <th
                              key={header}
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                          <tr
                            key={employee.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                              {employee.id}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                              {employee.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">
                              {employee.hospital}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.profession}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                              {employee.department}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden lg:table-cell">
                              {employee.contact}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden xl:table-cell">
                              {employee.email}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 hidden 2xl:table-cell">
                              {employee.contractPeriod}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                              QAR{employee.salary.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>

          {/* Job Notifications Panel */}
          <Tab.Panel>
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-purple-600">
                  Active Job Notifications
                </h2>
                {jobNotifications.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-base sm:text-lg">
                      No job notifications available
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6 lg:gap-8">
                    {jobNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border border-gray-200 rounded-xl p-4 sm:p-6 
                                    hover:shadow-lg transition-all duration-200 bg-white"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2 sm:mb-0">
                            {notification.position}
                          </h3>
                          <span
                            className="bg-green-100 text-green-800 px-3 py-1 
                                         rounded-full text-xs sm:text-sm font-medium"
                          >
                            {notification.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Hospital:</span>{" "}
                              {hospitals.find(
                                (h) => h.id === notification.hospitalId
                              )?.name || "Not specified"}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Department:</span>{" "}
                              {notification.department}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">
                                Required Profession:
                              </span>{" "}
                              {notification.requiredProfession}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Education:</span>{" "}
                              {notification.education}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Experience:</span>{" "}
                              {notification.experience}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Skills:</span>{" "}
                              {notification.skills}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              <span className="font-semibold">Salary:</span> QAR
                              {notification.salary.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 text-xs sm:text-sm text-gray-500">
                          <p>
                            Posted:{" "}
                            {new Date(
                              notification.datePosted
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            Deadline:{" "}
                            {new Date(
                              notification.deadline
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="mt-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="flex items-center gap-3">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-800">Matching Employees</h4>
                              <span className="px-2 sm:px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs sm:text-sm">
                                {filterEmployees(notification).length}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          {filterEmployees(notification).length === 0 ? (
                            // Empty State
                            <div className="text-center py-6 sm:py-8">
                              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-full mb-4">
                                <svg
                                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <p className="text-gray-500 text-sm sm:text-base">No matching employees found</p>
                            </div>
                          ) : (
                            // Employee List
                            <div className="space-y-3">
                              {filterEmployees(notification).map((employee) => (
                                <div
                                  key={employee.id}
                                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  {/* Employee Info */}
                                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                                      {employee.name.charAt(0)}
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">{employee.name}</h5>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        {employee.profession} • {employee.department}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Action Button */}
                                  <button 
                                    onClick={() => setSelectedEmployee(employee)}
                                    className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                  >
                                    View Details
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedEmployee.profession} • {selectedEmployee.department}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 sm:mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-600">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-600">{selectedEmployee.contactNumber}</span>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 sm:mb-3">Professional Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Education</p>
                    <p className="text-sm sm:text-base text-gray-900">{selectedEmployee.education}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Experience</p>
                    <p className="text-sm sm:text-base text-gray-900">{selectedEmployee.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedEmployee.skills?.split(',').map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs sm:text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 sm:mb-3">Contract Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Contract Period</p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {selectedEmployee.contractStartDate} - {selectedEmployee.contractEndDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Salary</p>
                    <p className="text-sm sm:text-base text-gray-900">QAR {selectedEmployee.salary?.toLocaleString()}/year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Contact Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalPage;

