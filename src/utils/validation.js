export const validateForm = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Invalid email format';
      return '';
    },
    
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      if (!/\d/.test(value)) return 'Password must contain at least one number';
      if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
      return '';
    },
    
    name: (value) => {
      if (!value) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      return '';
    }
  };