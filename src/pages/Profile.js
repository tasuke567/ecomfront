// src/pages/Profile.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/profile/Sidebar';
import ProfileInfo from '../components/profile/ProfileInfo';
import OrderHistory from '../components/profile/OrderHistory';
import AddressesList from '../components/profile/AddressList';
import Security from '../components/profile/Security';
import Settings from '../components/profile/Settings';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector(state => state.auth.user);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressesList />;
      case 'security':
        return <Security />;
      case 'settings':
        return <Settings />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;