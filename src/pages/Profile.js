// src/pages/Profile.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Shipping Addresses
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'password' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'profile' && <ProfileInformation />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'addresses' && <AddressList />}
            {activeTab === 'password' && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;