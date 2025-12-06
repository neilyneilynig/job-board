'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Filter,
  X,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Extended job dataset
const allJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    domain: 'google.com',
    location: 'Mountain View, CA',
    salary: '$180k - $300k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Go', 'Kubernetes', 'Distributed Systems', 'Cloud'],
    posted: '2 days ago',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Senior Product Designer',
    company: 'Figma',
    domain: 'figma.com',
    location: 'San Francisco / Remote',
    salary: '$160k - $230k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Design Systems', 'Prototyping', 'Figma', 'UI/UX'],
    posted: '1 day ago',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Staff Frontend Engineer',
    company: 'Netflix',
    domain: 'netflix.com',
    location: 'Los Gatos, CA',
    salary: '$200k - $350k',
    type: 'Full-time',
    experience: 'Staff',
    tags: ['React', 'TypeScript', 'Performance', 'Web'],
    posted: '5 days ago',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    title: 'ML Research Engineer',
    company: 'OpenAI',
    domain: 'openai.com',
    location: 'San Francisco, CA',
    salary: '$220k - $400k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Python', 'PyTorch', 'LLMs', 'Research'],
    posted: '3 days ago',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Infrastructure Engineer',
    company: 'Stripe',
    domain: 'stripe.com',
    location: 'Remote',
    salary: '$175k - $280k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Ruby', 'AWS', 'Terraform', 'Payments'],
    posted: '1 week ago',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 6,
    title: 'Senior Backend Engineer',
    company: 'Meta',
    domain: 'meta.com',
    location: 'Menlo Park, CA',
    salary: '$190k - $320k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Python', 'Scala', 'GraphQL', 'Distributed Systems'],
    posted: '4 days ago',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 7,
    title: 'Staff Security Engineer',
    company: 'GitHub',
    domain: 'github.com',
    location: 'Remote',
    salary: '$185k - $290k',
    type: 'Full-time',
    experience: 'Staff',
    tags: ['Security', 'Go', 'Kubernetes', 'Cloud'],
    posted: '2 days ago',
    color: 'from-gray-500 to-slate-500',
  },
  {
    id: 8,
    title: 'Product Designer',
    company: 'Airbnb',
    domain: 'airbnb.com',
    location: 'San Francisco / Remote',
    salary: '$140k - $200k',
    type: 'Full-time',
    experience: 'Mid',
    tags: ['UI/UX', 'Prototyping', 'Design Systems', 'Research'],
    posted: '1 week ago',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 9,
    title: 'DevOps Engineer',
    company: 'Spotify',
    domain: 'spotify.com',
    location: 'Stockholm / Remote',
    salary: '$150k - $240k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    posted: '3 days ago',
    color: 'from-green-500 to-lime-500',
  },
  {
    id: 10,
    title: 'Frontend Engineer',
    company: 'Notion',
    domain: 'notion.so',
    location: 'San Francisco / Remote',
    salary: '$155k - $250k',
    type: 'Full-time',
    experience: 'Mid',
    tags: ['React', 'TypeScript', 'Web', 'Performance'],
    posted: '5 days ago',
    color: 'from-slate-500 to-gray-500',
  },
  {
    id: 11,
    title: 'Full Stack Engineer',
    company: 'Vercel',
    domain: 'vercel.com',
    location: 'Remote',
    salary: '$160k - $260k',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['Next.js', 'React', 'Node.js', 'TypeScript'],
    posted: '2 days ago',
    color: 'from-black to-gray-600',
  },
  {
    id: 12,
    title: 'Design Engineer',
    company: 'Linear',
    domain: 'linear.app',
    location: 'Remote',
    salary: '$145k - $220k',
    type: 'Full-time',
    experience: 'Mid',
    tags: ['React', 'Design', 'TypeScript', 'UI/UX'],
    posted: '1 day ago',
    color: 'from-purple-500 to-blue-500',
  },
];

export default function JobsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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

      gsap.utils.toArray<HTMLElement>('.job-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(allJobs.flatMap((job) => job.tags)));

  // Filter jobs
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    const matchesType = selectedType ? job.type === selectedType : true;

    const matchesExperience = selectedExperience
      ? job.experience === selectedExperience
      : true;

    const matchesTags =
      selectedTags.length === 0
        ? true
        : selectedTags.some((tag) => job.tags.includes(tag));

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience &&
      matchesTags
    );
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setSelectedType('');
    setSelectedExperience('');
    setSelectedTags([]);
  };

  const hasActiveFilters =
    searchTerm || locationFilter || selectedType || selectedExperience || selectedTags.length > 0;

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="fade-up mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">{allJobs.length} open positions</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Find your next role
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Browse opportunities at world-class companies. Filter by location, experience, and skills.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="fade-up mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
            {/* Search bar */}
            <div className="grid md:grid-cols-[1fr,1fr,auto] gap-4 mb-6">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  showFilters
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-white/10 space-y-6">
                    {/* Job Type */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                        Job Type
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {['Full-time', 'Part-time', 'Contract'].map((type) => (
                          <button
                            key={type}
                            onClick={() =>
                              setSelectedType(selectedType === type ? '' : type)
                            }
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                              selectedType === type
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                        Experience Level
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {['Junior', 'Mid', 'Senior', 'Staff'].map((level) => (
                          <button
                            key={level}
                            onClick={() =>
                              setSelectedExperience(
                                selectedExperience === level ? '' : level
                              )
                            }
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                              selectedExperience === level
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Skills/Tags */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                        Skills & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {allTags.slice(0, 20).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                              selectedTags.includes(tag)
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 flex-wrap"
              >
                <span className="text-sm text-gray-400 font-medium">Active filters:</span>
                {selectedType && (
                  <span className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm flex items-center gap-2">
                    {selectedType}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-purple-300"
                      onClick={() => setSelectedType('')}
                    />
                  </span>
                )}
                {selectedExperience && (
                  <span className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm flex items-center gap-2">
                    {selectedExperience}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-purple-300"
                      onClick={() => setSelectedExperience('')}
                    />
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm flex items-center gap-2"
                  >
                    {tag}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-purple-300"
                      onClick={() => toggleTag(tag)}
                    />
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="fade-up mb-8">
          <p className="text-gray-400 text-lg">
            Showing <span className="text-white font-bold">{filteredJobs.length}</span>{' '}
            {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              className="job-card"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/jobs/${job.id}`} className="group relative block">
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

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium backdrop-blur-xl group-hover:bg-white/10 group-hover:border-white/20 transition-all"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.experience}
                          </span>
                        </div>
                        <span className="text-gray-400">Posted {job.posted}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:border-transparent transition-all">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 max-w-2xl mx-auto">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">No jobs found</h3>
              <p className="text-xl text-gray-400 mb-8">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
