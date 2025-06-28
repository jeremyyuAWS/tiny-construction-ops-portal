import React from 'react';
import { motion } from 'framer-motion';

interface LiveIndicatorProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ 
  label = 'Live', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className={`${textSizeClasses[size]} text-gray-500 font-medium`}>
        {label}
      </span>
      <motion.div
        className={`${sizeClasses[size]} bg-green-500 rounded-full`}
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default LiveIndicator;