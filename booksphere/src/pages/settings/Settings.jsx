import React, { useState } from 'react';
import Navbar from '../../components/navbar';

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className='flex flex-col h-screen'>
      {/* Navbar - Span full width */}
      <div className='col-span-full'>
        <Navbar />
      </div>

      {/* Settings Content */}
      <div className='flex-1 overflow-y-auto px-[3vw] py-[4vh]'>
        <div className="rounded-2xl text-[var(--bgcolorlight)] bg-[var(--postcolor)] p-[2vw] max-w-[800px] mx-auto">
          <h1 className="text-[2vw] font-bold mb-[3vh] border-b border-[var(--bgcolorlight)] pb-[1.5vh]">
            Account Settings
          </h1>

          {/* Change Profile Picture */}
          <div className="flex items-center gap-[2vw] mb-[3vh]">
            <label className="text-[1.2vw] cursor-pointer p-[1vh] rounded-xl hover:bg-[#833f36] transition-all">
              ✎ Change Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {/* Add image change logic */}}
              />
            </label>
          </div>

          {/* Change Name */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Full Name</label>
            <div className="flex gap-[1vw]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
              />
            </div>
          </div>

          {/* Change Email */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Email Address</label>
            <div className="flex gap-[1vw]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
              />
              
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Password</label>
            <div className="flex gap-[1vw]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
                placeholder="••••••••"
              />
              <button className="px-[1.5vw] py-[0.5vh] bg-[var(--bgcolorlight)] text-[var(--postcolor)] rounded-xl hover:bg-[#833f36] transition-all">
                Change
              </button>
            </div>
          </div>

          {/* Account Privacy */}
          <div className="flex items-center justify-between">
            <span className="text-[1.2vw]">Private Account</span>
            <div 
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-[3.5vw] h-[2vw] rounded-full p-[0.3vw] cursor-pointer transition-all ${
                isPrivate ? 'bg-[var(--bgcolorlight)]' : 'bg-gray-400'
              }`}
            >
              <div className={`w-[1.4vw] h-[1.4vw] rounded-full transition-all transform ${
                isPrivate ? 'translate-x-[1.5vw] bg-[var(--postcolor)]' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>
            <button className="px-[1.5vw] py-[0.5vh] bg-[var(--bgcolorlight)] text-[var(--postcolor)] rounded-xl hover:bg-[#833f36] transition-all">
                apply Changes
              </button>
        </div>
      </div>
    </div>
  );
}
