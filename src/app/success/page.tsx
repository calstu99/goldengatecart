"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


const Success = () => {

  const router = useRouter();
  const recentOrder = useRef(null);

  //To ensure that the recentOrder variable does not change when the
  // local storage is cleared, you can use the useRef hook instead of 
  // the useState hook. The useRef hook allows you to store a mutable
  // value that persists across component renders, without triggering
  // a re-render when the value changes.
  
  useEffect(() => {
    // Clear the shopping cart when the success page is loaded
   
    const stateFromStorage = window.localStorage.getItem('cartItems');
    recentOrder.current = stateFromStorage && JSON.parse(stateFromStorage);
   // write recent Order to database and track fulfillment.
    clearShoppingCart();

   // Redirect to the home page after 5 seconds
   const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 5000);

    // Clean up the redirect timer when the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [router]);


  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function clearShoppingCart() {
       localStorage.removeItem('cartItems');
   }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 text-4xl">
      Your Order is Completed
    </div>
  );
};

export default Success;
