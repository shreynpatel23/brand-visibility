import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Mail, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const EmailVerificationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !verified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, verified]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call for verification
      console.log('Verifying code:', verificationCode);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful verification
      if (verificationCode === '123456' || verificationCode.length === 6) {
        setVerified(true);
        setTimeout(() => {
          navigate('/onboarding');
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');

    try {
      // Simulate API call to resend code
      console.log('Resending verification code to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimeLeft(300); // Reset timer
      setVerificationCode('');
    } catch (error) {
      console.error('Failed to resend code:', error);
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your email has been successfully verified. Redirecting to onboarding...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center">
              <Building2 className="h-12 w-12 text-primary" />
              <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">BrandViz</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium text-gray-900 dark:text-white">{email}</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <div className="flex">
            <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Check your email
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  Enter the 6-digit code we sent to your email address. If you don't see it, check your spam folder.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verification Code
            </label>
            <Input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              placeholder="Enter 6-digit code"
              className="text-center text-lg tracking-widest"
              maxLength={6}
              autoComplete="one-time-code"
            />
            {error && (
              <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              {timeLeft > 0 ? (
                <span>Code expires in {formatTime(timeLeft)}</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Code expired</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resending || timeLeft > 240} // Allow resend after 1 minute
              className="text-primary hover:text-primary/80 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {resending ? (
                <span className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Resend code'
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading || verificationCode.length !== 6 || timeLeft === 0}
            className="w-full"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wrong email address?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Go back to signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;