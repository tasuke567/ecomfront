// src/pages/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const auth = useSelector(state => state.auth);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <img
                src={auth.user?.avatar || '/avatar-placeholder.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{auth.user?.name}</h2>
              <p className="text-gray-600">{auth.user?.email}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Profile Information
              </button>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Order History
              </button>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Addresses
              </button>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Payment Methods
              </button>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded"
                    defaultValue={auth.user?.firstName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded"
                    defaultValue={auth.user?.lastName}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  defaultValue={auth.user?.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded"
                  defaultValue={auth.user?.phone}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;