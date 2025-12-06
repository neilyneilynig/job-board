'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import MagneticButton from '@/components/animations/MagneticButton';
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Plus,
  X,
  Eye,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface FormData {
  title: string;
  company: string;
  companyDomain: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  jobType: string;
  experienceLevel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  remote: boolean;
}

export default function PostJobPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    title: '',
    company: '',
    companyDomain: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    tags: [],
    remote: false,
  });

  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
  const [tagInput, setTagInput] = useState('');

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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Job title is required';
      if (!formData.company.trim()) newErrors.company = 'Company name is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    if (step === 2) {
      if (!formData.description.trim())
        newErrors.description = 'Job description is required';
      if (formData.responsibilities.filter((r) => r.trim()).length === 0)
        newErrors.responsibilities = 'At least one responsibility is required';
      if (formData.requirements.filter((r) => r.trim()).length === 0)
        newErrors.requirements = 'At least one requirement is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const addItem = (
    type: 'responsibilities' | 'requirements' | 'benefits',
    value: string,
    setter: (val: string) => void
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type].filter((item) => item.trim()), value.trim()],
      }));
      setter('');
    }
  };

  const removeItem = (
    type: 'responsibilities' | 'requirements' | 'benefits',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // In production, this would submit to Supabase
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success and redirect
      alert('Job posted successfully!');
      router.push('/jobs');
    } catch (error) {
      alert('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Briefcase },
    { number: 2, title: 'Details', icon: Building2 },
    { number: 3, title: 'Review', icon: Eye },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Navbar />

      <div className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="fade-up mb-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple/10 to-blue/10 border border-purple/20 backdrop-blur-sm mb-10">
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="text-sm font-medium">Post a new opportunity</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Post a <span className="gradient-text">Job</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Share your opportunity with thousands of talented professionals
            </p>
          </div>

          {/* Progress Steps */}
          <div className="fade-up mb-16">
            <div className="flex items-center justify-center gap-4">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    disabled={step.number > currentStep && !validateStep(currentStep)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                      currentStep === step.number
                        ? 'gradient-bg'
                        : currentStep > step.number
                        ? 'glass backdrop-blur-xl border border-green/30'
                        : 'glass backdrop-blur-xl border border-white/10 opacity-50'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                    <span className="font-bold hidden md:block">{step.title}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-white/20 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="fade-up">
            <div className="glass backdrop-blur-2xl rounded-3xl border border-white/10 p-10 md:p-16">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold mb-10">Basic Information</h2>

                    {/* Job Title */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                      />
                      {errors.title && (
                        <p className="text-red text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="e.g. Google"
                          className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        {errors.company && (
                          <p className="text-red text-sm mt-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Company Domain
                        </label>
                        <input
                          type="text"
                          value={formData.companyDomain}
                          onChange={(e) =>
                            setFormData({ ...formData, companyDomain: e.target.value })
                          }
                          placeholder="e.g. google.com"
                          className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        <p className="text-xs text-muted mt-2">
                          Used to fetch company logo automatically
                        </p>
                      </div>
                    </div>

                    {/* Location & Remote */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Location *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="e.g. San Francisco, CA or Remote"
                          className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        {errors.location && (
                          <p className="text-red text-sm mt-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.location}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Remote Work
                        </label>
                        <label className="flex items-center gap-4 px-6 py-5 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:border-purple/30 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.remote}
                            onChange={(e) =>
                              setFormData({ ...formData, remote: e.target.checked })
                            }
                            className="w-5 h-5 rounded accent-purple"
                          />
                          <span>Remote position available</span>
                        </label>
                      </div>
                    </div>

                    {/* Salary Range */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Salary Range (USD)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 px-6 py-5 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                          <DollarSign className="w-5 h-5 text-green" />
                          <input
                            type="number"
                            value={formData.salaryMin}
                            onChange={(e) =>
                              setFormData({ ...formData, salaryMin: e.target.value })
                            }
                            placeholder="Min"
                            className="flex-1 bg-transparent outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3 px-6 py-5 bg-white/5 rounded-2xl border border-white/10 focus-within:border-purple/50 transition-colors">
                          <DollarSign className="w-5 h-5 text-green" />
                          <input
                            type="number"
                            value={formData.salaryMax}
                            onChange={(e) =>
                              setFormData({ ...formData, salaryMax: e.target.value })
                            }
                            placeholder="Max"
                            className="flex-1 bg-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Job Type & Experience */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Job Type
                        </label>
                        <select
                          value={formData.jobType}
                          onChange={(e) =>
                            setFormData({ ...formData, jobType: e.target.value })
                          }
                          className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors cursor-pointer"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                          Experience Level
                        </label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) =>
                            setFormData({ ...formData, experienceLevel: e.target.value })
                          }
                          className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors cursor-pointer"
                        >
                          <option value="Junior">Junior</option>
                          <option value="Mid">Mid</option>
                          <option value="Senior">Senior</option>
                          <option value="Staff">Staff</option>
                          <option value="Principal">Principal</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold mb-10">Job Details</h2>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Job Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Describe the role, team, and what makes it exciting..."
                        rows={6}
                        className="w-full px-6 py-5 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors resize-none"
                      />
                      {errors.description && (
                        <p className="text-red text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Responsibilities *
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={responsibilityInput}
                          onChange={(e) => setResponsibilityInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addItem('responsibilities', responsibilityInput, setResponsibilityInput);
                            }
                          }}
                          placeholder="Add a responsibility and press Enter"
                          className="flex-1 px-6 py-4 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        <button
                          onClick={() =>
                            addItem('responsibilities', responsibilityInput, setResponsibilityInput)
                          }
                          className="px-6 py-4 gradient-bg rounded-2xl font-bold hover:shadow-lg transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.responsibilities.filter((r) => r.trim()).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 px-6 py-4 glass backdrop-blur-xl rounded-xl border border-white/10 group"
                          >
                            <span className="flex-1">{item}</span>
                            <button
                              onClick={() => removeItem('responsibilities', idx)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 hover:text-red" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {errors.responsibilities && (
                        <p className="text-red text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.responsibilities}
                        </p>
                      )}
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Requirements *
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={requirementInput}
                          onChange={(e) => setRequirementInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addItem('requirements', requirementInput, setRequirementInput);
                            }
                          }}
                          placeholder="Add a requirement and press Enter"
                          className="flex-1 px-6 py-4 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        <button
                          onClick={() =>
                            addItem('requirements', requirementInput, setRequirementInput)
                          }
                          className="px-6 py-4 gradient-bg rounded-2xl font-bold hover:shadow-lg transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.requirements.filter((r) => r.trim()).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 px-6 py-4 glass backdrop-blur-xl rounded-xl border border-white/10 group"
                          >
                            <span className="flex-1">{item}</span>
                            <button
                              onClick={() => removeItem('requirements', idx)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 hover:text-red" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {errors.requirements && (
                        <p className="text-red text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.requirements}
                        </p>
                      )}
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Benefits
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={benefitInput}
                          onChange={(e) => setBenefitInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addItem('benefits', benefitInput, setBenefitInput);
                            }
                          }}
                          placeholder="Add a benefit and press Enter"
                          className="flex-1 px-6 py-4 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        <button
                          onClick={() => addItem('benefits', benefitInput, setBenefitInput)}
                          className="px-6 py-4 gradient-bg rounded-2xl font-bold hover:shadow-lg transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.benefits.filter((b) => b.trim()).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 px-6 py-4 glass backdrop-blur-xl rounded-xl border border-white/10 group"
                          >
                            <span className="flex-1">{item}</span>
                            <button
                              onClick={() => removeItem('benefits', idx)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 hover:text-red" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted">
                        Skills & Technologies
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="Add skills, technologies, tools..."
                          className="flex-1 px-6 py-4 bg-white/5 rounded-2xl outline-none border border-white/10 focus:border-purple/50 transition-colors"
                        />
                        <button
                          onClick={addTag}
                          className="px-6 py-4 gradient-bg rounded-2xl font-bold hover:shadow-lg transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {formData.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 glass backdrop-blur-xl rounded-xl border border-white/10 flex items-center gap-3 group hover:border-purple/30 transition-colors"
                          >
                            {tag}
                            <button onClick={() => removeTag(tag)}>
                              <X className="w-4 h-4 opacity-50 group-hover:opacity-100 hover:text-red transition-all" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold mb-10">Review & Publish</h2>

                    <div className="space-y-6">
                      <div className="glass backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h3 className="text-2xl font-bold mb-6">{formData.title}</h3>
                        <div className="space-y-4 text-muted">
                          <p className="flex items-center gap-3">
                            <Building2 className="w-5 h-5" />
                            {formData.company}
                          </p>
                          <p className="flex items-center gap-3">
                            <MapPin className="w-5 h-5" />
                            {formData.location}
                            {formData.remote && ' • Remote'}
                          </p>
                          <p className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5" />
                            {formData.jobType} • {formData.experienceLevel}
                          </p>
                          {(formData.salaryMin || formData.salaryMax) && (
                            <p className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-green" />
                              <span className="font-bold text-foreground">
                                ${formData.salaryMin}k - ${formData.salaryMax}k
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="glass backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h4 className="font-bold mb-4">Description</h4>
                        <p className="text-muted leading-relaxed">{formData.description}</p>
                      </div>

                      {formData.responsibilities.filter((r) => r.trim()).length > 0 && (
                        <div className="glass backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                          <h4 className="font-bold mb-4">Responsibilities</h4>
                          <ul className="space-y-2">
                            {formData.responsibilities
                              .filter((r) => r.trim())
                              .map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-muted">
                                  <Check className="w-5 h-5 text-purple flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {formData.requirements.filter((r) => r.trim()).length > 0 && (
                        <div className="glass backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                          <h4 className="font-bold mb-4">Requirements</h4>
                          <ul className="space-y-2">
                            {formData.requirements
                              .filter((r) => r.trim())
                              .map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-muted">
                                  <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {formData.tags.length > 0 && (
                        <div className="glass backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                          <h4 className="font-bold mb-4">Skills & Technologies</h4>
                          <div className="flex flex-wrap gap-3">
                            {formData.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-4 py-2 rounded-xl glass backdrop-blur-xl border border-white/10 text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/10">
                {currentStep > 1 ? (
                  <MagneticButton>
                    <button
                      onClick={handleBack}
                      className="px-8 py-4 glass backdrop-blur-xl rounded-2xl font-bold border border-white/10 hover:border-purple/30 transition-colors"
                    >
                      Back
                    </button>
                  </MagneticButton>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <MagneticButton>
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 gradient-bg rounded-2xl font-bold hover:shadow-xl hover:shadow-purple/50 transition-all"
                    >
                      Next Step
                    </button>
                  </MagneticButton>
                ) : (
                  <MagneticButton>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-4 gradient-bg rounded-2xl font-bold hover:shadow-xl hover:shadow-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Job'}
                    </button>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
