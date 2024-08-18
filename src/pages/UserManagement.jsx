import React, { useState } from 'react';

// Dummy data for demonstration
const initialUsers = [
  {
    id: 1,
    name: 'thanushayn',
    email: 'thanushayan@gmail.com',
    contact: '0776408775',
    address: 'jaffna',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'mathusan',
    email: 'mathusan@gmail.com',
    contact: '0776407775',
    address: 'vavuniya ',
    role: 'Customer'
  }
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', contact: '', address: '', role: '' });

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    setUsers(users.map(user =>
      user.id === editingUser.id ? editingUser : user
    ));
    setEditingUser(null);
  };

  const handleAdd = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', contact: '', address: '', role: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="mb-4 flex flex-col space-y-4">
        {editingUser ? (
          <div className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Edit User</h3>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="text"
              value={editingUser.contact}
              onChange={(e) => setEditingUser({ ...editingUser, contact: e.target.value })}
              placeholder="Contact Number"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="text"
              value={editingUser.address}
              onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
              placeholder="Address"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="border p-2 rounded-lg mb-2 w-full"
            >
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Add New User</h3>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="text"
              value={newUser.contact}
              onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
              placeholder="Contact Number"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <input
              type="text"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              placeholder="Address"
              className="border p-2 rounded-lg mb-2 w-full"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 rounded-lg mb-2 w-full"
            >
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add User
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Contact Number</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.contact}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-2 rounded-lg"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
