"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Product from "@/components/Product";
import products from "@/app/data/products";
import myImage1 from '../app/assets/images/Nike/phoenix women1.png';
import myImage2 from '../app/assets/images/Nike/mens1.png';


export default function Newest() {
  const data = products;
  const { addToCart, cart } = useCart();
//  const isProductInCart = cart.some((item) => item.id === product.id);

  return (

    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
     
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
                <Link href={`/product/${product.slug}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                </Link>
              
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-900">
                  <Link href={`/category/${product.category}`}>
                    {product.category}
                  </Link>
                  
                
                </div>
                <h3 className="text-sm text-xs text-gray-800">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
              </div>
              {/* pass product.id to Component (Product - to display name, price, addto cart/added to cart) */}
              
              <div className="grid gap-4 px2">
                
                  <Product key={product.id} product={product} />
              
              </div>



              {/* <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                {product.category}
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              </div> */}

          

            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );

}