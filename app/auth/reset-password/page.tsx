'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import MagneticButton from '@/components/animations/MagneticButton';
import { useAuth } from '@/hooks/useAuth';
import { Mail, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function ResetPasswordPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message || 'Failed to send reset email');
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-sm font-medium">Password reset</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Reset <span className="gradient-text">Password</span>
            </h1>
            <p className="text-xl text-muted">
              Enter your email to receive a reset link
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
                  <CheckCircle className="w-10 h-10 text-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Check Your Email</h3>
                <p className="text-muted mb-8">
                  We've sent a password reset link to <span className="text-foreground font-bold">{email}</span>
                </p>
                <Link
                  href="/auth/login"
                  className="text-purple hover:text-blue transition-colors font-bold"
                >
                  Back to sign in
                </Link>
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

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 gradient-bg rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </MagneticButton>

                <p className="text-center mt-8 text-muted">
                  Remember your password?{' '}
                  <Link
                    href="/auth/login"
                    className="text-purple hover:text-blue transition-colors font-bold"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
