import  { useState, useEffect } from 'react';
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
  const hospitalData = [
    { name: "Hospital A", employees: 150 },
    { name: "Hospital B", employees: 200 },
    { name: "Hospital C", employees: 180 },
    { name: "Hospital D", employees: 120 },
  ];

  const employeeStatusData = [
    { name: "Active", value: 540, color: "#9333EA" },
    { name: "Inactive", value: 210, color: "#A855F7" },
    { name: "Interested", value: 320, color: "#7C3AED" }
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



  // Add state for dimensions
  const [dimensions, setDimensions] = useState({
    width: 300,
    height: 300
  });

  // Update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let chartWidth;
      let chartHeight;

      if (width < 768) { // Mobile
        chartWidth = width - 40; // Account for padding
        chartHeight = 250;
      } else if (width < 1024) { // Tablet
        chartWidth = width - 80;
        chartHeight = 300;
      } else { // Desktop
        chartWidth = (width - 300) / 2; // Account for sidebar and gap
        chartHeight = 300;
      }

      setDimensions({
        width: Math.min(chartWidth, 600), // Max width of 600px
        height: chartHeight
      });
    };

    updateDimensions(); // Initial call
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="p-4 md:p-6 w-full min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <h3 className="text-2xl font-bold">1,070</h3>
              <p className="text-green-500 text-sm">↑ 1.77% from last period</p>
            </div>
            <div className="text-purple-600">
              {/* Add your users icon here */}
              👥
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Active Placements</p>
              <h3 className="text-2xl font-bold">540</h3>
            </div>
            <div className="text-purple-600">
              {/* Add your briefcase icon here */}
              💼
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Partner Hospitals</p>
              <h3 className="text-2xl font-bold">140</h3>
              <p className="text-green-500 text-sm">↑ 48.35% from last period</p>
            </div>
            <div className="text-purple-600">
              {/* Add your hospital icon here */}
              🏥
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Average Placement Rate</p>
              <h3 className="text-2xl font-bold">76%</h3>
              <p className="text-green-500 text-sm">↑ 7.03% from last period</p>
            </div>
            <div className="text-purple-600">
              {/* Add your trending up icon here */}
              📈
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hospital-wise Employment */}
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold mb-4">Hospital-wise Employment</h3>
          <div className="w-full overflow-x-auto">
            <BarChart
              width={dimensions.width}
              height={dimensions.height}
              data={hospitalData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#9333EA" />
            </BarChart>
          </div>
        </div>

        {/* Employee Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold mb-4">Employee Status Distribution</h3>
          <div className="w-full overflow-x-auto">
            <PieChart
              width={dimensions.width}
              height={dimensions.height}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <Pie
                data={employeeStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={Math.min(dimensions.width, dimensions.height) / 3}
                fill="#8884d8"
                dataKey="value"
              >
                {employeeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Monthly Recruitment Trends */}
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold mb-4">Monthly Recruitment Trends</h3>
          <div className="w-full overflow-x-auto">
            <LineChart
              width={dimensions.width}
              height={dimensions.height}
              data={activeEmployeesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#9333EA" strokeWidth={2} />
            </LineChart>
          </div>
        </div>

        {/* Placement Success Rate */}
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold mb-4">Placement Success Rate</h3>
          <div className="w-full overflow-x-auto">
            <AreaChart
              width={dimensions.width}
              height={dimensions.height}
              data={inactiveEmployeesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                fill="#7C3AED"
                fillOpacity={0.3}
                stroke="#7C3AED"
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
