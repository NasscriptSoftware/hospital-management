import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const LandingPage = () => {
  const employeeData = [
    { name: "Hospital A", employees: 150 },
    { name: "Hospital B", employees: 200 },
    { name: "Hospital C", employees: 180 },
    { name: "Hospital D", employees: 120 },
  ];

  const statusData = [
    { name: "Active", value: 540, color: "#10B981" },
    { name: "Inactive", value: 210, color: "#EF4444" },
    { name: "Interested", value: 320, color: "#6366F1" },
  ];

  const activeEmployeesData = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 150 },
    { month: "Mar", count: 200 },
    { month: "Apr", count: 180 },
    { month: "May", count: 220 },
    { month: "Jun", count: 540 }, // Current active
  ];

  const inactiveEmployeesData = [
    { month: "Jan", count: 50 },
    { month: "Feb", count: 80 },
    { month: "Mar", count: 120 },
    { month: "Apr", count: 160 },
    { month: "May", count: 190 },
    { month: "Jun", count: 210 }, // Current inactive
  ];

  // Color theme matching sidebar
  const theme = {
    primary: "#1E40AF", // Dark blue
    secondary: "#6366F1", // Indigo
    accent: "#10B981", // Emerald
    background: "#F3F4F6", // Light gray
    text: "#1F2937", // Dark gray
  };

  // Add responsive chart dimensions
  const getChartDimensions = () => {
    const width = window.innerWidth;
    return {
      full: width < 768 ? width - 40 : 500,
      small: width < 768 ? width - 40 : 350,
      height: width < 768 ? 250 : 300
    };
  };

  const dims = getChartDimensions();

  return (
    <div className="w-full lg:w-[calc(100%-250px)] min-h-screen bg-gray-50 p-[1rem] lg:ml-[250px]">
      {/* Hero Section */}
      <div className="w-full py-8 md:py-16 lg:py-24 px-4 bg-gradient-to-r from-indigo-600 to-blue-700">
        <div className="w-full py-12 md:py-24 text-black text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Welcome to Our Manpower Company
          </h1>
          <p className="mt-6 text-xl text-gray-100">
            Your trusted partner for skilled manpower solutions.
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-indigo-600 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-8 md:py-12 w-full mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">
          Employee Statistics
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Hospital Employment Chart */}
          <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-x-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              Hospital-wise Employment
            </h3>
            <div className="flex justify-center">
              <BarChart width={dims.full} height={dims.height} data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="employees" fill={theme.secondary} />
              </BarChart>
            </div>
          </div>

          {/* Employee Status Chart */}
          <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-x-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              Employee Status Distribution
            </h3>
            <div className="flex justify-center">
              <PieChart width={dims.full} height={dims.height}>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Active Employees Charts */}
        <div className="w-full mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
            Active Employees Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-x-auto">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                Active Employees
              </h3>
              <div className="flex justify-center">
                <BarChart width={dims.small} height={dims.height} data={activeEmployeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </div>
            </div>

            {/* Line Chart */}
            <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-x-auto">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                Inactive Employees
              </h3>
              <div className="flex justify-center">
                <LineChart width={dims.small} height={dims.height} data={inactiveEmployeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
            </div>

            {/* Area Chart */}
            <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-x-auto">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                Interested Employees
              </h3>
              <div className="flex justify-center">
                <AreaChart width={dims.small} height={dims.height} data={inactiveEmployeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    fill="#EF4444"
                    fillOpacity={0.3}
                    stroke="#EF4444"
                  />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
