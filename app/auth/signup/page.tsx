'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import MagneticButton from '@/components/animations/MagneticButton';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, User, AlertCircle, UserPlus, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { signUp, signInWithOAuth, isAuthenticated, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message || 'Failed to create account');
        return;
      }

      if (data) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        setError(error.message || 'OAuth sign up failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 py-32">
        {/* Background orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="max-w-md w-full">
          {/* Header */}
          <div className="fade-up text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple/10 to-cyan/10 border border-purple/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="text-sm font-medium">Join thousands of job seekers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Get <span className="gradient-text">Started</span>
            </h1>
            <p className="text-xl text-muted">
              Create your account and start your journey
            </p>
          </div>

          {/* Form */}
          <div className="fade-up glass backdrop-blur-2xl rounded-3xl border border-white/10 p-10">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green/20 border border-green/30 flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="w-10 h-10 text-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Account Created!</h3>
                <p className="text-muted mb-8">
                  Check your email to verify your account.
                </p>
                <p className="text-sm text-muted">Redirecting...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 py-4 bg-red/10 border border-red/30 rounded-2xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red">{error}</p>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                    <User className="w-5 h-5 text-muted" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                    Email
                  </label>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                    <Mail className="w-5 h-5 text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                    Password
                  </label>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                    <Lock className="w-5 h-5 text-muted" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                    Confirm Password
                  </label>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                    <Lock className="w-5 h-5 text-muted" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="text-sm">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 rounded accent-purple mt-0.5"
                    />
                    <span className="text-muted">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-purple hover:text-blue transition-colors"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-purple hover:text-blue transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 gradient-bg rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}

            {!success && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-sm text-muted">Or continue with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleOAuthSignup('google')}
                    className="px-6 py-4 glass backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple/30 transition-all font-medium"
                  >
                    Google
                  </button>
                  <button
                    onClick={() => handleOAuthSignup('github')}
                    className="px-6 py-4 glass backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple/30 transition-all font-medium"
                  >
                    GitHub
                  </button>
                </div>

                {/* Sign in link */}
                <p className="text-center mt-8 text-muted">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-purple hover:text-blue transition-colors font-bold"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
