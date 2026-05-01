'use client';

import { useEffect, useState } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray-100 rounded-lg min-h-[100px] animate-pulse ${className}`} />
    );
  }

  // Map slot IDs to MyBidadm banner IDs
  const bannerIdMap: Record<string, string> = {
    '1122334455': '2020595',
    '5544332211': '2020597',
  };

  const bannerId = bannerIdMap[slot] || slot;

  return (
    <div className={`ad-container ${className}`}>
      <div data-banner-id={bannerId} />
    </div>
  );
}
