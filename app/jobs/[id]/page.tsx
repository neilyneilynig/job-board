'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Globe,
  Zap,
  Sparkles,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock job data
const jobsData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    domain: 'google.com',
    location: 'Mountain View, CA',
    salary: '$180k - $300k',
    type: 'Full-time',
    experience: 'Senior',
    posted: '2 days ago',
    applicants: 127,
    tags: ['Go', 'Kubernetes', 'Distributed Systems', 'Cloud Infrastructure'],
    color: 'from-blue-500 to-cyan-500',
    description: 'Join Google Cloud Platform team to build next-generation infrastructure powering Google Search, YouTube, and Cloud Platform serving billions of users worldwide.',
    responsibilities: [
      'Design and implement scalable distributed systems',
      'Lead technical discussions and architecture reviews',
      'Mentor junior engineers and drive engineering excellence',
      'Collaborate with product teams to deliver features',
      'Optimize system performance and reliability',
    ],
    requirements: [
      '5+ years of software engineering experience',
      'Strong knowledge of Go, distributed systems, and cloud platforms',
      'Experience with Kubernetes and container orchestration',
      'Bachelor\'s degree in Computer Science or equivalent',
      'Excellent problem-solving and communication skills',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      '401k matching',
      'Remote work options',
      'Learning and development budget',
    ],
  },
  '2': {
    id: 2,
    title: 'Senior Product Designer',
    company: 'Figma',
    domain: 'figma.com',
    location: 'San Francisco / Remote',
    salary: '$160k - $230k',
    type: 'Full-time',
    experience: 'Senior',
    posted: '1 day ago',
    applicants: 94,
    tags: ['Design Systems', 'Prototyping', 'Figma', 'User Research'],
    color: 'from-purple-500 to-pink-500',
    description: 'Shape the future of design tools used by millions of designers worldwide. Work on core product features and design systems.',
    responsibilities: [
      'Design and ship high-quality product features',
      'Build and maintain design systems',
      'Conduct user research and usability testing',
      'Collaborate with engineering and product teams',
      'Mentor other designers',
    ],
    requirements: [
      '5+ years of product design experience',
      'Strong portfolio demonstrating design systems work',
      'Expert knowledge of Figma and design tools',
      'Experience with prototyping and user research',
      'Excellent visual and interaction design skills',
    ],
    benefits: [
      'Competitive compensation',
      'Comprehensive health benefits',
      'Flexible work arrangements',
      'Professional development budget',
      'Equity package',
      'Wellness stipend',
    ],
  },
  '3': {
    id: 3,
    title: 'Staff Frontend Engineer',
    company: 'Netflix',
    domain: 'netflix.com',
    location: 'Los Gatos, CA',
    salary: '$200k - $350k',
    type: 'Full-time',
    experience: 'Staff',
    posted: '5 days ago',
    applicants: 203,
    tags: ['React', 'TypeScript', 'Performance', 'Web'],
    color: 'from-red-500 to-orange-500',
    description: 'Build immersive streaming experiences for 230M+ subscribers globally. Work on performance optimization and new features.',
    responsibilities: [
      'Build high-performance web applications',
      'Optimize app performance for millions of users',
      'Lead frontend architecture decisions',
      'Collaborate with design and product teams',
      'Mentor engineers and raise the bar',
    ],
    requirements: [
      '8+ years of frontend engineering experience',
      'Expert in React, TypeScript, and modern web technologies',
      'Strong understanding of web performance',
      'Experience leading large-scale projects',
      'Excellent communication and leadership skills',
    ],
    benefits: [
      'Top-tier compensation and equity',
      'Premium health insurance',
      'Unlimited vacation',
      'Parental leave',
      'Learning budget',
      'Free Netflix subscription',
    ],
  },
  '4': {
    id: 4,
    title: 'ML Research Engineer',
    company: 'OpenAI',
    domain: 'openai.com',
    location: 'San Francisco, CA',
    salary: '$220k - $400k',
    type: 'Full-time',
    experience: 'Senior/Staff',
    posted: '3 days ago',
    applicants: 412,
    tags: ['Python', 'PyTorch', 'LLMs', 'Research'],
    color: 'from-green-500 to-emerald-500',
    description: 'Advance AI safety and capabilities research on frontier language models. Work on cutting-edge AI systems.',
    responsibilities: [
      'Conduct research on large language models',
      'Implement and train state-of-the-art AI models',
      'Collaborate with research and engineering teams',
      'Publish research papers and share findings',
      'Contribute to AI safety initiatives',
    ],
    requirements: [
      'PhD or equivalent experience in ML/AI',
      'Strong publication record in top conferences',
      'Expert in PyTorch and deep learning',
      'Experience with large-scale model training',
      'Passion for AI safety and alignment',
    ],
    benefits: [
      'Exceptional compensation package',
      'Comprehensive benefits',
      'Flexible work environment',
      'Research budget',
      'Conference travel',
      'Compute resources',
    ],
  },
  '5': {
    id: 5,
    title: 'Infrastructure Engineer',
    company: 'Stripe',
    domain: 'stripe.com',
    location: 'Remote',
    salary: '$175k - $280k',
    type: 'Full-time',
    experience: 'Senior',
    posted: '1 week ago',
    applicants: 156,
    tags: ['Ruby', 'AWS', 'Terraform', 'Payments'],
    color: 'from-indigo-500 to-blue-500',
    description: 'Scale payment infrastructure processing billions in transactions. Build systems that power the internet economy.',
    responsibilities: [
      'Design and maintain payment infrastructure',
      'Ensure 99.999% uptime for critical systems',
      'Implement infrastructure automation',
      'Monitor and optimize system performance',
      'On-call rotation for production systems',
    ],
    requirements: [
      '5+ years of infrastructure engineering',
      'Strong knowledge of AWS, Terraform, and IaC',
      'Experience with Ruby or similar languages',
      'Understanding of payment systems',
      'Strong debugging and problem-solving skills',
    ],
    benefits: [
      'Competitive salary and equity',
      'Full health benefits',
      'Remote-first culture',
      'Home office stipend',
      '401k match',
      'Generous PTO',
    ],
  },
};

export default function JobDetailPage() {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
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
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to jobs</span>
          </Link>
        </motion.div>

        {/* Header */}
        <div className="fade-up mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              {/* Company Logo */}
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${job.color} rounded-2xl blur-xl opacity-50`} />
                <div className="relative w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex-shrink-0 overflow-hidden p-5">
                  <Image
                    src={`https://logo.clearbit.com/${job.domain}`}
                    alt={job.company}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Title and meta */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-base text-gray-400 mb-6">
                  <span className="flex items-center gap-2 text-white font-bold">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {job.posted}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {job.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:scale-105 flex items-center gap-2">
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  <Link
                    href={`/prepare/${job.id}`}
                    className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>AI Prep Course - $4.99</span>
                  </Link>
                  <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary and Stats */}
        <div className="fade-up grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <DollarSign className="w-10 h-10 text-green-400 mb-4" />
            <div className="text-3xl font-bold mb-2">{job.salary}</div>
            <div className="text-sm text-gray-400">Salary Range</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <Users className="w-10 h-10 text-blue-400 mb-4" />
            <div className="text-3xl font-bold mb-2">{job.applicants}</div>
            <div className="text-sm text-gray-400">Applicants</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <Zap className="w-10 h-10 text-purple-400 mb-4" />
            <div className="text-3xl font-bold mb-2">{job.experience}</div>
            <div className="text-sm text-gray-400">Experience Level</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="fade-up bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4">About the role</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="fade-up bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="fade-up bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Requirements</h2>
              <ul className="space-y-4">
                {job.requirements.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="fade-up bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {job.benefits.map((item: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Sticky sidebar */}
          <div className="space-y-6">
            <div className="fade-up bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:sticky lg:top-24">
              <h3 className="font-bold mb-6 text-lg">Ready to apply?</h3>
              <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:scale-105 flex items-center justify-center gap-2 mb-3">
                <span>Apply Now</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <button className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                Save for Later
              </button>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-bold mb-4 text-sm">About {job.company}</h4>
                <a
                  href={`https://${job.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit website</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
