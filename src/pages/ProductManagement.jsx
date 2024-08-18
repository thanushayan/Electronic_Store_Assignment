import React, { useState } from 'react';

// Dummy data for demonstration
const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    price: 29.99,
    stock: 100,
    description: 'Description for product 1',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    price: 49.99,
    stock: 50,
    description: 'Description for product 2',
    image: 'https://via.placeholder.com/100'
  }
];

function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCategory ? product.category === filterCategory : true)
  );

  const handleAddProduct = () => {
    const { name, category, price, stock, description, image } = newProduct;

    // Basic validation
    if (!name || !category || isNaN(price) || isNaN(stock) || !description || !image) {
      setError('Please fill in all fields correctly.');
      return;
    }

    // Further validation
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    if (parsedPrice <= 0 || parsedStock < 0) {
      setError('Price must be greater than 0 and stock must be non-negative.');
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id
          ? { ...product, ...newProduct, price: parsedPrice, stock: parsedStock }
          : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      // Add new product
      const newProductWithId = {
        ...newProduct,
        id: products.length + 1, // Generate a new ID
        price: parsedPrice,
        stock: parsedStock
      };
      setProducts([...products, newProductWithId]);
    }

    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    });
    setError(''); // Clear error message
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setNewProduct({ ...productToEdit });
    setEditingProduct(productToEdit);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Add/Edit Product Form */}
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-2">Price: ${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
            <p className="text-gray-700 mb-4">Description: {product.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditProduct(product.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;
