import React from 'react';

// Suppress unused variable warning for React (false positive)
// @ts-ignore
const _react: React.FC = () => {};

interface StatusBadgeProps {
  status: 'pending-payment' | 'in-progress' | 'revision' | 'editing' | 'completed' | 'cancelled';
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const baseClasses = `inline-flex items-center font-medium rounded-full ${
    size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  }`;

  const statusStyles = {
    'pending-payment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'revision': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'editing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  const statusLabels = {
    'pending-payment': 'Pending Payment',
    'in-progress': 'In Progress',
    'revision': 'Revision',
    'editing': 'Editing',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
  };

  return (
    <span className={`${baseClasses} ${statusStyles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'}`}>
      {statusLabels[status] || 'Unknown'}
    </span>
  );
}