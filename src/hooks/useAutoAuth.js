import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { authSuccess, logout } from '../redux/auth/authSlice';

export const useAutoAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // ตรวจสอบ token validity
        const isValid = await authService.validateToken();
        if (!isValid) {
          dispatch(logout());
          return;
        }

        // ดึงข้อมูล user
        const userData = await authService.getProfile();
        dispatch(authSuccess({ user: userData, token }));
      } catch (error) {
        dispatch(logout());
      }
    };

    initAuth();

    // ตั้ง timer สำหรับตรวจสอบ session
    const checkInterval = setInterval(async () => {
      const token = localStorage.getItem('token');
      if (token && !(await authService.validateToken())) {
        dispatch(logout());
      }
    }, 5 * 60 * 1000); // ทุก 5 นาที

    return () => clearInterval(checkInterval);
  }, [dispatch]);
};