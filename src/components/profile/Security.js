// src/components/profile/Security.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { changePassword } from '../../redux/actions/userActions';

const Security = () => {
  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await dispatch(changePassword(passwords));
      setShowChangePassword(false);
      setPasswords({ current: '', new: '', confirm: '' });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Password</h3>
        {!showChangePassword ? (
          <button
            onClick={() => setShowChangePassword(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswords({ current: '', new: '', confirm: '' });
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <p className="text-gray-600 text-sm mt-1">
              Add additional security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Login Activity</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Chrome on Windows</p>
              <p className="text-sm text-gray-600">Last active: 2 hours ago</p>
            </div>
            <button className="text-red-600 hover:text-red-700">
              Log Out
            </button>
          </div>
          {/* Add more devices as needed */}
        </div>
      </div>
    </div>
  );
};

export default Security;