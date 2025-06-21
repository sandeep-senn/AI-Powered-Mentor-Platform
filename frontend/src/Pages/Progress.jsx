import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const pieData = [
  { name: 'DSA', value: 30 },
  { name: 'Web Dev', value: 25 },
  { name: 'Cloud', value: 15 },
  { name: 'Languages', value: 20 },
  { name: 'Database', value: 10 },
];

const lineData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3.5 },
  { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 3 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 1 },
  { day: 'Sun', hours: 2 },
];

const Progress = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Learning Analytics</h2>

      {/* Top Time Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h4 className="text-gray-600 text-sm">Productive Time</h4>
          <p className="text-2xl font-semibold text-gray-800">12.4 hr</p>
          <p className="text-green-500 text-sm mt-1">↑ +25% from last week</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h4 className="text-gray-600 text-sm">Focused Time</h4>
          <p className="text-2xl font-semibold text-gray-800">8.5 hr</p>
          <p className="text-red-500 text-sm mt-1">↓ -18% from last week</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h4 className="text-gray-600 text-sm">Available Time</h4>
          <p className="text-2xl font-semibold text-gray-800">6.5 hr</p>
          <p className="text-green-500 text-sm mt-1">↑ +15% from last week</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Learning Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Daily Learning Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Upcoming Tasks</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>✅ Complete Graph DSA Questions</li>
          <li>✅ Revise Cloud Computing - Serverless</li>
          <li>📌 Learn MongoDB Aggregation</li>
          <li>📌 Solve 3 Medium-level SQL problems</li>
          <li>📌 Read about Load Balancing in System Design</li>
        </ul>
      </div>
    </div>
  );
};

export default Progress;
