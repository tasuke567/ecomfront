// src/components/auth/EmailVerification.js
const EmailVerification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isResending, setIsResending] = useState(false);
  
    const handleVerify = async (e) => {
      e.preventDefault();
      try {
        await authService.verifyEmail(verificationCode);
        toast.success('Email verified successfully');
        navigate('/profile');
      } catch (error) {
        toast.error('Invalid verification code');
      }
    };
  
    const handleResend = async () => {
      setIsResending(true);
      try {
        await authService.resendVerification();
        toast.success('Verification email sent');
      } catch (error) {
        toast.error('Failed to send verification email');
      } finally {
        setIsResending(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p className="mb-4 text-gray-600">
          Please enter the verification code sent to your email.
        </p>
  
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Verify Email
          </button>
        </form>
  
        <button
          onClick={handleResend}
          disabled={isResending}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          {isResending ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    );
  };