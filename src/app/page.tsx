'use client';

import Link from 'next/link';
import { getAllDegrees } from '@/lib/degrees';
import { ChevronRight, Star, Trophy, Award, Clock, Zap, Share2, Users, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';
import AdBanner from '@/components/ads/AdBanner';

export default function Home() {
  const degrees = getAllDegrees();
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    track('page_viewed', { page: 'homepage' });
  }, []);

  // Viral stats - simulate real-time activity
  const recentGraduates = [
    { name: 'Priya S.', degree: 'Professional Overthinker', time: '2m ago', avatar: '👩‍💼' },
    { name: 'Rahul M.', degree: 'Meme Lord', time: '5m ago', avatar: '👨‍💻' },
    { name: 'Sneha K.', degree: 'Chai Enthusiast', time: '8m ago', avatar: '👩‍🎤' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF1F2] overflow-x-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-tl from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative border-b border-[#FECDD3] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900">Internet University</h1>
                <p className="text-xs text-gray-500">Est. 2026</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/leaderboard"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors bg-gray-100 hover:bg-pink-100 px-4 py-2 rounded-full cursor-pointer"
              >
                <Trophy size={16} />
                <span>Leaderboard</span>
              </Link>
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <Sparkles size={14} className="fill-white animate-pulse" />
            <span>10,000+ degrees earned</span>
            <Sparkles size={14} className="fill-white animate-pulse" />
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight text-center">
          Earn the degree the<br />
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            internet thinks you deserve
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
          Complete hilarious checklists, get your official certificate, and flex your internet credentials to the world.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2.5 bg-white px-5 py-3 rounded-2xl shadow-lg border border-[#FECDD3] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <div className="font-black text-gray-900">2 min</div>
              <div className="text-xs text-gray-500">Avg. completion</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white px-5 py-3 rounded-2xl shadow-lg border border-[#FECDD3] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FB7185] to-[#E11D48] rounded-xl flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <div>
              <div className="font-black text-gray-900">100%</div>
              <div className="text-xs text-gray-500">Meme-approved</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white px-5 py-3 rounded-2xl shadow-lg border border-[#FECDD3] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#E11D48] rounded-xl flex items-center justify-center">
              <span className="font-bold text-white">FREE</span>
            </div>
            <div>
              <div className="font-black text-gray-900">100% Free</div>
              <div className="text-xs text-gray-500">Ad-supported</div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#FECDD3] p-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">Live Graduates</span>
          </div>
          <div className="space-y-2">
            {recentGraduates.map((grad, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                <span className="text-lg">{grad.avatar}</span>
                <span className="font-medium text-gray-900">{grad.name}</span>
                <span className="text-gray-500">earned</span>
                <span className="font-semibold text-[#E11D48]">{grad.degree}</span>
                <span className="text-xs text-gray-400 ml-auto">{grad.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placement - After Hero */}
      <section className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[#FECDD3] p-4">
          <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
          <AdBanner slot="1234567890" format="auto" />
        </div>
      </section>

      {/* Degrees Grid - Bento Style */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Choose Your Degree
          </h3>
          <p className="text-gray-600 text-lg">Pick from our collection of meme-worthy degrees</p>
        </div>

        <div className="grid gap-4">
          {degrees.map((degree, index) => (
            <Link
              key={degree.id}
              href={`/degree/${degree.slug}`}
              onClick={() => {
                track('degree_clicked', {
                  degreeTitle: degree.title,
                  degreeSlug: degree.slug,
                });
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group degree-card block p-6 rounded-3xl relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#FECDD3] hover:border-transparent"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500`}
                style={{
                  background: `linear-gradient(135deg, ${degree.color}15 0%, ${degree.color}30 100%)`,
                }}
              />

              {/* Floating particles on hover */}
              {hoveredCard === index && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-100" />
                </div>
              )}

              {/* Content */}
              <div className="relative flex items-center gap-5">
                {/* Icon */}
                <div
                  className="degree-icon w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${degree.color} 0%, ${degree.color}cc 100%)`,
                  }}
                >
                  {degree.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-2xl font-black text-gray-900 group-hover:scale-[1.02] transition-transform duration-300"
                    style={{ color: degree.color }}
                  >
                    {degree.title}
                  </h3>
                  <p className="text-gray-600 mt-1.5 font-medium text-base">{degree.subtitle}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">{degree.checklist.length} tasks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: degree.color }}>
                      <Zap size={14} />
                      <span>Instant Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-[#E11D48] group-hover:to-[#FB7185] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <ArrowRight className="text-gray-400 group-hover:text-white transition-colors" size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works - Enhanced Cards */}
      <section className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Play size={14} className="fill-white" />
            <span>3 Simple Steps</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            How It Works
          </h3>
          <p className="text-gray-600 text-lg">Get your degree in minutes</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: '📝',
              step: '1',
              title: 'Choose Your Degree',
              desc: 'Pick from our collection of meme-worthy degrees',
              color: 'from-[#E11D48] to-[#FB7185]'
            },
            {
              icon: '✅',
              step: '2',
              title: 'Complete Checklist',
              desc: 'Tick off all the hilarious requirements',
              color: 'from-[#FB7185] to-[#2563EB]'
            },
            {
              icon: '🎓',
              step: '3',
              title: 'Get Certified',
              desc: 'Download and share your official certificate',
              color: 'from-[#2563EB] to-[#E11D48]'
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3] hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-black shadow-lg text-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.step}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h4 className="text-xl font-black text-gray-900 mb-3 text-center">{item.title}</h4>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{item.desc}</p>

              {/* Progress indicator */}
              <div className="flex justify-center gap-1 mt-5">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      dot === index
                        ? `bg-gradient-to-r ${item.color} w-4`
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof - Enhanced */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-12 text-center text-white overflow-hidden shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">🎓</div>
            <div className="absolute top-20 right-20 text-4xl animate-bounce delay-100">⭐</div>
            <div className="absolute bottom-10 left-20 text-5xl animate-bounce delay-200">🏆</div>
            <div className="absolute bottom-20 right-10 text-6xl animate-bounce delay-300">📜</div>
            <div className="absolute top-1/2 left-1/3 text-5xl animate-bounce delay-500">🔥</div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="relative">
            {/* Fire emoji animation */}
            <div className="text-7xl mb-6 animate-bounce">🔥</div>

            <p className="text-white/90 text-lg mb-2 font-semibold">Join 10,000+ internet graduates</p>
            <div className="text-7xl font-black mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">10,000+</div>
            <p className="text-white/90 text-xl mb-8">degrees earned worldwide</p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users size={18} />
                <span className="font-semibold">Active Community</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp size={18} />
                <span className="font-semibold">Trending Now</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 size={18} />
                <span className="font-semibold">Verified Fun</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button className="bg-white text-[#E11D48] px-8 py-4 rounded-full text-lg font-black shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer">
                Start Your Journey →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            What Graduates Say
          </h3>
          <p className="text-gray-600 text-lg">Real people, real laughs, real certificates</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              name: 'Arjun P.',
              degree: 'Professional Overthinker',
              quote: 'This is the most fun I\'ve had getting a degree! Already shared it everywhere.',
              avatar: '👨‍💼',
              rating: 5,
            },
            {
              name: 'Meera S.',
              degree: 'Meme Lord',
              quote: 'My friends couldn\'t believe this was real. Best ₹10 I\'ve ever spent!',
              avatar: '👩‍🎨',
              rating: 5,
            },
            {
              name: 'Vikram R.',
              degree: 'Chai Enthusiast',
              quote: 'The checklist was hilariously accurate. Got my certificate in 2 minutes!',
              avatar: '🧑‍💻',
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-lg border border-[#FECDD3] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-full flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.degree}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Placement - Before Footer */}
      <section className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[#FECDD3] p-4">
          <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
          <AdBanner slot="0987654321" format="auto" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#FECDD3] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Internet University</p>
                  <p className="text-xs text-gray-500">Est. 2026</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Earn the degree the internet thinks you deserve.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <p className="text-sm text-gray-600 mb-2">DARSHAN JATINKUMAR PATEL</p>
              <p className="text-sm text-gray-500 mb-2">
                C1, Devcity Bunglows, Ghatlodiya,<br />
                Ahmedabad, Gujarat 380061, India
              </p>
              <p className="text-sm text-gray-500">
                <a href="mailto:djpatel2003119@gmail.com" className="hover:text-[#E11D48] transition-colors">djpatel2003119@gmail.com</a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="tel:+916355549958" className="hover:text-[#E11D48] transition-colors">+91 63555 49958</a>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Home</Link>
                <Link href="/pricing" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Pricing</Link>
                <Link href="/leaderboard" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Leaderboard</Link>
                <Link href="/contact" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Contact Us</Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/legal" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Terms & Policies</Link>
                <Link href="/legal/terms" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Terms of Service</Link>
                <Link href="/legal/privacy" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Privacy Policy</Link>
                <Link href="/legal/refund" className="block text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer">Refund Policy</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#FECDD3] pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Internet University. All rights reserved.</p>
            <p className="mt-2 text-xs">For entertainment purposes only. Not affiliated with any actual university.</p>
            <p className="mt-2 text-xs text-gray-400">This site is supported by ads. All degrees are 100% free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
