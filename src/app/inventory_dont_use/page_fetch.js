"use client";
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://www.fragrancenet.com/wsdata/datafeed2.txt?Username=fnetdatafeed&Password=datafeed', {
          mode: 'no-cors',
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.text();
        const products = data.split('\n').slice(1, -1).map(line => {
          const [sku, productCategory, itemType, name, designer, brand, productDescription, gender, fragranceNotes, yearIntroduced, recommendedUse, msrp, fnetWholesalePrice, imageLarge, imageSmall, url] = line.split('\t');
          return {
            sku: parseInt(sku),
            productCategory,
            itemType,
            name,
            designer,
            brand,
            productDescription,
            gender,
            fragranceNotes,
            yearIntroduced: parseInt(yearIntroduced),
            recommendedUse,
            msrp: parseFloat(msrp),
            fnetWholesalePrice: parseFloat(fnetWholesalePrice),
            imageLarge,
            imageSmall,
            url
          };
        });
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Category</th>
            <th>Item Type</th>
            <th>Name</th>
            <th>Designer</th>
            <th>Brand</th>
            <th>Product Description</th>
            <th>Gender</th>
            <th>Fragrance Notes</th>
            <th>Year Introduced</th>
            <th>Recommended Use</th>
            <th>MSRP</th>
            <th>FNET Wholesale Price</th>
            <th>Image Large</th>
            <th>Image Small</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.sku}</td>
              <td>{product.productCategory}</td>
              <td>{product.itemType}</td>
              <td>{product.name}</td>
              <td>{product.designer}</td>
              <td>{product.brand}</td>
              <td>{product.productDescription}</td>
              <td>{product.gender}</td>
              <td>{product.fragranceNotes}</td>
              <td>{product.yearIntroduced}</td>
              <td>{product.recommendedUse}</td>
              <td>${product.msrp.toFixed(2)}</td>
              <td>${product.fnetWholesalePrice.toFixed(2)}</td>
              <td><a href={product.imageLarge} target="_blank">View</a></td>
              <td><a href={product.imageSmall} target="_blank">View</a></td>
              <td><a href={product.url} target="_blank">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;