'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import MagneticButton from '@/components/animations/MagneticButton';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, AlertCircle, LogIn, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { signIn, signInWithOAuth, isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    setIsSubmitting(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setError(error.message || 'Invalid email or password');
        return;
      }

      if (data) {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        setError(error.message || 'OAuth sign in failed');
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="max-w-md w-full">
          {/* Header */}
          <div className="fade-up text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple/10 to-blue/10 border border-purple/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="text-sm font-medium">Welcome back</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Sign <span className="gradient-text">In</span>
            </h1>
            <p className="text-xl text-muted">
              Continue your journey to your dream role
            </p>
          </div>

          {/* Form */}
          <div className="fade-up glass backdrop-blur-2xl rounded-3xl border border-white/10 p-10">
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
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-purple" />
                  <span className="text-muted">Remember me</span>
                </label>
                <Link
                  href="/auth/reset-password"
                  className="text-purple hover:text-blue transition-colors"
                >
                  Forgot password?
                </Link>
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
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-muted">Or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleOAuthLogin('google')}
                className="px-6 py-4 glass backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple/30 transition-all font-medium"
              >
                Google
              </button>
              <button
                onClick={() => handleOAuthLogin('github')}
                className="px-6 py-4 glass backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple/30 transition-all font-medium"
              >
                GitHub
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center mt-8 text-muted">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-purple hover:text-blue transition-colors font-bold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
