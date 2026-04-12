import { trpc } from '@/lib/trpc';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminNotificationsPanel() {
  const { data: unread, isLoading } = trpc.adminNotifications.unread.useQuery();
  const markAsRead = trpc.adminNotifications.markAsRead.useMutation({
    onSuccess: () => {
      // Invalidate unread notifications query to refresh
      trpc.useUtils().adminNotifications.unread.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (!unread || unread.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No new notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {unread.map((notification) => (
        <div
          key={notification.id}
          className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-blue-900">{notification.title}</p>
              <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
              <p className="text-xs text-blue-600 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => markAsRead.mutate({ id: notification.id })}
              className="flex-shrink-0 p-1 hover:bg-blue-200 rounded transition-colors"
              title="Mark as read"
            >
              <Check className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
