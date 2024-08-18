import React from 'react';

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3>Total Sales</h3>
          <p>$50,000</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
          <h3>Total Orders</h3>
          <p>120</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h3>Total Users</h3>
          <p>1,200</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3>Notifications</h3>
          <p>15 new</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
