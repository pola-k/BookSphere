'use client';

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import ProfileIconModal from './profile-icon-modal';

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

  const [isProfileModal, ToggleProfileModal] = useState(false)

  // Ensure the return statement handles content correctly
  return (
    <header className="flex flex-col justify-evenly top-0 text-white sticky to z-50" style={{ backgroundColor: "var(--navbarcolor)", color: "var(--bgcolorlight)" }}>

      <nav className="flex items-center justify-between px-[1.5vw]">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="./src/images/logo-light.png" alt="Logo-Text" className="h-[8vh] w-auto" />
          </Link>

          <p className='text-[1.5vw] font-bold mx-[0.25vw]'>BookSphere</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border-[0.25vh] border-gray-300 bg-white rounded-4xl px-[1vw] py-[1.25vh] w-[50vw] text-[1vw]" style={{ backgroundColor: "var(--bgcolorlight)", borderColor: "var(--bordercolor)", color: "var(--headingcolordark)" }}>
          <input
            type="text"
            placeholder="Search..."
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            className="outline-none w-full bg-transparent"
          />
          <button className="text-gray-500 hover:cursor-pointer">
            <img src="./src/images/search.png" alt="" className='h-[1.5vw]'/>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center items-center gap-[2vw]">

          <div className='flex justify-center items-center gap-[2vw] text-[1.25vw] font-bold'>
            <Link to="/profile" className="rounded-md">Create Post</Link>
          </div>

          {/* Profile Icon (can be rendered here or using a separate function) */}
          <div className='relative hover:cursor-pointer' onClick={() => ToggleProfileModal(!isProfileModal)}>

              <img src="./src/images/profile-icon-light.png" alt="Logo-Text" className="h-[4.75vh] w-auto" />

            <ProfileIconModal isOpen={isProfileModal} closeModal={ToggleProfileModal}/>

          </div>

        </div>

        {/* Render header content based on the route */}
        {/* {renderHeaderContent()} */}
      </nav>
    </header>
  );
}
