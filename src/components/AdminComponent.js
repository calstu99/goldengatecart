"use client";
// components/AdminComponent.js
import React, { useState, useEffect } from 'react';
// import products from '../data/products'; // Import the products array
import products from '../app/data/products'; // Import the products array

const AdminComponent = () => {
  const [productList, setProductList] = useState(products);
  const path = require('path');

  // Function to handle product updates
  const handleProductUpdate = (updatedProduct) => {
    const updatedList = productList.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProductList(updatedList);
  };

  // Function to handle product deletion
  const handleProductDelete = (productId) => {
    const updatedList = productList.filter((product) => product.id !== productId);
    setProductList(updatedList);
  };

  // Function to handle new product creation
  const handleProductCreate = (newProduct) => {
    setProductList([...productList, newProduct]);
  };

  // Save the updated product list to the products.js file
  useEffect(() => {
    // Save the updated product list to the products.js file
    const productsFilePath = path.join(process.cwd(), 'data', 'products.js');
    console.log(productsFilePath);
    const productsData = `const products = ${JSON.stringify(productList, null, 2)};\n\nexport default products;`;

    fs.writeFile(productsFilePath, productsData, (err) => {
      if (err) {
        console.error('Error writing products file:', err);
      } else {
        console.log('Products file updated successfully.');
      }
    });
  }, [productList]);

  return (
      <div>
          <h1>Admin Panel</h1>
          {/* Render a list of products with edit/delete functionality */}
          <ul>
              {productList.map((product) => (
                  <li key={product.id}>
                      {product.name} - ${product.price}
                      <button onClick={() => handleProductUpdate(/* updated product object */)}>
                          Edit
                      </button>
                      <button onClick={() => handleProductDelete(product.id)}>Delete</button>
                  </li>
              ))}
          </ul>

          {/* Render a form to create a new product */}
          <form onSubmit={(e) => {
              e.preventDefault();
              handleProductCreate(/* new product object */);
          }}>
              {/* Form fields for creating a new product */}
              <button type="submit">Create Product</button>
          </form>
      </div>
  );
};

export default AdminComponent;