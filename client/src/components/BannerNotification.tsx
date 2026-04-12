import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { X } from 'lucide-react';

interface BannerNotificationProps {
  dismissedIds?: Set<number>;
  onDismiss?: (id: number) => void;
}

export function BannerNotification({ dismissedIds = new Set(), onDismiss }: BannerNotificationProps) {
  const { data: banners, isLoading } = trpc.notifications.getBanners.useQuery();
  const [activeBanner, setActiveBanner] = useState<any>(null);

  useEffect(() => {
    if (banners && banners.length > 0) {
      // Show first non-dismissed banner
      const banner = banners.find((b: any) => !dismissedIds.has(b.id));
      setActiveBanner(banner || null);
    }
  }, [banners, dismissedIds]);

  if (isLoading || !activeBanner) return null;

  const handleDismiss = () => {
    onDismiss?.(activeBanner.id);
    setActiveBanner(null);
  };

  return (
    <div className="bg-gradient-to-r from-[#B8963E] to-[#1A1A1A] text-[#F7F5F0] px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="font-semibold">{activeBanner.title}</p>
        {activeBanner.message && (
          <p className="text-sm opacity-90">{activeBanner.message}</p>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
