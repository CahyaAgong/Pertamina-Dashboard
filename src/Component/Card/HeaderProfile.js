// HeaderProfile.js
import React from 'react';
import { Bell } from 'lucide-react';

const HeaderProfile = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#F9FAFB] rounded-t-lg">
      {/* Left side: Text */}
      <h1 className="text-3xl font-bold text-[#1E3A8A]">
        Valida <span className="text-[#34D399]">Truth in Every Document</span>
      </h1>

      {/* Right side: Profile and Bell */}
      <div className="flex items-center space-x-4 text-black">
        <span className="font-medium">WV</span>

        {/* Profile Icon with Tooltip */}
        <div className="relative group">
          <img
            src={require('../../Assets/Image/profile.png')} // Adjust to a URL or other assets path
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-lg p-2 right-0 top-full w-36">
            <div className="flex flex-col space-y-2">
              <button className="text-sm">Profile</button>
              <button className="text-sm text-red-500">Sign Out</button>
            </div>
          </div>
        </div>

        {/* Notification Bell */}
        <Bell size={20} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default HeaderProfile;
