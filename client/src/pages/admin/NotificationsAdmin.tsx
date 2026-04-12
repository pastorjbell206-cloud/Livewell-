import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export function NotificationsAdmin() {
  const { addToast } = useToast();
  const { data: notifications, isLoading, refetch } = trpc.notifications.listAll.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'announcement',
    title: '',
    message: '',
    showAsBanner: false,
  });

  const createNotification = trpc.notifications.create.useMutation({
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Notification created',
        message: 'The notification has been published.',
      });
      setFormData({ type: 'announcement', title: '', message: '', showAsBanner: false });
      setShowForm(false);
      refetch();
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Failed to create notification',
        message: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      addToast({
        type: 'error',
        title: 'Missing fields',
        message: 'Please fill in all required fields.',
      });
      return;
    }
    createNotification.mutate(formData);
  };

  if (isLoading) {
    return <div className="p-4">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Notifications</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#B8963E] hover:bg-[#1A1A1A] text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Notification
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#F7F5F0] border border-[#B8963E] rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-[#B8963E] rounded focus:outline-none focus:ring-2 focus:ring-[#B8963E]"
            >
              <option value="announcement">Announcement</option>
              <option value="update">Update</option>
              <option value="alert">Alert</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#B8963E] rounded focus:outline-none focus:ring-2 focus:ring-[#B8963E]"
              placeholder="Notification title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-[#B8963E] rounded focus:outline-none focus:ring-2 focus:ring-[#B8963E] h-24"
              placeholder="Notification message"
              required
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.showAsBanner}
              onChange={(e) => setFormData({ ...formData, showAsBanner: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-[#1A1A1A]">Show as site-wide banner</span>
          </label>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createNotification.isPending}
              className="bg-[#B8963E] hover:bg-[#1A1A1A] text-white"
            >
              {createNotification.isPending ? 'Creating...' : 'Create Notification'}
            </Button>
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#1A1A1A]">{notification.title}</h3>
                  {notification.showAsBanner && (
                    <span className="px-2 py-1 bg-[#B8963E] text-white text-xs rounded">
                      Banner
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  {notification.active ? (
                    <Eye className="w-4 h-4 text-gray-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button className="p-2 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
