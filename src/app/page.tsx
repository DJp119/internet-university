'use client';

import Link from 'next/link';
import { getAllDegrees } from '@/lib/degrees';
import { ChevronRight, Star, Trophy, Award, Clock } from 'lucide-react';

export default function Home() {
  const degrees = getAllDegrees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Internet University</h1>
                <p className="text-xs text-gray-500">Est. 2026</p>
              </div>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-indigo-100 px-4 py-2 rounded-full"
            >
              <Trophy size={16} />
              Leaderboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Star size={14} className="fill-white" />
          <span>10,000+ degrees earned</span>
          <Star size={14} className="fill-white" />
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
          Earn the degree the<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            internet thinks you deserve
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Complete hilarious checklists, get your official certificate, and flex your internet credentials to the world.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <Clock className="text-indigo-600" size={18} />
            <span className="font-semibold text-gray-700">2 minutes</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <Award className="text-purple-600" size={18} />
            <span className="font-semibold text-gray-700">100% meme-approved</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <span className="font-bold text-green-600">₹10</span>
            <span className="text-gray-500">only</span>
          </div>
        </div>
      </section>

      {/* Degrees Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {degrees.map((degree, index) => (
            <Link
              key={degree.id}
              href={`/degree/${degree.slug}`}
              className="group degree-card block p-8 rounded-3xl relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${degree.color}10 0%, ${degree.color}20 100%)`,
                }}
              ></div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="degree-icon w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${degree.color} 0%, ${degree.color}cc 100%)`,
                    }}
                  >
                    {degree.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors"
                      style={{ color: degree.color }}
                    >
                      {degree.title}
                    </h3>
                    <p className="text-gray-600 mt-2 font-medium">{degree.subtitle}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{degree.checklist.length} tasks</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-semibold" style={{ color: degree.color }}>
                        Start Degree →
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-indigo-600 flex items-center justify-center transition-all duration-300">
                      <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            How It Works
          </h3>
          <p className="text-lg text-gray-600">
            Get your degree in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '📝', step: '1', title: 'Choose Your Degree', desc: 'Pick from our collection of meme-worthy degrees' },
            { icon: '✅', step: '2', title: 'Complete Checklist', desc: 'Tick off all the hilarious requirements' },
            { icon: '🎓', step: '3', title: 'Get Certified', desc: 'Download and share your official certificate' },
          ].map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">
                {item.step}
              </div>

              <div className="text-5xl mb-4 mt-4">{item.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl">🎓</div>
            <div className="absolute top-20 right-20 text-4xl">⭐</div>
            <div className="absolute bottom-10 left-20 text-5xl">🏆</div>
            <div className="absolute bottom-20 right-10 text-6xl">📜</div>
          </div>

          <div className="relative">
            <div className="text-6xl mb-6">🔥</div>
            <p className="text-indigo-100 text-lg mb-4 font-medium">Join 10,000+ internet graduates</p>
            <div className="text-6xl font-black mb-4">10,000+</div>
            <p className="text-indigo-100 text-xl">degrees earned worldwide</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
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
                <a href="mailto:djpatel2003119@gmail.com" className="hover:text-indigo-600">djpatel2003119@gmail.com</a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="tel:+916355549958" className="hover:text-indigo-600">+91 63555 49958</a>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-600 hover:text-indigo-600">Home</Link>
                <Link href="/leaderboard" className="block text-gray-600 hover:text-indigo-600">Leaderboard</Link>
                <Link href="/contact" className="block text-gray-600 hover:text-indigo-600">Contact Us</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Internet University. All rights reserved.</p>
            <p className="mt-2 text-xs">For entertainment purposes only. Not affiliated with any actual university.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
