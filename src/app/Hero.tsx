import Image from "next/image";

import Link from "next/link";
import React from 'react';
import myImage1 from '../app/assets/images/jacket.jpg'
import myImage2 from '../app/assets/images/windrunner.jpeg'

const Hero = () => {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
    <div className="mb-8 flex flex-wrap justify-between md:mb-16">
      <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
          Top Fashion for a top price!
        </h1>
        <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
          We sell only the most exclusive and high quality products for you.
          We are the best so come and shop with us.
        </p>
      </div>

      <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
        <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
          <Image
            src={ myImage1}
            alt="Great Photo"
            className="h-full w-full object-cover object-center"
            priority
            width={500}
            height={500}
          />
        </div>

        <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
        <Image
            src ="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=200&w=460"
            alt="Great Photo"
            className="h-full w-full object-cover object-center"
            priority
            width={500}
            height={500}
          />
          
          {/* <img
              // src={myImage2}
            src ="https://images.pexels.com/photos/5650028/pexels-photo-5650028.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=300&w=860"
            alt="Great Photo"
            className="h-full w-full object-cover object-center"
           
          /> */}
        </div>

        <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
        <Image
            src ="https://images.pexels.com/photos/8154672/pexels-photo-8154672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=200&w=460"
            alt="Great Photo"
            className="h-full w-full object-cover object-center"
            priority
            width={500}
            height={500}
          />
        </div>

      </div>
    </div>

    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
      <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border border-violet-300">
        <Link
          href="/category/Men"
          className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
        >
          Men
        </Link>
        <Link
          href="/category/Women"
          className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
        >
          Women
        </Link>
        <Link
          href="/category/Teens"
          className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
        >
          Teens
        </Link>
      </div>
    </div>
  </section>
  )
}

export default Hero