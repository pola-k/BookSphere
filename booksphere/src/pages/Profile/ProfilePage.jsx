import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import HomeFeed from '../../components/home-feed';
import RecommendationsFeed from '../../components/recommendations-feed';
import React, { useState, useEffect } from 'react';
import Profile from '../../components/Profile/Profile';
import './ProfilePage.css';
import ProfilePic from "/images/profile-icon-light.png";
import axios from 'axios';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    description: '',
    imageUrl: ProfilePic // Default image while loading
  });
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) {
          console.error("No user_id found in sessionStorage");
          return;
        }


        const response = await axios.get(`http://localhost:5001/api/auth/profile/${userId}`,
          {
            withCredentials: true // Required for HTTP-only cookies
          }
        );

        if (!response) {
          throw new Error('Failed to fetch user data');
        }

        setProfileData({
          username: response.data.username || 'Anonymous',
          fullName: response.data.fullName || 'No Name',
          description: response.data.description || 'No Bio',
          imageUrl: response.data.imageUrl || ProfilePic
        });
      } 
      catch (error) 
      {
        console.log("Failed to fetch user data:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
        <Navbar />
        <div className='grid grid-cols-[20%_20%_35%_25%] border-1 border-[var(--bordercolor)]'>
          <div className='col-span-3 flex items-center justify-center'>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
      <Navbar />

      <div className='grid grid-cols-[20%_20%_35%_25%] border-1 border-[var(--bordercolor)]'>
        <div className='col-span-1 overflow-y-auto'>
          <Sidebar />
        </div>

        <div className='col-span-2 h-full overflow-y-auto border-1 px-[3vw] py-[4vh] text-2xl border-[var(--bordercolor)]'>
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
            <Profile
              username={profileData.username}
              fullName={profileData.fullName}
              description={profileData.description}
              imageUrl={profileData.imageUrl}
            />
            <HomeFeed feedType={"user"} />
          </div>
        </div>

        <div className='col-span-1 border-1 px-[1.5vw] py-[3vh] h-full overflow-y-auto border-[var(--bordercolor)]'>
          <RecommendationsFeed />
        </div>
      </div>
    </div>
  );
}
