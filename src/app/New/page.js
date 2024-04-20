import React from 'react'
import Link from "next/link";
import Image from "next/image";
import products from "@/app/data/products";



export default async function Newest() {
  const data = products;

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-900">
                  {product.category}
                </div>
                <h3 className="text-sm text-gray-700">
                    <Link href={`/${product.category}`}>
                      {product.name}
                    </Link>
                  </h3>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                {product.category}
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

