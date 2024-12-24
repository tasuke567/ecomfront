import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { setUser, setLoading } from '../redux/auth/authSlice';
import toast from 'react-hot-toast';
import { LoadingButton } from '../components/common/Loading';

const Register = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 
 const [formData, setFormData] = useState({
   name: '',
   username: '',
   email: '',
   password: '',
   confirmPassword: ''
 });

 const [errors, setErrors] = useState({});
 const [isLoading, setIsLoading] = useState(false);

 const validateForm = () => {
   const newErrors = {};

   if (!formData.username.trim()) {
     newErrors.username = 'Username is required';
   } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
     newErrors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
   }

   if (!formData.name.trim()) {
     newErrors.name = 'Name is required';  
   }

   if (!formData.email.trim()) {
     newErrors.email = 'Email is required';
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
     newErrors.email = 'Invalid email format';
   }

   if (!formData.password) {
     newErrors.password = 'Password is required';
   } else if (formData.password.length < 6) {
     newErrors.password = 'Password must be at least 6 characters';
   }

   if (formData.password !== formData.confirmPassword) {
     newErrors.confirmPassword = 'Passwords do not match';
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setErrors({});

   if (!validateForm()) {
     return;
   }

   setIsLoading(true);
   dispatch(setLoading(true));

   try {
     const registrationData = {
       username: formData.username.trim(),
       name: formData.name.trim(),
       email: formData.email.toLowerCase().trim(),
       password: formData.password
     };

     const response = await authService.register(registrationData);

     if (response && response.user) {
       dispatch(setUser(response.user));
       toast.success('Registration successful!');
       navigate('/');
     } else {
       throw new Error('Invalid server response');
     }

   } catch (error) {
     console.error('Registration error:', error);
     setErrors({ submit: error.message || 'Registration failed' });
     toast.error(error.message || 'Registration failed');
   } finally {
     setIsLoading(false);
     dispatch(setLoading(false));
   }
 };

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));
   // Clear errors
   if (errors[name] || errors.submit) {
     setErrors(prev => ({
       ...prev,
       [name]: '',
       submit: ''
     }));
   }
 };

 const FieldError = ({ error }) => (
   error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null
 );

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-md w-full space-y-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Create your account
         </h2>
       </div>

       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         {errors.submit && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
             {errors.submit}
           </div>
         )}

         <div className="space-y-4">
           <div>
             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
               Username
             </label>
             <input
               id="username"
               name="username"
               type="text"
               required
               className={`appearance-none relative block w-full px-3 py-2 border ${
                 errors.username ? 'border-red-300' : 'border-gray-300'
               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
               value={formData.username}
               onChange={handleChange}
             />
             <FieldError error={errors.username} />
           </div>

           <div>
             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
               Full Name
             </label>
             <input
               id="name"
               name="name"
               type="text"
               required
               className={`appearance-none relative block w-full px-3 py-2 border ${
                 errors.name ? 'border-red-300' : 'border-gray-300'
               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
               value={formData.name}
               onChange={handleChange}
             />
             <FieldError error={errors.name} />
           </div>

           <div>
             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email
             </label>
             <input
               id="email"
               name="email"
               type="email"
               required
               className={`appearance-none relative block w-full px-3 py-2 border ${
                 errors.email ? 'border-red-300' : 'border-gray-300'
               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
               value={formData.email}
               onChange={handleChange}
             />
             <FieldError error={errors.email} />
           </div>

           <div>
             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
               Password
             </label>
             <input
               id="password"
               name="password"
               type="password"
               required
               className={`appearance-none relative block w-full px-3 py-2 border ${
                 errors.password ? 'border-red-300' : 'border-gray-300'
               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
               value={formData.password}
               onChange={handleChange}
             />
             <FieldError error={errors.password} />
           </div>

           <div>
             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
               Confirm Password
             </label>
             <input
               id="confirmPassword"
               name="confirmPassword"
               type="password"
               required
               className={`appearance-none relative block w-full px-3 py-2 border ${
                 errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
               value={formData.confirmPassword}
               onChange={handleChange}
             />
             <FieldError error={errors.confirmPassword} />
           </div>
         </div>

         <div>
           <LoadingButton
             type="submit"
             isLoading={isLoading}
           >
             Create Account
           </LoadingButton>
         </div>

         <div className="text-sm text-center">
           <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
             Already have an account? Sign in
           </Link>
         </div>
       </form>
     </div>
   </div>
 );
};

export default Register;