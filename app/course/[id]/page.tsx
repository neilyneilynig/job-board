'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import MagneticButton from '@/components/animations/MagneticButton';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Lock,
  Play,
  BookOpen,
  Code,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const jobsData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    domain: 'google.com',
  },
  // ... other jobs
};

export default function CoursePage() {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showCode, setShowCode] = useState(false);
  const job = jobsData[params.id as string] || jobsData['1'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentLesson]);

  const modules = [
    {
      id: 0,
      title: 'Module 1: Foundations',
      icon: BookOpen,
      lessons: [
        {
          id: 0,
          title: 'Understanding the Role',
          duration: '15 min',
          type: 'video',
          content: `Welcome to your personalized preparation course for ${job.title} at ${job.company}!

In this lesson, we'll break down exactly what this role entails and what makes a successful candidate.

## Key Responsibilities

As a ${job.title}, you'll be expected to:

1. **Lead technical initiatives** - Drive projects from conception to deployment
2. **Collaborate across teams** - Work with product, design, and other engineers
3. **Mentor junior developers** - Help grow the team's technical capabilities
4. **Make architectural decisions** - Choose the right tools and patterns

## What ${job.company} Looks For

${job.company} specifically values:
- Strong technical fundamentals
- Problem-solving ability
- Communication skills
- Cultural fit and collaboration

## Your Learning Path

Over the next 18 hours, you'll:
- Master the required technical skills
- Build portfolio projects
- Practice interview questions
- Perfect your resume and application

Let's get started! 🚀`,
        },
        {
          id: 1,
          title: 'Industry Standards',
          duration: '20 min',
          type: 'reading',
          content: `Understanding industry standards is crucial for success in this role.

## Current Trends in the Industry

The tech industry is constantly evolving. Here are the key trends you need to know:

### 1. Cloud-Native Development
Modern applications are built for the cloud from day one. Understanding containerization, orchestration, and cloud services is essential.

### 2. Microservices Architecture
Monolithic applications are giving way to microservices, enabling better scalability and team autonomy.

### 3. DevOps Culture
The line between development and operations is blurring. You'll need to understand CI/CD, monitoring, and infrastructure as code.

### 4. AI/ML Integration
Even if you're not an ML engineer, understanding how to integrate AI capabilities is becoming table stakes.

## Best Practices at ${job.company}

Based on insights from current employees:
- Code reviews are thorough and constructive
- Testing is non-negotiable
- Documentation is valued
- Performance matters

Take your time with this material - understanding the broader context will help you succeed!`,
        },
        {
          id: 2,
          title: 'Tools & Technologies',
          duration: '25 min',
          type: 'interactive',
          content: `Let's explore the essential tools you'll use in this role.

## Core Technologies

Based on the job requirements, here are the must-know technologies:

### Programming Languages
- Primary: Go, Python
- Secondary: TypeScript, Java

### Frameworks & Libraries
- Cloud: AWS, GCP, Kubernetes
- Data: PostgreSQL, Redis, Kafka
- Monitoring: Prometheus, Grafana

## Setting Up Your Environment

We'll walk through setting up a professional development environment that mirrors what you'll use at ${job.company}.

### Exercise: Environment Setup

Follow these steps to set up your local environment:

1. Install the required languages and tools
2. Configure your IDE with recommended extensions
3. Set up version control and Git workflows
4. Create a sample project structure

This foundation will serve you throughout the course and in your actual role.`,
        },
      ],
    },
    {
      id: 1,
      title: 'Module 2: Technical Skills',
      icon: Code,
      lessons: [
        {
          id: 3,
          title: 'Core Concepts Deep Dive',
          duration: '45 min',
          type: 'video',
          content: `Now we're getting into the technical meat of the course!

## Distributed Systems Fundamentals

Understanding how to build systems that scale is critical for this role.

### Key Concepts

1. **Consistency vs Availability**
   - CAP theorem and its practical implications
   - Eventual consistency patterns
   - When to choose what

2. **Partitioning & Sharding**
   - Horizontal vs vertical scaling
   - Consistent hashing
   - Data locality considerations

3. **Load Balancing**
   - Layer 4 vs Layer 7 load balancing
   - Health checks and circuit breakers
   - Geographic distribution

### Real-World Example

Let's say you're building a feature that needs to serve millions of users...

[Interactive diagram would appear here]

## Challenge: Design a Scalable System

Design a system that can handle 1M requests per second. Consider:
- Data storage strategy
- Caching approach
- Load distribution
- Failure scenarios

Take 15-20 minutes to sketch your approach before moving to the next lesson.`,
        },
        {
          id: 4,
          title: 'Hands-On Coding Challenge',
          duration: '60 min',
          type: 'coding',
          content: `Time to write some code!

## Challenge: Build a Rate Limiter

Implement a distributed rate limiter that can handle:
- 100 requests per user per minute
- Multiple servers
- High throughput

### Requirements:
- Must be thread-safe
- Should use Redis for distributed state
- Include monitoring and metrics
- Write comprehensive tests

### Starter Code:

\`\`\`go
package ratelimiter

import (
    "context"
    "time"
)

type RateLimiter interface {
    Allow(ctx context.Context, userID string) (bool, error)
}

// Implement this interface
type DistributedRateLimiter struct {
    // Your implementation here
}

func NewRateLimiter(redisAddr string) *DistributedRateLimiter {
    // Initialize your rate limiter
    return &DistributedRateLimiter{}
}

func (rl *DistributedRateLimiter) Allow(ctx context.Context, userID string) (bool, error) {
    // Your implementation here
    return false, nil
}
\`\`\`

### Testing Your Solution:

Run the provided test suite to validate your implementation:

\`\`\`bash
go test -v ./...
\`\`\`

Take your time with this - it's a common interview question!`,
        },
      ],
    },
    {
      id: 2,
      title: 'Module 3: Interview Prep',
      icon: Target,
      lessons: [
        {
          id: 5,
          title: 'Common Interview Questions',
          duration: '30 min',
          type: 'reading',
          content: `Let's prepare you for the actual interview!

## Technical Interview Questions

These questions have been asked at ${job.company} in recent interviews:

### System Design Questions

1. **Design a URL Shortener**
   - Requirements gathering
   - Scale estimation
   - API design
   - Data model
   - Caching strategy

2. **Design a Distributed Cache**
   - Consistency requirements
   - Eviction policies
   - Network topology
   - Failure handling

### Coding Questions

Practice these leetcode-style questions:
- Two Sum variations
- Design data structures
- Tree/graph traversals
- Dynamic programming

### How to Approach Problems

1. **Clarify requirements** - Ask questions!
2. **Think out loud** - Share your thought process
3. **Start simple** - Get something working first
4. **Optimize iteratively** - Improve step by step
5. **Consider edge cases** - Show thoroughness

## Behavioral Questions

${job.company} also values cultural fit. Prepare stories for:

- Tell me about a time you disagreed with a colleague
- Describe your biggest technical failure
- How do you prioritize competing demands?
- Why ${job.company}?

Use the STAR method: Situation, Task, Action, Result.`,
        },
        {
          id: 6,
          title: 'Mock Interview',
          duration: '90 min',
          type: 'interactive',
          content: `Time for a realistic interview simulation!

## System Design Mock Interview

You'll have 45 minutes to design: **A Real-Time Collaboration System**

Think Google Docs or Figma - multiple users editing simultaneously.

### Requirements:
- Real-time updates across clients
- Conflict resolution
- Offline support
- 10M+ concurrent users

### Interview Format:

1. **Requirements (5 min)**
   - What questions would you ask?
   - What assumptions would you make?

2. **High-Level Design (15 min)**
   - Draw the architecture
   - Identify key components
   - Explain data flow

3. **Deep Dive (20 min)**
   - Pick one component to detail
   - Discuss trade-offs
   - Consider failure scenarios

4. **Questions (5 min)**
   - Ask about the team/role

### Evaluation Criteria:
- Structured thinking
- Technical depth
- Communication clarity
- Trade-off analysis

[Start mock interview timer]

Ready? Let's begin! Remember to think out loud and explain your reasoning.`,
        },
      ],
    },
    {
      id: 3,
      title: 'Module 4: Application Materials',
      icon: Award,
      lessons: [
        {
          id: 7,
          title: 'Resume Optimization',
          duration: '30 min',
          type: 'interactive',
          content: `Let's craft a resume that gets you to the interview stage!

## What ${job.company} Recruiters Look For

Based on data from successful hires:

### Must-Haves:
- Clear, quantifiable impact
- Relevant technical skills
- Progressive responsibility
- Strong education/credentials

### Format Tips:

**DO:**
- Use action verbs (Built, Led, Scaled)
- Quantify achievements (Reduced latency by 40%)
- Tailor to the specific role
- Keep it to 1-2 pages

**DON'T:**
- Use buzzwords without substance
- Include irrelevant experience
- Have typos or formatting issues
- Exceed 2 pages

## Your Resume Action Items:

1. **Headline**: Craft a compelling one-liner
2. **Experience**: Rewrite bullets with impact
3. **Projects**: Highlight relevant work
4. **Skills**: Match job requirements

### Example Transformation:

**Before:**
"Worked on backend systems and APIs"

**After:**
"Designed and implemented RESTful APIs serving 50M+ requests/day, reducing latency by 35% through caching and query optimization"

See the difference? Specific, quantified, impactful!

## Exercise:

Upload your current resume and get AI-powered feedback on:
- Content relevance
- Impact quantification
- Keyword optimization
- Format and readability

[Upload resume button]`,
        },
        {
          id: 8,
          title: 'Portfolio Projects',
          duration: '45 min',
          type: 'reading',
          content: `Strong portfolio projects can set you apart from other candidates.

## Building Standout Projects

For a ${job.title} role, your projects should demonstrate:

### 1. Technical Depth
Build something that shows mastery of core concepts:
- Distributed systems
- High-performance code
- Complex algorithms
- System architecture

### 2. Real-World Applicability
Solve actual problems:
- Open source contributions
- Side projects with users
- Tools that others find useful

### 3. Clean Code
Show engineering maturity:
- Well-tested code
- Clear documentation
- Thoughtful architecture
- Production-ready quality

## Project Ideas for This Role:

1. **Distributed Task Queue**
   - Build a Redis-backed task queue
   - Support priority scheduling
   - Include monitoring dashboard
   - Handle failure scenarios

2. **Real-Time Analytics Pipeline**
   - Stream processing with Kafka
   - Time-series database
   - Visualization layer
   - Scale to handle 100k events/sec

3. **API Gateway**
   - Request routing and transformation
   - Rate limiting and auth
   - Circuit breakers
   - Performance monitoring

## GitHub Profile Optimization

Your GitHub profile is often the first thing hiring managers see:

- Pin your best projects
- Write clear README files
- Show consistent activity
- Contribute to popular projects

Remember: Quality over quantity. One stellar project beats ten mediocre ones!`,
        },
      ],
    },
  ];

  const allLessons = modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLesson];
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const completeLesson = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-[400px,1fr] gap-10">
            {/* Sidebar - Course Outline */}
            <div className="space-y-8">
              {/* Progress */}
              <div className="fade-in glass backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={`https://logo.clearbit.com/${job.domain}`}
                    alt={job.company}
                    width={48}
                    height={48}
                    className="rounded-xl"
                    unoptimized
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-muted mb-1">{job.company}</div>
                    <div className="font-bold text-lg truncate">{job.title}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Your Progress</span>
                    <span className="text-sm font-bold text-purple">{progress}%</span>
                  </div>
                  <div className="h-3 rounded-full glass overflow-hidden">
                    <motion.div
                      className="h-full gradient-bg"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-sm text-muted">
                    {completedLessons.length} of {allLessons.length} lessons completed
                  </div>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {modules.map((module, modIdx) => (
                  <div key={module.id} className="fade-in">
                    <div className="glass backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden">
                      <div className="p-6 flex items-center gap-4 border-b border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center">
                          <module.icon className="w-6 h-6 text-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm">{module.title}</div>
                          <div className="text-xs text-muted">{module.lessons.length} lessons</div>
                        </div>
                      </div>

                      <div className="p-3 space-y-2">
                        {module.lessons.map((lesson) => {
                          const isCompleted = completedLessons.includes(lesson.id);
                          const isCurrent = currentLesson === lesson.id;
                          const isLocked = lesson.id > 0 && !completedLessons.includes(lesson.id - 1);

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !isLocked && setCurrentLesson(lesson.id)}
                              disabled={isLocked}
                              className={`w-full text-left px-4 py-3 rounded-xl transition-all group ${
                                isCurrent
                                  ? 'glass border border-purple/30 bg-purple/10'
                                  : isCompleted
                                  ? 'hover:glass'
                                  : isLocked
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:glass'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0" />
                                ) : isLocked ? (
                                  <Lock className="w-5 h-5 text-muted flex-shrink-0" />
                                ) : isCurrent ? (
                                  <Play className="w-5 h-5 text-purple flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">{lesson.title}</div>
                                  <div className="text-xs text-muted">{lesson.duration}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="fade-in">
              <div className="glass backdrop-blur-2xl rounded-3xl border border-white/10 p-12 min-h-[800px]">
                {/* Lesson Header */}
                <div className="mb-12 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    {currentLessonData.type === 'video' && (
                      <div className="px-4 py-2 rounded-xl glass text-sm font-medium flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        <span>Video</span>
                      </div>
                    )}
                    {currentLessonData.type === 'reading' && (
                      <div className="px-4 py-2 rounded-xl glass text-sm font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Reading</span>
                      </div>
                    )}
                    {currentLessonData.type === 'coding' && (
                      <div className="px-4 py-2 rounded-xl glass text-sm font-medium flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span>Coding Challenge</span>
                      </div>
                    )}
                    {currentLessonData.type === 'interactive' && (
                      <div className="px-4 py-2 rounded-xl glass text-sm font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow fill-yellow" />
                        <span>Interactive</span>
                      </div>
                    )}
                    <div className="text-sm text-muted">{currentLessonData.duration}</div>
                  </div>

                  <h1 className="text-5xl font-black mb-4 leading-tight">
                    {currentLessonData.title}
                  </h1>
                </div>

                {/* Lesson Content */}
                <div className="prose prose-invert prose-lg max-w-none mb-12">
                  <div className="text-muted leading-relaxed whitespace-pre-wrap text-lg space-y-6">
                    {currentLessonData.content}
                  </div>
                </div>

                {/* Lesson Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <button
                    onClick={() => currentLesson > 0 && setCurrentLesson(currentLesson - 1)}
                    disabled={currentLesson === 0}
                    className="px-6 py-3 glass rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple/30 border border-white/10 transition-colors"
                  >
                    Previous Lesson
                  </button>

                  <MagneticButton>
                    <button
                      onClick={completeLesson}
                      className="px-8 py-4 gradient-bg rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple/50 transition-all flex items-center gap-2"
                    >
                      {currentLesson === allLessons.length - 1 ? (
                        <>
                          <Award className="w-5 h-5" />
                          <span>Complete Course</span>
                        </>
                      ) : (
                        <>
                          <span>Complete & Continue</span>
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
