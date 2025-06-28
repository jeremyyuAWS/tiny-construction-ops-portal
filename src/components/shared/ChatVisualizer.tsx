import React from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChatVisualizerProps {
  type: string;
  data?: any;
}

const ChatVisualizer: React.FC<ChatVisualizerProps> = ({ type, data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { 
      duration: 1500,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          }
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        tension: 0.3
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    animation: {
      duration: 1500,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8
      }
    }
  };

  // Mock data for construction demonstrations
  const mockLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Project Progress (%)',
        data: [15, 35, 60, 85],
        fill: true,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Bid Win Rate (%)',
        data: [65, 72, 68, 78],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const mockBarData = {
    labels: ['Sift', 'Fang', 'Triage', 'BidSentry', 'DemoScope'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [94.2, 96.8, 92.4, 89.7, 91.3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const mockPieData = {
    labels: ['Email Processing', 'Fraud Detection', 'Bid Analysis', 'Document Review', 'Field Data'],
    datasets: [
      {
        label: 'Task Distribution',
        data: [35, 20, 18, 15, 12],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const renderTable = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <motion.tr initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">615 Main Street Demo</td>
              <td className="px-4 py-3 text-sm text-green-600">Active</td>
              <td className="px-4 py-3 text-sm text-gray-600">60%</td>
              <td className="px-4 py-3 text-sm text-gray-600">$485K</td>
            </motion.tr>
            <motion.tr initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">450 Commerce Street</td>
              <td className="px-4 py-3 text-sm text-blue-600">Bidding</td>
              <td className="px-4 py-3 text-sm text-gray-600">15%</td>
              <td className="px-4 py-3 text-sm text-gray-600">$2.8M</td>
            </motion.tr>
            <motion.tr initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Riverside Office</td>
              <td className="px-4 py-3 text-sm text-gray-600">Completed</td>
              <td className="px-4 py-3 text-sm text-gray-600">100%</td>
              <td className="px-4 py-3 text-sm text-gray-600">$1.2M</td>
            </motion.tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderTimeline = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-50 rounded-lg p-4"
    >
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>
        
        {[
          { time: '8:00 AM', title: 'Site Setup', desc: 'Equipment positioned, safety barriers installed', status: 'completed' },
          { time: '10:30 AM', title: 'Demolition Start', desc: '2nd floor removal begins', status: 'completed' },
          { time: '2:15 PM', title: 'Progress Check', desc: '60% completion milestone reached', status: 'current' },
          { time: '5:00 PM', title: 'Daily Wrap', desc: 'Site secured, equipment inspection', status: 'pending' }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
            className="ml-10 relative mb-6 last:mb-0"
          >
            <div className={`absolute -left-10 mt-1.5 rounded-full w-3 h-3 ${
              item.status === 'completed' ? 'bg-green-500' :
              item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
            }`}></div>
            <div className="text-xs text-gray-500 font-medium mb-1">{item.time}</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{item.title}</div>
            <div className="text-sm text-gray-600">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderHeatmap = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-lg p-4 border border-gray-200"
    >
      <div className="text-sm font-medium text-gray-700 mb-3 text-center">Agent Activity Matrix</div>
      <div className="grid grid-cols-5 gap-1">
        {[
          [1.00, 0.67, 0.23, 0.45, 0.12],
          [0.67, 1.00, 0.45, 0.78, 0.34],
          [0.23, 0.45, 1.00, 0.34, 0.89],
          [0.45, 0.78, 0.34, 1.00, 0.56],
          [0.12, 0.34, 0.89, 0.56, 1.00]
        ].map((row, i) => 
          row.map((correlation, j) => {
            const intensity = Math.abs(correlation);
            const hue = correlation > 0.5 ? '220' : correlation > 0.3 ? '120' : '60';
            const bgColor = `hsla(${hue}, 70%, 50%, ${intensity * 0.8})`;
            
            return (
              <motion.div 
                key={`${i}-${j}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i * 5 + j) * 0.02, duration: 0.3 }}
                className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: bgColor }}
              >
                {correlation.toFixed(2)}
              </motion.div>
            );
          })
        )}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Sift</span>
        <span>Fang</span>
        <span>Triage</span>
        <span>BidSentry</span>
        <span>Prod</span>
      </div>
    </motion.div>
  );

  const renderMap = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-100 rounded-lg p-4 border border-gray-200 h-48 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="text-lg font-medium text-gray-700 mb-2">📍 Project Location</div>
        <div className="text-sm text-gray-600 mb-1">615 Main Street, Nashville, TN</div>
        <div className="text-xs text-gray-500">GPS: 36.1627° N, 86.7816° W (±2m accuracy)</div>
        <div className="text-xs text-green-600 mt-2">✓ All photos geotagged on-site</div>
      </div>
    </motion.div>
  );

  switch (type) {
    case 'chart':
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-64 w-full"
        >
          <Line data={data || mockLineData} options={chartOptions} />
        </motion.div>
      );
    
    case 'bar':
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-64 w-full"
        >
          <Bar data={data || mockBarData} options={chartOptions} />
        </motion.div>
      );
    
    case 'pie':
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="h-64 w-full"
        >
          <Doughnut data={data || mockPieData} options={doughnutOptions} />
        </motion.div>
      );
    
    case 'table':
      return renderTable();
    
    case 'timeline':
      return renderTimeline();
    
    case 'heatmap':
      return renderHeatmap();
    
    case 'map':
      return renderMap();
    
    default:
      return null;
  }
};

export default ChatVisualizer;