'use client';

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import ProfileIcon from './profile-icon';

export default function Navbar() {
  //   const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted


  //   useEffect(() => {
  //     // Mark component as mounted only after the component mounts
  //     setIsMounted(true);
  //   }, []);

  //   // Render logic based on the router pathname
  //   const renderHeaderContent = () => {
  //     if (!isMounted) {
  //       return null;  // Prevent rendering before mount
  //     }

  //     else {

  //       switch (usePathname()) {    // usePathname() + next/navigation solved the issue
  //         case '/':
  //           return (
  //             <div className="flex-shrink-0 space-x-4">
  //               <Link href="/login" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
  //                 Login
  //               </Link>
  //               <Link href="/register" className="bg-darkOrange text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lightOrange transition-colors">
  //                 Sign Up
  //               </Link>
  //             </div>
  //           );

  //         default:
  //           return (
  //             <ProfileIcon />
  //           );

  //       }
  //     }
  //   };

  // Ensure the return statement handles content correctly
  return (
    <header className="flex flex-col justify-evenly top-0 text-white py-2 sticky to z-50 bg-[#C19A6B] border-1 border-black">
      <nav className="flex mx-4 items-center justify-around px-4">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="./src/images/logo.png" alt="Logo-Text" className="h-10" />
          </Link>

          <p className='text-lg font-bold ml-2'>BookSphere</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border-2 border-gray-300 bg-white rounded-lg px-4 py-2 w-[50vw] mx-auto">
          <input
            type="text"
            placeholder="Search..."
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            className="outline-none w-full bg-transparent text-gray-700"
          />
          <button className="text-gray-500 hover:text-blue-500">
            🔍
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4 text-lg font-bold mx-10">
          <Link to="/profile" className="px-4 py-2 rounded-md">Profile</Link>
          <Link to="/about" className="px-4 py-2 rounded-md">About</Link>
        </div>

        {/* Profile Icon (can be rendered here or using a separate function) */}
        <div className="">
          <Link to="/">
            <img src="./src/images/logo.png" alt="Logo-Text" className="h-10" />
          </Link>
        </div>

        {/* Render header content based on the route */}
        {/* {renderHeaderContent()} */}
      </nav>
    </header>
  );
}
