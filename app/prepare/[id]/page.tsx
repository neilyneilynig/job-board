'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
  Code,
  Award,
  Unlock,
} from 'lucide-react';

// Mock job data
const jobsData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    tags: ['Go', 'Kubernetes', 'Distributed Systems'],
  },
  '2': {
    id: 2,
    title: 'Senior Product Designer',
    company: 'Figma',
    tags: ['Design Systems', 'Prototyping', 'Figma'],
  },
  '3': {
    id: 3,
    title: 'Staff Frontend Engineer',
    company: 'Netflix',
    tags: ['React', 'TypeScript', 'Performance'],
  },
  '4': {
    id: 4,
    title: 'ML Research Engineer',
    company: 'OpenAI',
    tags: ['Python', 'PyTorch', 'LLMs'],
  },
  '5': {
    id: 5,
    title: 'Infrastructure Engineer',
    company: 'Stripe',
    tags: ['Ruby', 'AWS', 'Terraform'],
  },
};

export default function PreparePage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const job = jobsData[params.id as string] || jobsData['1'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const courseModules = [
    {
      title: 'Foundations & Prerequisites',
      duration: '3 hours',
      lessons: 8,
      icon: BookOpen,
      topics: [
        'Understanding the role requirements',
        'Industry standards and best practices',
        'Essential tools and technologies',
        'Setting up your development environment',
      ],
    },
    {
      title: 'Core Technical Skills',
      duration: '8 hours',
      lessons: 15,
      icon: Code,
      topics: [
        'Deep dive into required technologies',
        'Hands-on coding challenges',
        'Building real-world projects',
        'Code review best practices',
      ],
    },
    {
      title: 'Interview Preparation',
      duration: '5 hours',
      lessons: 12,
      icon: Target,
      topics: [
        'Common interview questions',
        'System design exercises',
        'Behavioral interview prep',
        'Mock interview sessions',
      ],
    },
    {
      title: 'Portfolio & Resume',
      duration: '2 hours',
      lessons: 6,
      icon: Award,
      topics: [
        'Crafting the perfect resume',
        'Building standout portfolio projects',
        'GitHub profile optimization',
        'LinkedIn strategies',
      ],
    },
  ];

  const benefits = [
    'AI-personalized learning path based on your experience',
    'Interactive coding challenges and projects',
    'Real interview questions from actual candidates',
    'Resume and portfolio review',
    'Progress tracking and milestone celebrations',
    'Certificate of completion',
    'Lifetime access to course materials',
    'Community access for support',
  ];

  const handlePurchase = () => {
    setIsPurchased(true);
    setTimeout(() => {
      router.push(`/course/${job.id}`);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to job</span>
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="fade-up mb-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI-Powered Career Preparation</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
                Prepare for
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                {job.title}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Get a personalized, AI-generated course designed specifically for landing this role at{' '}
              <span className="text-white font-bold">{job.company}</span>
            </p>

            <div className="flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>18 hours total</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>41 lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Certificate included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="fade-up mb-24">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-purple-500/30 p-12 text-center">
                <div className="text-7xl font-black mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    $4.99
                  </span>
                </div>

                <p className="text-xl text-gray-400 mb-10">
                  One-time payment · Lifetime access
                </p>

                <button
                  onClick={handlePurchase}
                  disabled={isPurchased}
                  className="w-full px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isPurchased ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Purchased! Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-6 h-6" />
                      <span>Start Your Preparation</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 mt-6">
                  30-day money-back guarantee · Secure payment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="fade-up mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">What You'll </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Learn</span>
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive curriculum tailored to this specific role
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {courseModules.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-purple-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-purple-500/30">
                    <module.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{module.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {module.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="fade-up mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">Everything </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Included</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex items-start gap-4"
              >
                <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="fade-up text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-16 max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of professionals who prepared with our AI-powered courses
            </p>
            <button
              onClick={handlePurchase}
              disabled={isPurchased}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:scale-105 disabled:opacity-50"
            >
              {isPurchased ? 'Purchased!' : 'Get Started for $4.99'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
