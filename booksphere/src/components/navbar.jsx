import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import ProfileIconModal from './profile-icon-modal';
import SearchBar from './search-bar';

export default function Navbar() {

  const [isProfileModal, ToggleProfileModal] = useState(false)

  // Ensure the return statement handles content correctly
  return (
    <header className="flex flex-col justify-evenly top-0 sticky to z-50 bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]">

      <nav className="flex items-center justify-between px-[1.5vw]">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/images/logo-light.png" alt="Logo-Text" className="h-[8vh] w-auto" />
          </Link>

          <p className='text-[1.5vw] font-bold mx-[0.25vw]'>BookSphere</p>
        </div>

        {/* Search Bar */}
        <SearchBar />
      
        {/* Navigation Tabs */}
        <div className="flex justify-center items-center gap-[2vw]">

          <div className='rounded-4xl px-[1vw] py-[0.5vh] text-[1.25vw] font-bold hover:bg-[var(--optionshovercolor)]'>
            <Link to="/create-post" className="rounded-md">Create Post</Link>
          </div>

          {/* Profile Icon (can be rendered here or using a separate function) */}
          <div className='relative hover:cursor-pointer' onClick={() => ToggleProfileModal(!isProfileModal)}>

              <img src="/images/profile-icon-light.png" alt="Logo-Text" className="h-[4.75vh] w-auto" />

            <ProfileIconModal isOpen={isProfileModal} closeModal={ToggleProfileModal}/>

          </div>

        </div>

        {/* Render header content based on the route */}
        {/* {renderHeaderContent()} */}
      </nav>
    </header>
  );
}
