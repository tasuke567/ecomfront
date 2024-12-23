// src/redux/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// src/redux/actions/userActions.js
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData) => {
      // ถ้ามีรูปโปรไฟล์จาก Google ให้บันทึกด้วย
      if (userData.picture) {
        const response = await fetch(userData.picture);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('avatar', blob);
        formData.append('data', JSON.stringify(userData));
  
        const uploadResponse = await fetch('/api/user/profile', {
          method: 'PUT',
          body: formData
        });
  
        if (!uploadResponse.ok) throw new Error('Failed to update profile');
        return await uploadResponse.json();
      }
  
      // ถ้าไม่มีรูป ส่งข้อมูลปกติ
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    }
  );

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData) => {
    const response = await fetch('/api/user/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error('Failed to change password');
    return await response.json();
  }
);

export const updateUserSettings = createAsyncThunk(
  'user/updateSettings',
  async (settings) => {
    const response = await fetch('/api/user/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return await response.json();
  }
);