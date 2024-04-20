"use client";
"use client";
import React from "react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: string;
  quantity:number;
  name:string;
  price:number;
  // Add other properties of the Product interface
}

interface CartItem {
  id: string;
  product: Product;
  name:string;
}

interface ProductProps {
  product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { addToCart, cart }: { addToCart: (product: Product) => void, cart: CartItem[] } = useCart();

  const isProductInCart = cart.some((item: CartItem) => item.id === product.id);
  const isProductAvailable = product.quantity > 0;

  return (
    <div className="border rounded-lg p-4 shadow-md">
    <h2 className="text-lg font-semibold">{product.name}</h2>
    <p className="text-gray-400">${product.price.toFixed(2)}</p>
    
    <br />

    {/* <button
      onClick={() => addToCart(product)}
      disabled={isProductInCart}
      className={`px-2 py-1.5 ${isProductInCart
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "bg-yellow-500 text-white hover:bg-blue-600"
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs`}
    >
      {isProductInCart ? "Added to Cart" : "Add to Cart"}
    </button> */}

    {isProductAvailable ? (
      <button
        onClick={() => addToCart(product)}
        disabled={isProductInCart}
        className={`px-2 py-1.5 ${isProductInCart
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-yellow-500 text-white hover:bg-blue-600"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs`}
      >
        {isProductInCart ? "Added to Cart" : "Add to Cart"}
      </button>
    ) : (
      <p className="text-red-500 font-semibold">Sold out!</p>
    )}

  </div> 
  );
};

export default Product;