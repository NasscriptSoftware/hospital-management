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
    // ... add more employees as needed
  ]);
  const [newHospital, setNewHospital] = useState({
    id: "",
    name: "",
    location: "",
    contact: "",
    type: "", // e.g., General, Specialty, Multi-specialty
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
    const newEmployeeData = { ...newEmployee, id: Date.now() };
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

      // You can add more matching criteria here if needed
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

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-400 border-b border-gray-200 pb-4">
        Hospital Management System
      </h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 shadow-sm mb-8">
          {["Hospitals", "Employees", "Job Notifications"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-200 
                ${
                  selected
                    ? "bg-blue-400 text-white shadow"
                    : "text-gray-600 hover:bg-gray-200 hover:text-blue-600"
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
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                  Add New Hospital
                </h2>
                <form
                  onSubmit={handleAddHospital}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <input
                    type="text"
                    placeholder="Hospital Name"
                    value={newHospital.name}
                    onChange={(e) =>
                      setNewHospital({ ...newHospital, name: e.target.value })
                    }
                    className="border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                             transition-all duration-200 placeholder-gray-400"
                  />
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
                    className="border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                             transition-all duration-200 placeholder-gray-400"
                  />
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
                    className="border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                             transition-all duration-200 placeholder-gray-400"
                  />
                  <select
                    value={newHospital.type}
                    onChange={(e) =>
                      setNewHospital({ ...newHospital, type: e.target.value })
                    }
                    className="border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                             transition-all duration-200 placeholder-gray-400"
                  >
                    <option value="">Select Hospital Type</option>
                    <option value="general">General Hospital</option>
                    <option value="specialty">Specialty Hospital</option>
                    <option value="multi-specialty">
                      Multi-Specialty Hospital
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="col-span-1 md:col-span-2 bg-blue-400 text-white px-6 py-3 rounded-lg 
                             hover:bg-blue-500 transition-colors duration-200 font-medium 
                             shadow-sm hover:shadow-md"
                  >
                    Add Hospital
                  </button>
                </form>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Hospitals List
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                        >
                          NAME
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                        >
                          LOCATION
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                        >
                          CONTACT
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                        >
                          TYPE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {hospitals.map((hospital) => (
                        <tr
                          key={hospital.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {hospital.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 text-center">
                            {hospital.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                            {hospital.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                            {hospital.contact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
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
          </Tab.Panel>

          {/* Employees Panel */}
          <Tab.Panel>
            <div className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowEmployeeForm(!showEmployeeForm)}
                  className="bg-blue-400 text-white px-6 py-3 rounded-lg 
                           hover:bg-blue-500 transition-colors duration-200 
                           font-medium shadow-sm hover:shadow-md"
                >
                  {showEmployeeForm ? "Cancel" : "Add Employee"}
                </button>
              </div>

              {showEmployeeForm && (
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                    Add New Employee
                  </h2>
                  <form
                    onSubmit={handleAddEmployee}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
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
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
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
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      >
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
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="education"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="experience"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="skills"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="contactNumber"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="contractStartDate"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="contractEndDate"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
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
                        className="peer w-full border border-gray-200 bg-white text-gray-800 p-3 rounded-lg 
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none 
                                 transition-all duration-200 pt-6"
                        required
                      />
                      <label
                        htmlFor="salary"
                        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                 transition-all duration-200 peer-placeholder-shown:top-3.5 
                                 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                      >
                        Salary
                      </label>
                    </div>

                    {/* Form Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowEmployeeForm(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg 
                                 hover:bg-gray-300 transition-colors duration-200 
                                 font-medium shadow-sm hover:shadow-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-400 text-white px-6 py-3 rounded-lg 
                                 hover:bg-blue-500 transition-colors duration-200 
                                 font-medium shadow-sm hover:shadow-md"
                      >
                        Save Employee
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Employees List
                </h2>
                {employees.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">
                      No employees added yet
                    </p>
                    <p className="text-gray-400 mt-2">
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
                              className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {employee.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {employee.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.hospital}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.profession}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.contact}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {employee.contractPeriod}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                  Active Job Notifications
                </h2>
                {jobNotifications.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">
                      No job notifications available
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {jobNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border border-gray-200 rounded-xl p-6 
                                    hover:shadow-lg transition-all duration-200 bg-white"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-blue-400">
                            {notification.position}
                          </h3>
                          <span
                            className="bg-green-100 text-green-800 px-3 py-1 
                                         rounded-full text-sm font-medium"
                          >
                            {notification.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-gray-600">
                              <span className="font-semibold">Hospital:</span>{" "}
                              {hospitals.find(
                                (h) => h.id === notification.hospitalName
                              ) || "Not specified"}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Department:</span>{" "}
                              {notification.department}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">
                                Required Profession:
                              </span>{" "}
                              {notification.requiredProfession}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Education:</span>{" "}
                              {notification.education}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              <span className="font-semibold">Experience:</span>{" "}
                              {notification.experience}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Skills:</span>{" "}
                              {notification.skills}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Salary:</span> QAR
                              {notification.salary.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-500">
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

                        <div className="mt-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-semibold text-gray-800">Matching Employees</h4>
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                                {filterEmployees(notification).length}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          {filterEmployees(notification).length === 0 ? (
                            // Empty State
                            <div className="text-center py-8">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                                <svg
                                  className="w-8 h-8 text-gray-400"
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
                              <p className="text-gray-500">No matching employees found</p>
                            </div>
                          ) : (
                            // Employee List
                            <div className="space-y-3">
                              {filterEmployees(notification).map((employee) => (
                                <div
                                  key={employee.id}
                                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  {/* Employee Info */}
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                      {employee.name.charAt(0)}
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-900">{employee.name}</h5>
                                      <p className="text-sm text-gray-500">
                                        {employee.profession} • {employee.department}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Action Button */}
                                  <button 
                                    onClick={() => setSelectedEmployee(employee)}
                                    className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{selectedEmployee.contactNumber}</span>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Professional Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-gray-900">{selectedEmployee.education}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-gray-900">{selectedEmployee.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedEmployee.skills?.split(',').map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
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
                <h4 className="text-sm font-medium text-gray-500 mb-3">Contract Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Contract Period</p>
                    <p className="text-gray-900">
                      {selectedEmployee.contractStartDate} - {selectedEmployee.contractEndDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="text-gray-900">${selectedEmployee.salary?.toLocaleString()}/year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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
