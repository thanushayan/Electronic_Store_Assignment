import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/products" className="hover:text-blue-400">Products</Link>
        </li>
        <li className="mb-4">
          <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:text-blue-400">Users</Link>
        </li>
        <li className="mb-4">
          <Link to="/reports" className="hover:text-blue-400">Reports</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
