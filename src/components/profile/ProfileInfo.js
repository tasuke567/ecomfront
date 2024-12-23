// src/components/profile/ProfileInfo.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../../redux/actions/userActions';
import GoogleConnect from './GoogleConnect';

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user.picture || '/default-avatar.png');

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    bio: user.bio || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar */}
        <div className="space-y-2">
            <GoogleConnect />
            {/* หรือเพิ่มปุ่มอัพโหลดรูปเอง */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setAvatar(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
            >
              Upload Custom Photo
            </label>
          </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
            disabled={!isEditing}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;