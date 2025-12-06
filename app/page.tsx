'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }
      );

      gsap.fromTo(
        '.job-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const jobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Google', domain: 'google.com', location: 'Mountain View, CA', salary: '$180k - $300k', tags: ['Go', 'Kubernetes', 'Cloud'], color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Senior Product Designer', company: 'Figma', domain: 'figma.com', location: 'Remote', salary: '$160k - $230k', tags: ['Design Systems', 'Figma'], color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Staff Frontend Engineer', company: 'Netflix', domain: 'netflix.com', location: 'Los Gatos, CA', salary: '$200k - $350k', tags: ['React', 'TypeScript'], color: 'from-red-500 to-orange-500' },
    { id: 4, title: 'ML Research Engineer', company: 'OpenAI', domain: 'openai.com', location: 'San Francisco', salary: '$220k - $400k', tags: ['Python', 'PyTorch'], color: 'from-green-500 to-emerald-500' },
    { id: 5, title: 'Infrastructure Engineer', company: 'Stripe', domain: 'stripe.com', location: 'Remote', salary: '$175k - $280k', tags: ['Ruby', 'AWS'], color: 'from-indigo-500 to-blue-500' },
    { id: 6, title: 'Senior Backend Engineer', company: 'Meta', domain: 'meta.com', location: 'Menlo Park, CA', salary: '$190k - $320k', tags: ['Python', 'GraphQL'], color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center space-y-10">
          <div className="hero-title inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">2,847 jobs available</span>
          </div>

          <h1 className="hero-title">
            <div className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Find your
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                dream job
              </span>
            </div>
          </h1>

          <p className="hero-title text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover opportunities at world-class companies.
            <br />
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
              Get AI-powered prep courses
            </span>
            {' '}for every role.
          </p>

          <div className="hero-title flex items-center justify-center gap-4 pt-6">
            <Link
              href="/jobs"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Browse jobs</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/post-job"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all"
            >
              Post a job
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="relative max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Featured positions</h2>
            <p className="text-gray-500">Handpicked opportunities at top companies</p>
          </div>
          <Link
            href="/jobs"
            className="hidden md:inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="job-card group relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all hover:border-white/20 hover:bg-white/10 hover:scale-[1.02]">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`} />

                <div className="relative flex items-center gap-8">
                  {/* Company logo */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${job.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                    <div className="relative w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex-shrink-0 overflow-hidden p-4">
                      <Image
                        src={`https://logo.clearbit.com/${job.domain}`}
                        alt={job.company}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Job info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3 text-gray-400">
                          <span className="font-semibold text-white">{job.company}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {job.salary}
                        </div>
                        <div className="text-sm text-gray-500">per year</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium backdrop-blur-xl group-hover:bg-white/10 group-hover:border-white/20 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm font-medium backdrop-blur-xl">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        AI Prep Course
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:border-transparent transition-all">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
