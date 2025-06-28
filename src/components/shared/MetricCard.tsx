import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color?: string;
  isLive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = 'stable',
  icon,
  color = 'blue',
  isLive = false
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} className="text-green-600" />;
      case 'down':
        return <TrendingDown size={14} className="text-red-600" />;
      default:
        return <Minus size={14} className="text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden"
    >
      {isLive && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          {icon}
        </div>
        {change !== undefined && change !== 0 && (
          <motion.span 
            key={change}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`text-xs px-2 py-1 rounded-full flex items-center ${getTrendColor(trend)}`}
          >
            {getTrendIcon(trend)}
            <span className="ml-1">
              {change > 0 ? '+' : ''}{change}
              {typeof value === 'number' && value < 10 ? '' : '%'}
            </span>
          </motion.span>
        )}
      </div>
      
      <motion.div 
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        className="text-2xl font-bold text-gray-900 mb-1"
      >
        {value}
      </motion.div>
      
      <div className="text-sm text-gray-600">{title}</div>
    </motion.div>
  );
};

export default MetricCard;