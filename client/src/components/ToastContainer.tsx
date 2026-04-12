import { useToast, ToastType } from '@/contexts/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  error: <AlertCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
};

const toastBgColors: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200',
};

const toastTextColors: Record<ToastType, string> = {
  success: 'text-green-900',
  error: 'text-red-900',
  info: 'text-blue-900',
  warning: 'text-yellow-900',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 border rounded-lg shadow-lg animate-in fade-in slide-in-from-right-4 ${toastBgColors[toast.type]}`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toastIcons[toast.type]}
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${toastTextColors[toast.type]}`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className={`text-sm mt-1 ${toastTextColors[toast.type]}`}>
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
