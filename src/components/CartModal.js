"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



const CartModal = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, isCartOpen, closeCart,openCart} = useCart();
  useEffect(() => {
    if (isCartOpen) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [isCartOpen]);

  //***************************/
   //console.log('is cart open', isCartOpen);
  //************************* */

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleDecrement = (productId) => {
    decrementQuantity(productId);

    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity === 0) {
      removeFromCart(productId);
    }
  };

  const checkout = async () => {
    await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cart }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          window.location.href = response.url;
        }
      });
  };

  // Use useEffect to set the initial state of the Sheet on the client-side
//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      {/* <SheetTrigger>Open Cart</SheetTrigger> */}
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <br/>
        </SheetHeader>
        <div>
          <ul>
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center mb-2"
              >
                <div className='flex-1'>
                  <div className='w-48 truncate'>
                  <p className="font-semibold">{product.name}</p>
                  </div>
                 
                  <p className="text-gray-400">
                    ${product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <p className="text-gray-400 text-sm">{product.category}</p>
                </div>
                <br/>
                
                <div className="ml-4 flex space-x-2">
                <br/>
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="scale-25 ml-6 px-2 py-1 bg-blue-500 text-blue hover:bg-blue-600/50 w-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementQuantity(product.id)}
                    className="scale-25 ml-4 px-2 py-1 bg-blue-500 text-blue hover:bg-blue-600 w-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    +
                  </button>
               
                </div>
              </li>
            ))}
          </ul>
        </div>

      
        {cart.length > 0 ? (
          <>
         
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
            {/* <button
              onClick={checkout}
              className="mt-4 px-4 py-2 bg-red-500 text-white hover:bg-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Buy Now
            </button> */}
            <br/><br/>
               <Button 
             onClick={checkout}>
             Buy Now
            </Button>
          </div>
          <br/>
          <div className="mt-6 flex justify-left text-center text-xl text-gray-500">
              <p>
                OR{" "}
                <br/><br/>
                <button
                  onClick={() => closeCart()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
            {/* <Button 
             onClick={checkout}>
             Buy Now
            </Button> */}

          </>
          
        ) : (
          <p className="mt-4 text-lg font-semibold">You dont have any items</p>
        )}


      </SheetContent>
    </Sheet>
  );
};

export default CartModal;


// The issue with the "hydration failed" error in this case is likely caused by the defaultOpen prop on the Sheet component. When this prop is set to true, the Sheet component will be rendered as open on the server-side, but it may not match the initial state on the client-side, causing a hydration mismatch.
// To fix this issue, you can move the state management of the Sheet component to the client-side using the useState hook and the useEffect hook. Here's how you can modify the code:


// https://nextjs.org/docs/messages/app-static-to-dynamic-error
// Resolving "app/ Static to Dynamic Error" in Next.js