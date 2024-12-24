// src/pages/Login.js
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authStart, authSuccess, authFailure } from '../redux/auth/authSlice';
import { authService } from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginError, setLoginError] = useState('');
  const { loading, error: authError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear any previous errors
    try {
      dispatch(authStart());
      const response = await authService.login(formData);
      dispatch(authSuccess(response.user));

      // Redirect to the page user tried to visit or default to home
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(authFailure(error.message));
      loginError(error.response?.data?.message || 'Login failed');
    }
  };


  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      dispatch(authStart());
      console.log('Google login attempt with credential:', credentialResponse);
  
      const response = await authService.googleLogin(credentialResponse.credential);
      console.log('Login response:', response);
  
      if (response.message === 'Google login successful' && response.user) {
        // Store token if you're using token-based auth
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
  
        dispatch(authSuccess(response.user));
  
        // Navigate after successful login
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
  
        toast.success('Successfully logged in with Google');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Google login error:', error);
      dispatch(authFailure(error.message));
      toast.error(error.response?.data?.message || 'Failed to login with Google');
    }
  }, [dispatch, navigate, location.state]);


   const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error('Google login failed');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {/* Regular login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {authError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {authError}
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
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Don't have an account? Register
            </Link>
          </div>
        </form>


        {/* Social Login Buttons */}
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
          <button
          onClick={() => login()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with Google
        </button>
          {loginError && (
            <div className="mt-2 text-red-600 text-sm text-center">
              {loginError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;