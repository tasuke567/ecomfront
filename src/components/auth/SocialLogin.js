// src/components/auth/SocialLogin.js
const SocialLogin = () => {
    const handleGoogleLogin = async () => {
      try {
        const response = await authService.loginWithGoogle();
        // Handle successful login
      } catch (error) {
        toast.error('Failed to login with Google');
      }
    };
  
    const handleFacebookLogin = async () => {
      try {
        const response = await authService.loginWithFacebook();
        // Handle successful login
      } catch (error) {
        toast.error('Failed to login with Facebook');
      }
    };
  
    return (
      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
  
        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5 mr-2" />
          Continue with Facebook
        </button>
      </div>
    );
  };