import React from 'react';
import { Loader2, AlertTriangle, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const LoadingState: React.FC<{ message?: string; className?: string }> = ({
  message = 'Loading information...',
  className = 'py-16'
}) => (
  <div className={`flex flex-col items-center justify-center text-center ${className}`}>
    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
      <Loader2 className="w-6 h-6 text-red-600 animate-spin" />
    </div>
    <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({
  title = 'Something went wrong',
  message = 'We encountered an issue loading this data. Please try again.',
  onRetry,
  className = 'py-16'
}) => (
  <div className={`flex flex-col items-center justify-center text-center max-w-md mx-auto px-4 ${className}`}>
    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 text-red-600">
      <AlertTriangle className="w-7 h-7" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-600 mb-6">{message}</p>
    {onRetry && (
      <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
        Retry Request
      </Button>
    )}
  </div>
);

export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title = 'No results found',
  message = 'Try adjusting your search terms or filters to find what you are looking for.',
  actionText,
  onAction,
  className = 'py-16'
}) => (
  <div className={`flex flex-col items-center justify-center text-center max-w-md mx-auto px-4 ${className}`}>
    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-500">
      <HelpCircle className="w-7 h-7" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-600 mb-6">{message}</p>
    {actionText && onAction && (
      <Button variant="secondary" size="sm" onClick={onAction}>
        {actionText}
      </Button>
    )}
  </div>
);
