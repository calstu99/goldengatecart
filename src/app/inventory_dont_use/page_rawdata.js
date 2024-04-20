"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import datafeed from '../datafeed2.txt';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  function parseFragranceData(data) {
    const rows = data.split('\n');
    const result = [];
  
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split('\t');
      const fragrance = {
        SKU: columns[0],
        ProductCategory: columns[1],
        ItemType: columns[2],
        Name: columns[3],
        Designer: columns[4],
        Brand: columns[5],
        ProductDescription: columns[6],
        Gender: columns[7],
        FragranceNotes: columns[8],
        YearIntroduced: columns[9],
        RecommendedUse: columns[10],
        MSRP: parseFloat(columns[11]),
        FNETWholesalePrice: parseFloat(columns[12]),
        ImageLarge: columns[13],
        ImageSmall: columns[14],
        URL: columns[15]
      };
      result.push(fragrance);
    }
  
    return result;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(datafeed);
        console.log('response',response);
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
    
    const fragrances = parseFragranceData(datafeed);
    console.log(fragrances);
    

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