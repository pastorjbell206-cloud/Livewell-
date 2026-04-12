import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer';
  title?: string;
  description?: string;
}

export function NewsletterSignup({
  variant = 'inline',
  title = 'Join the Community',
  description = 'Get new articles, resources, and insights delivered to your inbox.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();
  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Subscribed!',
        message: 'Check your email for a welcome message.',
      });
      setEmail('');
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Subscription failed',
        message: error.message || 'Please try again later.',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  if (variant === 'inline') {
    return (
      <div className="bg-[#F7F5F0] border border-[#B8963E] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{title}</h3>
        <p className="text-[#2C3E50] text-sm mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-[#B8963E] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]"
            required
          />
          <Button
            type="submit"
            disabled={subscribe.isPending}
            className="bg-[#B8963E] hover:bg-[#1A1A1A] text-white"
          >
            {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#B8963E]" />
          <h4 className="font-semibold text-[#F7F5F0]">{title}</h4>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 bg-[#2C3E50] border border-[#B8963E] rounded text-sm text-[#F7F5F0] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#B8963E]"
            required
          />
          <Button
            type="submit"
            disabled={subscribe.isPending}
            className="bg-[#B8963E] hover:bg-[#1A1A1A] text-white"
          >
            {subscribe.isPending ? '...' : 'Go'}
          </Button>
        </form>
      </div>
    );
  }

  return null;
}
