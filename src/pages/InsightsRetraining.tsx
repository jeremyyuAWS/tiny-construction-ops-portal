import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Brain, 
  BarChart3, 
  RefreshCw, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Download,
  Settings
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const InsightsRetraining = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedAgent, setSelectedAgent] = useState('all');

  // Performance data
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Win Rate %',
        data: [65, 72, 68, 78],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
      {
        label: 'Email Accuracy %',
        data: [92, 94, 93, 96],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      }
    ]
  };

  // Agent performance breakdown
  const agentPerformanceData = {
    labels: ['Sift', 'Fang', 'Triage', 'BidSentry', 'DemoScope', 'Shear', 'Field Hustle', 'Prod'],
    datasets: [
      {
        label: 'Accuracy %',
        data: [94, 97, 92, 90, 91, 98, 95, 89],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(251, 146, 60, 0.7)',
        ],
      }
    ]
  };

  // Issue distribution
  const issueData = {
    labels: ['False Positives', 'Routing Errors', 'Classification Issues', 'Data Quality'],
    datasets: [
      {
        data: [25, 35, 20, 20],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  };

  const insights = [
    {
      id: 1,
      type: 'win_loss',
      title: 'Bid Win Rate Improvement',
      description: 'Win rate increased by 18% after retraining Prod agent with recent Turner Construction communications',
      impact: 'high',
      date: '2 days ago',
      confidence: 89
    },
    {
      id: 2,
      type: 'fraud_detection',
      title: 'Enhanced Fraud Pattern Recognition',
      description: 'Fang agent identified 3 new fraud patterns after analyzing QuickDemo LLC case',
      impact: 'medium',
      date: '1 week ago',
      confidence: 94
    },
    {
      id: 3,
      type: 'routing_accuracy',
      title: 'Email Routing Optimization',
      description: 'Sift agent routing accuracy improved to 96% after training on 500 new email samples',
      impact: 'medium',
      date: '2 weeks ago',
      confidence: 92
    }
  ];

  const retrainingLogs = [
    {
      id: 1,
      agent: 'Prod',
      type: 'Communication Patterns',
      status: 'completed',
      improvement: '+18%',
      date: '2024-03-13',
      samples: 1250
    },
    {
      id: 2,
      agent: 'Fang',
      type: 'Fraud Detection',
      status: 'completed',
      improvement: '+12%',
      date: '2024-03-10',
      samples: 892
    },
    {
      id: 3,
      agent: 'Sift',
      type: 'Email Classification',
      status: 'in_progress',
      improvement: 'pending',
      date: '2024-03-15',
      samples: 2100
    },
    {
      id: 4,
      agent: 'Triage',
      type: 'Pattern Recognition',
      status: 'scheduled',
      improvement: 'pending',
      date: '2024-03-18',
      samples: 1500
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Insights & Retraining</h1>
            <p className="text-secondary">
              Data-driven oversight and continuous improvement through AI model retraining and performance analysis.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            
            <button className="flex items-center px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target size={20} className="text-green-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+18%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">78%</div>
            <div className="text-sm text-gray-600">Win Rate</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain size={20} className="text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">94.8%</div>
            <div className="text-sm text-gray-600">Avg Accuracy</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <RefreshCw size={20} className="text-purple-600" />
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">3 this month</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">Models Retrained</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle size={20} className="text-orange-600" />
              </div>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">-8%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2.3%</div>
            <div className="text-sm text-gray-600">False Positive Rate</div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-600" />
              Win/Loss Performance Trends
            </h3>
            <div className="h-64">
              <Line data={performanceData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <BarChart3 size={20} className="mr-2 text-blue-600" />
              Agent Performance Breakdown
            </h3>
            <div className="h-64">
              <Bar data={agentPerformanceData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Insights and Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Brain size={20} className="mr-2 text-purple-600" />
              Key Insights
            </h3>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{insight.date}</span>
                    <span>{insight.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <AlertTriangle size={20} className="mr-2 text-orange-600" />
              Issue Distribution
            </h3>
            <div className="h-64">
              <Doughnut data={issueData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Retraining Logs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <RefreshCw size={20} className="mr-2 text-blue-600" />
              Retraining Logs
            </h3>
            <button className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings size={16} className="mr-2" />
              Configure
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Improvement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Samples
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {retrainingLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.agent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(log.status)}`}>
                        {log.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.improvement === 'pending' ? (
                        <span className="text-gray-500">Pending</span>
                      ) : (
                        <span className="text-green-600 font-medium">{log.improvement}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.samples.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightsRetraining;