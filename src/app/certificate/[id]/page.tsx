'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Award, Download, Home, Share2 } from 'lucide-react';
import { downloadCertificatePDF, downloadCertificatePNG } from '@/lib/certificate-generator';
import { track } from '@vercel/analytics';
import AdBanner from '@/components/ads/AdBanner';

function getDegreeIcon(degreeTitle: string) {
  if (degreeTitle.includes('Abusing')) return '🤬';
  if (degreeTitle.includes('Overthinking')) return '🤔';
  if (degreeTitle.includes('Procrastination')) return '⏰';
  return '🐸';
}

function buildShareLinks({
  degreeTitle,
  shareUrl,
}: {
  degreeTitle: string;
  shareUrl: string;
}) {
  const message = `I just graduated with a ${degreeTitle} from Internet University!`;
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedCombined = encodeURIComponent(`${message} ${shareUrl}`);

  return {
    x: `https://x.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsApp: `https://api.whatsapp.com/send?text=${encodedCombined}`,
    instagram: `https://www.instagram.com/`,
  };
}

export default function CertificatePage() {
  const params = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');
  const [degreeSubtitle, setDegreeSubtitle] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [gpa, setGpa] = useState('');

  useEffect(() => {
    setGpa((3.5 + Math.random() * 0.5).toFixed(2));
  }, []);

  useEffect(() => {
    setUserName(sessionStorage.getItem('userName') || 'Anonymous');
    setDegreeTitle(sessionStorage.getItem('degreeTitle') || 'Bachelor in Memes');
    setDegreeSubtitle(sessionStorage.getItem('degreeSubtitle') || 'Meme Literacy');
  }, []);

  const certificateCode = params.id as string;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const degreeIcon = useMemo(() => getDegreeIcon(degreeTitle), [degreeTitle]);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const shareLinks = useMemo(
    () => buildShareLinks({ degreeTitle, shareUrl }),
    [degreeTitle, shareUrl]
  );

  const handleDownload = async (type: 'png' | 'pdf') => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    const fileNameBase = `${userName || 'Anonymous'}-${certificateCode}`;

    try {
      if (type === 'png') {
        await downloadCertificatePNG({
          element: certificateRef.current,
          fileName: `${fileNameBase}.png`,
        });
        track('certificate_downloaded', {
          type: 'png',
          degreeTitle,
          userName,
        });
      } else {
        await downloadCertificatePDF({
          element: certificateRef.current,
          fileName: `${fileNameBase}.pdf`,
        });
        track('certificate_downloaded', {
          type: 'pdf',
          degreeTitle,
          userName,
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      <header className="max-w-5xl mx-auto px-4 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
          <Home size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10 slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Award className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Congratulations, {userName}!
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            You are now officially certified by Internet University
          </p>
        </div>

        <div className="mb-10 slide-up" style={{ animationDelay: '100ms' }}>
          <div
            ref={certificateRef}
            className="bg-[#FDFBF7] shadow-2xl overflow-hidden mx-auto max-w-4xl border-8 border-yellow-600"
          >
            <div className="p-8 md:p-12 paper-texture">
              <div className="border-4 border-double border-yellow-700 rounded-lg p-6 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mb-4 shadow-lg">
                    <span className="text-4xl">{degreeIcon}</span>
                  </div>
                  <h2
                    className="text-4xl md:text-5xl font-black text-gray-900 mb-2"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    Internet University
                  </h2>
                  <p className="text-sm text-gray-500">Est. 2026 • Worldwide Meme Recognition</p>
                </div>

                <div className="text-center mb-10">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-8"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5A3 50%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    CERTIFICATE OF COMPLETION
                  </h3>
                </div>

                <div className="text-center py-6 mb-10">
                  <p className="text-gray-600 text-sm uppercase tracking-widest mb-6">This certifies that</p>

                  <div className="relative inline-block mb-8">
                    <h4
                      className="text-4xl md:text-5xl font-black text-gray-900 py-4 px-8"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                      {userName}
                    </h4>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full"></div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 italic">
                    has successfully fulfilled the requirements for the degree of
                  </p>

                  <h5
                    className="text-3xl md:text-4xl font-black mb-4"
                    style={{
                      background: 'linear-gradient(90deg, #4F46E5 0%, #9333EA 50%, #4F46E5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {degreeTitle}
                  </h5>

                  <p className="text-gray-600">
                    with specialization in <span className="font-bold text-indigo-600">{degreeSubtitle}</span>
                  </p>
                </div>

                <div className="flex flex-wrap justify-between items-end mt-16 pt-10 border-t-2 border-gray-300 gap-8">
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg text-xl">📅</div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Issue Date</p>
                    <p className="text-sm font-bold">{issueDate}</p>
                  </div>

                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg text-xl">✨</div>
                    <p className="text-xs text-gray-500 uppercase mb-1">GPA</p>
                    <p className="text-2xl font-black">{gpa}</p>
                  </div>

                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg text-xl">🆔</div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Certificate ID</p>
                    <p className="text-xs font-mono font-bold break-all">{certificateCode}</p>
                  </div>

                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg text-xl">✒️</div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Signature</p>
                    <p
                      className="text-lg font-bold text-indigo-600"
                      style={{ fontFamily: 'Dancing Script, cursive' }}
                    >
                      Dr. Meme Lord
                    </p>
                    <p className="text-xs text-gray-400">Chancellor</p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-3 rounded-full border border-yellow-300">
                    <span className="text-sm font-medium">Accredited by the Internet Meme Council</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-10 slide-up" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => handleDownload('png')}
            disabled={isDownloading}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={22} />
            {isDownloading ? 'Generating...' : 'Download PNG'}
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            disabled={isDownloading}
            className="flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gray-900 hover:to-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={22} />
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* Ad Placement - Below Download Buttons */}
        <div className="mb-10 slide-up" style={{ animationDelay: '250ms' }}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
            <AdBanner slot="5544332211" format="auto" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 slide-up" style={{ animationDelay: '300ms' }}>
          <div className="text-center mb-6">
            <Share2 className="mx-auto text-indigo-600 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Share Your Achievement
            </h3>
            <p className="text-gray-600">
              Let the world know about your new degree
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                openShareWindow(shareLinks.x);
                track('certificate_shared', { platform: 'x', degreeTitle });
              }}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors shadow-lg"
            >
              <Share2 size={18} />
              X
            </button>
            <button
              onClick={() => {
                openShareWindow(shareLinks.linkedIn);
                track('certificate_shared', { platform: 'linkedin', degreeTitle });
              }}
              className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0958a9] transition-colors shadow-lg"
            >
              <Share2 size={18} />
              LinkedIn
            </button>
            <button
              onClick={() => {
                openShareWindow(shareLinks.whatsApp);
                track('certificate_shared', { platform: 'whatsapp', degreeTitle });
              }}
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20b85a] transition-colors shadow-lg"
            >
              <Share2 size={18} />
              WhatsApp
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                track('certificate_shared', { platform: 'instagram', degreeTitle });
                alert('Link copied! Paste it on Instagram to share.');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              <Share2 size={18} />
              Instagram
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
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
