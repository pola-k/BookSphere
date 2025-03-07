import React from 'react';

function Profile({ username, fullName, description,  imageUrl = 'https://placehold.co/600x400/png ' }) {
  return (
    <div className="rounded-2xl text-[var(--bgcolorlight)] bg-[var(--postcolor)] p-[1.5vw] min-h-[40vh] relative">
      {/* Profile Header */}
      <div className="flex items-center gap-[1vw]">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--bgcolorlight)]">
          <img
            src={imageUrl} // Use the imageUrl prop
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-[1.75vw] font-bold text-[var(--bgcolorlight)]">{username}</h2>
          <h3 className="text-[1.1vw] text-[var(--bgcolorlight)] mt-[0.5vh]">{fullName}</h3>
          <p className="text-[1vw] text-[var(--bgcolorlight)] mt-[1vh]">{description}</p>
        </div>
      </div>

      {/* Profile Options Row */}
      <div className="absolute bottom-3 left-3 right-3  mt-[2vh] flex justify-around  border-[var(--bgcolorlight)] pt-[2vh] ">
        <div className="text-center">
          <span className="text-[1.75vw] font-bold text-[var(--bgcolorlight)]">1.2k</span>
          <span className="block text-[1vw] text-[var(--bgcolorlight)]">Posts</span>
        </div>
        <div className="text-center">
          <span className="text-[1.75vw] font-bold text-[var(--bgcolorlight)]">5.6k</span>
          <span className="block text-[1vw] text-[var(--bgcolorlight)]">Followers</span>
        </div>
        <div className="text-center">
          <span className="text-[1.75vw] font-bold text-[var(--bgcolorlight)]">789</span>
          <span className="block text-[1vw] text-[var(--bgcolorlight)]">Following</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;