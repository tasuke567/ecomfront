// src/components/profile/Settings.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserSettings } from '../../redux/actions/userActions';


const Settings = () => {
  const dispatch = useDispatch();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    language: 'en',
    currency: 'USD'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    // Dispatch action to update settings
    dispatch(updateUserSettings({ [setting]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Order Updates</span>
            <input
              type="checkbox"
              checked={settings.orderUpdates}
              onChange={(e) => handleSettingChange('orderUpdates', e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Promotional Emails</span>
            <input
              type="checkbox"
              checked={settings.promotions}
              onChange={(e) => handleSettingChange('promotions', e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Newsletter</span>
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={(e) => handleSettingChange('newsletter', e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
        </div>
      </div>

      {/* Language and Region */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Language and Region</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="th">ไทย</option>
              {/* Add more languages */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="USD">USD ($)</option>
              <option value="THB">THB (฿)</option>
              {/* Add more currencies */}
            </select>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Account Management</h3>
        <div className="space-y-4">
          <button
            className="text-red-600 hover:text-red-700"
            onClick={() => {/* Handle account deactivation */}}
          >
            Deactivate Account
          </button>
          <button
            className="text-red-600 hover:text-red-700"
            onClick={() => {/* Handle account deletion */}}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;