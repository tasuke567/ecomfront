// src/components/profile/GoogleConnect.js
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile} from '../../redux/auth/authSlice'

const GoogleConnect = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // ดึงข้อมูลโปรไฟล์จาก Google
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const userInfo = await response.json();
        console.log(userInfo);
        // อัพเดทข้อมูลผู้ใช้ด้วยข้อมูลจาก Google
        dispatch(updateProfile({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        }));

        toast.success('Google profile connected successfully');
      } catch (error) {
        toast.error('Failed to connect Google profile');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error('Failed to connect with Google');
    }
  });

  return (
    <button
      onClick={() => googleLogin()}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
      {loading ? 'Connecting...' : 'Import Google Profile'}
    </button>
  );
};

export default GoogleConnect;