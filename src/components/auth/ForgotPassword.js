// src/components/auth/ForgotPassword.js
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('request'); // 'request' or 'reset'
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
    const handleRequestReset = async (e) => {
      e.preventDefault();
      try {
        await authService.requestPasswordReset(email);
        setStep('reset');
        toast.success('Reset instructions sent to your email');
      } catch (error) {
        toast.error('Email not found');
      }
    };
  
    const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
        await authService.resetPassword(resetToken, newPassword);
        toast.success('Password reset successfully');
        navigate('/login');
      } catch (error) {
        toast.error('Invalid or expired reset token');
      }
    };
  
    if (step === 'request') {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
          <form onSubmit={handleRequestReset}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send Reset Instructions
            </button>
          </form>
        </div>
      );
    }
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Create New Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reset Code</label>
            <input
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    );
  };