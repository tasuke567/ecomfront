import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authStart, authSuccess, authFailure } from '../redux/auth/authSlice';
import { authService } from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import LoadingButton from './../components/common/LoadingButton';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginError, setLoginError] = useState('');
  const { loading: isLoading, error: authError } = useSelector((state) => state.auth); // แก้ไขการ destructuring

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (loginError) setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear any previous errors
    
    try {
      dispatch(authStart());
      
      const response = await authService.login(formData);
      
      if (response?.user) {
        dispatch(authSuccess(response.user));
        toast.success('Login successful!');
        
        // Redirect to the page user tried to visit or default to home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(authFailure(error.message));
      setLoginError(error.message || 'Login failed');
      toast.error(error.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      dispatch(authStart());
      console.log('Google login attempt with credential:', credentialResponse);

      const response = await authService.googleLogin(credentialResponse.credential);
      console.log('Login response:', response);

      if (response.message === 'Google login successful' && response.user) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        dispatch(authSuccess(response.user));
        toast.success('Successfully logged in with Google');

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Google login error:', error);
      dispatch(authFailure(error.message));
      toast.error(error.message || 'Failed to login with Google');
    }
  }, [dispatch, navigate, location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(loginError || authError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {loginError || authError}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </LoadingButton>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Don't have an account? Register
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error('Google login failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;