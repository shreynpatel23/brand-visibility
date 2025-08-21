import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Mail, CheckCircle, RefreshCw, AlertCircle, Loader } from 'lucide-react';
import { Button } from '../components/ui/button';

const EmailVerificationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (token && !verified && !isVerifying) {
      handleTokenVerification(token);
    }
  }, [token, verified, isVerifying]);

  const handleTokenVerification = async (verificationToken: string) => {
    setIsVerifying(true);
    setError('');

    try {
      // Simulate API call for token verification
      console.log('Verifying token:', verificationToken);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful verification
      setVerified(true);
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
    } catch (error) {
      console.error('Token verification failed:', error);
      setError('Invalid or expired verification link. Please request a new one.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError('Email address is required to resend verification.');
      return;
    }

    setResending(true);
    setError('');

    try {
      // Simulate API call to resend verification email
      console.log('Resending verification email to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setError('');
    } catch (error) {
      console.error('Failed to resend email:', error);
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setResending(false);
    }
  };

  // Show verification success
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

  // Show verification in progress
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Loader className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Verifying your email...
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no email provided
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Invalid Link
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This verification link is invalid or incomplete.
            </p>
            <Button
              onClick={() => navigate('/signup')}
              className="mt-4"
            >
              Go to Signup
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show email sent confirmation (waiting for user to click link)
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
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We've sent a verification link to
          </p>
          <p className="font-medium text-gray-900 dark:text-white">{email}</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <div className="flex">
            <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Verification email sent
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  Click the verification link in your email to activate your account. 
                  If you don't see it, check your spam folder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Verification failed
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Didn't receive the email?
            </p>
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={resending}
              className="w-full"
            >
              {resending ? (
                <span className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Resend verification email
                </span>
              )}
            </Button>
          </div>

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
    </div>
  );
};

export default EmailVerificationPage;