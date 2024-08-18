import React, { useState } from 'react';

// Dummy data for demonstration
const initialOrders = [
  {
    id: 1,
    user: 'Thanu',
    date: '2024-08-12',
    status: 'Pending',
    total: 89.99
  },
  {
    id: 2,
    user: 'Mathu',
    date: '2024-08-12',
    status: 'Shipped',
    total: 45.50
  }
];

function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [newOrder, setNewOrder] = useState({
    id: '',
    user: '',
    date: '',
    status: 'Pending',
    total: ''
  });
  const [error, setError] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);

  const filteredOrders = orders.filter(order =>
    (order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)) &&
    (filterStatus ? order.status === filterStatus : true)
  );

  const handleAddOrder = () => {
    const { id, user, date, total } = newOrder;

    // Basic validation
    if (!id || !user || !date || isNaN(total)) {
      setError('Please fill in all fields correctly.');
      return;
    }

    // Further validation
    const parsedTotal = parseFloat(total);
    if (parsedTotal <= 0) {
      setError('Total must be greater than 0.');
      return;
    }

    if (editingOrder) {
      // Update existing order
      const updatedOrders = orders.map(order =>
        order.id === editingOrder.id
          ? { ...order, ...newOrder, total: parsedTotal }
          : order
      );
      setOrders(updatedOrders);
      setEditingOrder(null);
    } else {
      // Add new order
      const newOrderWithId = {
        ...newOrder,
        total: parsedTotal
      };
      setOrders([...orders, newOrderWithId]);
    }

    setNewOrder({
      id: '',
      user: '',
      date: '',
      status: 'Pending',
      total: ''
    });
    setError(''); // Clear error message
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleEditOrder = (id) => {
    const orderToEdit = orders.find(order => order.id === id);
    setNewOrder({ ...orderToEdit });
    setEditingOrder(orderToEdit);
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      {/* Add/Edit Order Form */}
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          {editingOrder ? 'Edit Order' : 'Add New Order'}
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="id"
            placeholder="Order ID"
            value={newOrder.id}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="user"
            placeholder="User"
            value={newOrder.user}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newOrder.date}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="total"
            placeholder="Total Amount"
            value={newOrder.total}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleAddOrder}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {editingOrder ? 'Update Order' : 'Add Order'}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by ID or User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.user}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditOrder(order.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 ml-2"
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

export default OrderManagement;
