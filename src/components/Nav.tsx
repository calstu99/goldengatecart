"use client";

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from "./CartContext";
import  { useState, useEffect } from 'react';

import Image from 'next/image';
// import logo from '../../public/next.svg';
import logo from '@/components/logo.svg';

import { Button } from './ui/button';
import {ShoppingBag} from 'lucide-react';
import {
    Sheet,
       SheetTrigger,
       SheetFooter,
       SheetContent,
       SheetClose,
  } from "@/components/ui/sheet";

const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/Men" },
    { name: "Women", href: "/Women" },
    { name: "Teens", href: "/Teens" },
  ];



const Nav = () => {
    const pathname = usePathname();
    const {openCart} = useCart();

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          setIsSticky(true);
          console.log('scrolling');
        } else {
          setIsSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    
        <Sheet >

        
        {/* <header className="mb-8 border-b"> */}
      <header className={`${isSticky ? 'sticky' : ''} mb-8 border-b`}>
        <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
          <Link href="/">
            <h1 className="text-2xl md:text-4xl font-bold">
              GoldenGate<span className="text-primary">Cart </span>
            </h1>
          </Link>

          {/* <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" /> */}
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
          />

          <nav className="hidden gap-12 lg:flex 2xl:ml-16">
            {links.map((link, idx) => (
              <div key={idx}>
                {pathname === link.href ? (
                  <Link
                    className="text-lg font-semibold text-primary"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
            {/* https://tailwindcss.com/docs/divide-color*/}
          <div className="flex divide-x border-r sm:border-1 border-solid border-gray-100 ">

            <Button
              variant={"outline"}
              onClick={() => openCart()}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            >

              <ShoppingBag size={25} color="#6d28d9" />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Cart
              </span>
            </Button>

          </div>
          <div>

          </div>


        </div>
      </header>

      
        </Sheet>
      );
  
}

export default Nav


//  If you were calling it directly like onClick={openCart()}, it would execute the function immediately when the component renders, instead of waiting for the click event.
// Correct waay to call a function in an event handler like 'onClick"  is to pass a callback function that calls the desired function. This is typically done by wrapping the function call in an anonymous arrow function, like this:
// <button onClick={() => openCart()}>Open Cart</button>