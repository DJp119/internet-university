'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, Home, Award, Star, Ribbon } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
  const params = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');
  const [degreeSubtitle, setDegreeSubtitle] = useState('');

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
  const gpa = (3.5 + Math.random() * 0.5).toFixed(2);

  const downloadPNG = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: '#FDFBF7',
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = `${userName}-${certificateCode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: '#FDFBF7',
      useCORS: true,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${userName}-${certificateCode}.pdf`);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`I just graduated with a ${degreeTitle} from Internet University! 🎓😂`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`I just earned my ${degreeTitle} from Internet University! Check it out: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const degreeIcon = degreeTitle.includes('Abusing') ? '🤬' :
                     degreeTitle.includes('Overthinking') ? '🤔' :
                     degreeTitle.includes('Procrastination') ? '⏰' : '🐸';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
          <Home size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4">
        {/* Success Message */}
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

        {/* Certificate */}
        <div className="mb-10 slide-up" style={{ animationDelay: '100ms' }}>
          <div
            ref={certificateRef}
            className="paper-texture shadow-2xl overflow-hidden mx-auto"
            style={{ maxWidth: '850px' }}
          >
            {/* Outer Gold Border */}
            <div className="certificate-border">
              {/* Inner Content */}
              <div className="bg-[#FDFBF7] p-8 md:p-12">
                {/* Ornamental Border */}
                <div className="border-4 border-double border-yellow-600 rounded-lg p-6 md:p-10 relative">
                  {/* Corner Ornaments */}
                  <div className="absolute top-4 left-4 text-2xl ornament-spin">🎓</div>
                  <div className="absolute top-4 right-4 text-2xl ornament-spin">📜</div>
                  <div className="absolute bottom-4 left-4 text-2xl ornament-spin">⭐</div>
                  <div className="absolute bottom-4 right-4 text-2xl ornament-spin">🏆</div>

                  {/* Header Section */}
                  <div className="text-center mb-8 relative">
                    {/* University Seal */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mb-4 shadow-lg">
                      <span className="text-4xl">{degreeIcon}</span>
                    </div>

                    <h2 className="text-5xl font-black certificate-ornament text-gray-900 mb-2 tracking-wider">
                      Internet University
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                      <Ribbon size={14} />
                      <span>Est. 2026</span>
                      <span>•</span>
                      <span>Worldwide Meme Recognition</span>
                      <Ribbon size={14} />
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="text-center mb-10">
                    <div className="inline-block relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 blur-xl opacity-20"></div>
                      <h3 className="relative text-3xl md:text-4xl font-bold gold-foil mb-8">
                        CERTIFICATE OF COMPLETION
                      </h3>
                    </div>
                  </div>

                  {/* Main Certificate Text */}
                  <div className="text-center py-6 mb-10">
                    <p className="text-gray-600 text-sm uppercase tracking-widest mb-6 font-medium">
                      This certifies that
                    </p>

                    <div className="relative inline-block mb-8">
                      <h4 className="text-5xl md:text-6xl font-black text-gray-900 certificate-ornament py-4 px-12">
                        {userName}
                      </h4>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full"></div>
                    </div>

                    <p className="text-gray-600 text-lg mb-6 italic font-medium">
                      has successfully fulfilled the requirements for the degree of
                    </p>

                    <h5 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                      {degreeTitle}
                    </h5>

                    <div className="flex items-center justify-center gap-2 text-gray-500 mt-3">
                      <Star size={16} className="text-yellow-600" />
                      <p className="text-lg italic">with specialization in</p>
                      <span className="font-bold text-indigo-600">{degreeSubtitle}</span>
                      <Star size={16} className="text-yellow-600" />
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex flex-wrap justify-between items-end mt-16 pt-10 border-t-2 border-gray-300 gap-8">
                    {/* Date */}
                    <div className="text-center flex-1 min-w-[150px]">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">📅</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Issue Date</p>
                      <p className="text-sm font-bold text-gray-900">{issueDate}</p>
                    </div>

                    {/* GPA */}
                    <div className="text-center flex-1 min-w-[150px]">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">GPA</p>
                      <p className="text-2xl font-black text-gray-900">{gpa}</p>
                    </div>

                    {/* Certificate ID */}
                    <div className="text-center flex-1 min-w-[150px]">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🆔</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Certificate ID</p>
                      <p className="text-sm font-mono font-bold text-gray-900 break-all">{certificateCode}</p>
                    </div>

                    {/* Signature */}
                    <div className="text-center flex-1 min-w-[150px]">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🖊️</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Signature</p>
                      <p className="text-xl certificate-signature font-bold text-indigo-600">Dr. Meme Lord</p>
                      <p className="text-xs text-gray-400 mt-1">Chancellor</p>
                    </div>
                  </div>

                  {/* Accreditation Badge */}
                  <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-3 rounded-full border border-yellow-300">
                      <Award className="text-yellow-600" size={20} />
                      <span className="text-sm font-medium text-gray-700">
                        Accredited by the Internet Meme Council
                      </span>
                      <Award className="text-yellow-600" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-10 slide-up" style={{ animationDelay: '200ms' }}>
          <button
            onClick={downloadPNG}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Download size={22} />
            Download PNG
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gray-900 hover:to-black transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Download size={22} />
            Download PDF
          </button>
        </div>

        {/* Share Buttons */}
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
              onClick={shareOnTwitter}
              className="flex items-center gap-2 bg-[#1DA1F2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1a91da] transition-colors shadow-lg"
            >
              <Share2 size={18} />
              Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0958a9] transition-colors shadow-lg"
            >
              <Share2 size={18} />
              LinkedIn
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20b85a] transition-colors shadow-lg"
            >
              <Share2 size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p className="font-medium">© 2026 Internet University</p>
          <p className="mt-1">This certificate is for entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
