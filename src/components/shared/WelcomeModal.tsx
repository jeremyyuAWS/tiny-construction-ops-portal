import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Users, 
  Monitor, 
  Shield, 
  TrendingUp, 
  FileText, 
  Network,
  Brain,
  Zap,
  Target,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Database,
  MessageSquare,
  Camera,
  Activity,
  BarChart3
} from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TabDetails {
  id: string;
  title: string;
  icon: React.ReactNode;
  purpose: string;
  aiFeatures: string[];
  businessValue: string[];
  insights: string[];
  keyMetrics: { label: string; value: string }[];
  color: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabDetails: TabDetails[] = [
    {
      id: 'overview',
      title: 'Welcome to OpsPortal',
      icon: <Brain size={32} className="text-blue-600" />,
      purpose: 'Central operational dashboard for Tiny\'s AI-powered construction management ecosystem, featuring real-time automation and intelligent decision support.',
      aiFeatures: [
        'GPT → Grok → GPT validation workflow (95%+ accuracy)',
        'Multi-agent orchestration across 8 specialized AI systems',
        'Real-time pattern recognition and anomaly detection',
        'Automated compliance monitoring and risk assessment'
      ],
      businessValue: [
        'Reduces manual oversight by 85% through intelligent automation',
        'Eliminates costly compliance violations with 100% monitoring',
        'Accelerates decision-making with real-time data insights',
        'Scales operations without proportional staff increases'
      ],
      insights: [
        'Processes 300+ daily communications with 94% accuracy',
        'Prevents average $50K/month in fraud through early detection',
        'Reduces bid preparation time from 8 hours to 2 hours',
        'Maintains 99.8% system uptime across all integrations'
      ],
      keyMetrics: [
        { label: 'Daily Automation', value: '85%' },
        { label: 'Cost Reduction', value: '$200K/yr' },
        { label: 'Time Savings', value: '15 hrs/day' },
        { label: 'Accuracy Rate', value: '95%+' }
      ],
      color: 'blue'
    },
    {
      id: 'agents',
      title: 'Agent Gallery',
      icon: <Users size={32} className="text-blue-600" />,
      purpose: 'Showcase and manage 8 specialized AI agents handling communications, fraud detection, bid processing, and field operations for comprehensive business automation.',
      aiFeatures: [
        'Sift: Email/call parsing with 94% routing accuracy',
        'Fang: Advanced fraud detection using behavioral analysis',
        'Triage: RAG-powered pattern recognition and prediction',
        'BidSentry: Automated bid opportunity detection and processing'
      ],
      businessValue: [
        'Eliminates 156 hours/week of manual communication processing',
        'Prevents fraud losses averaging $100K+ per incident',
        'Increases bid win rate from 45% to 72% through intelligence',
        'Reduces human error in critical business processes by 90%'
      ],
      insights: [
        'Agents collectively process 500+ daily tasks autonomously',
        'Sift achieves 2.3-second average email classification',
        'Fang identified 12 fraud attempts in Q1 with zero false positives',
        'BidSentry automated 89% of bid document processing'
      ],
      keyMetrics: [
        { label: 'Active Agents', value: '8' },
        { label: 'Daily Tasks', value: '500+' },
        { label: 'Accuracy Average', value: '94.8%' },
        { label: 'Response Time', value: '2.3s' }
      ],
      color: 'blue'
    },
    {
      id: 'ops-portal',
      title: 'OpsPortal Dashboard',
      icon: <Monitor size={32} className="text-green-600" />,
      purpose: 'Real-time operational command center providing live monitoring of all business activities, from inbound communications to system health and bid tracking.',
      aiFeatures: [
        'Live activity feed with intelligent prioritization',
        'Predictive alerts based on historical patterns',
        'Automated task routing to appropriate team members',
        'Real-time system health monitoring with anomaly detection'
      ],
      businessValue: [
        'Provides instant visibility into all business operations',
        'Reduces response time to critical issues from hours to minutes',
        'Enables proactive decision-making through predictive insights',
        'Centralizes oversight, eliminating information silos'
      ],
      insights: [
        'Monitors 15+ integrated systems with 99.8% uptime',
        'Processes 47 emails daily with automatic routing',
        'Tracks $4.5M in active bids with probability scoring',
        'Maintains 89% auto-routing success rate'
      ],
      keyMetrics: [
        { label: 'Live Systems', value: '15' },
        { label: 'Daily Emails', value: '47' },
        { label: 'Active Bids', value: '$4.5M' },
        { label: 'Uptime', value: '99.8%' }
      ],
      color: 'green'
    },
    {
      id: 'arbitor-riddler',
      title: 'Arbitor/Riddler Intelligence',
      icon: <Network size={32} className="text-purple-600" />,
      purpose: 'Central intelligence engine (Arbitor) and conversational interface (Riddler) providing secure, permission-based access to all company data through natural language queries.',
      aiFeatures: [
        'Arbitor: Comprehensive data repository with 2.3M data points',
        'Riddler: Natural language interface with GPT-Grok validation',
        'Network visualization of 25 interconnected systems',
        'Permission-sensitive query handling with security alerts'
      ],
      businessValue: [
        'Democratizes data access across all organizational levels',
        'Eliminates need for custom reports and manual data queries',
        'Provides instant answers to complex operational questions',
        'Maintains data security through intelligent permission controls'
      ],
      insights: [
        'Stores and manages 2.3M data points across all operations',
        'Achieves 95%+ accuracy through dual-AI validation',
        'Processes queries in average 1.2 seconds',
        'Maintains 100% security compliance with zero data breaches'
      ],
      keyMetrics: [
        { label: 'Data Points', value: '2.3M' },
        { label: 'Query Accuracy', value: '95%+' },
        { label: 'Response Time', value: '1.2s' },
        { label: 'Security Score', value: '100%' }
      ],
      color: 'purple'
    },
    {
      id: 'documents',
      title: 'Document Management',
      icon: <FileText size={32} className="text-orange-600" />,
      purpose: 'Intelligent document organization system with automated naming, GPS validation, compliance scanning, and version control for all project-related files.',
      aiFeatures: [
        'Automated file naming using AI-generated conventions',
        'GPS validation for field-uploaded photos and documents',
        'Compliance scanning for GDPR/CCPA/Tennessee regulations',
        'Intelligent document categorization and metadata extraction'
      ],
      businessValue: [
        'Eliminates 12 hours/week of manual file organization',
        'Ensures 100% compliance with regulatory requirements',
        'Provides instant document retrieval saving 3 hours/day',
        'Reduces storage costs through intelligent archiving'
      ],
      insights: [
        'Manages 156 documents totaling 2.8GB of project data',
        'Achieves 89% automation rate in document processing',
        'Maintains 98.7% compliance rate across all scans',
        'Processes uploads with 2.3-second average naming speed'
      ],
      keyMetrics: [
        { label: 'Documents', value: '156' },
        { label: 'Automation Rate', value: '89%' },
        { label: 'Compliance', value: '98.7%' },
        { label: 'Processing Speed', value: '2.3s' }
      ],
      color: 'orange'
    },
    {
      id: 'field-ops',
      title: 'Field Ops & Compliance',
      icon: <Shield size={32} className="text-red-600" />,
      purpose: 'Real-time field operations monitoring with GPS validation, compliance tracking, and integration with equipment and time tracking systems for complete site oversight.',
      aiFeatures: [
        'Real-time GPS validation for all field uploads',
        'Automated compliance monitoring against safety standards',
        'Equipment tracking integration with predictive maintenance',
        'Photo analysis for progress tracking and quality control'
      ],
      businessValue: [
        'Eliminates compliance violations through real-time monitoring',
        'Reduces insurance premiums by 15% through documented safety',
        'Prevents equipment theft with GPS tracking and alerts',
        'Improves project timeline accuracy through automated reporting'
      ],
      insights: [
        'Validates 100% of 47 daily field photos with GPS accuracy',
        'Monitors 5 active projects with real-time progress tracking',
        'Integrates 6 field systems (DemoField, Tenna, ClockShark, etc.)',
        'Maintains 100% safety compliance score across all sites'
      ],
      keyMetrics: [
        { label: 'GPS Validated', value: '100%' },
        { label: 'Active Projects', value: '5' },
        { label: 'System Integrations', value: '6' },
        { label: 'Safety Score', value: '100%' }
      ],
      color: 'red'
    },
    {
      id: 'insights',
      title: 'Insights & Retraining',
      icon: <TrendingUp size={32} className="text-indigo-600" />,
      purpose: 'Data-driven performance analysis and continuous AI improvement through model retraining, win/loss tracking, and business intelligence for strategic decision-making.',
      aiFeatures: [
        'Automated win/loss analysis with pattern identification',
        'Continuous model retraining based on performance data',
        'Predictive analytics for bid success probability',
        'Performance monitoring across all AI agents with optimization'
      ],
      businessValue: [
        'Increases bid win rate from 65% to 78% through intelligence',
        'Reduces false positive rates by 8% through continuous learning',
        'Provides strategic insights driving $500K+ annual improvements',
        'Optimizes agent performance, reducing operational costs by 20%'
      ],
      insights: [
        'Improved win rate by 18% through Prod agent retraining',
        'Reduced false positives from 4.2% to 2.3% across all agents',
        'Identified 3 new fraud patterns saving estimated $150K',
        'Completed 8 model retraining cycles with measurable improvements'
      ],
      keyMetrics: [
        { label: 'Win Rate Improvement', value: '+18%' },
        { label: 'Models Retrained', value: '8' },
        { label: 'False Positive Reduction', value: '-8%' },
        { label: 'Annual Savings', value: '$500K+' }
      ],
      color: 'indigo'
    }
  ];

  const currentTabData = tabDetails[currentTab];

  const handleNext = () => {
    if (currentTab < tabDetails.length - 1) {
      setCurrentTab(currentTab + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                {currentTabData.icon}
                <div>
                  <h2 className="font-bold text-xl text-gray-900">{currentTabData.title}</h2>
                  <p className="text-sm text-gray-600">
                    Tab {currentTab + 1} of {tabDetails.length} • Comprehensive Overview for Bill
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Purpose */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target size={18} className="mr-2 text-blue-600" />
                    Purpose & Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{currentTabData.purpose}</p>
                </div>

                {/* Key Metrics */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BarChart3 size={18} className="mr-2 text-green-600" />
                    Key Performance Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentTabData.keyMetrics.map((metric, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${getColorClasses(currentTabData.color)}`}>
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* AI Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Brain size={18} className="mr-2 text-purple-600" />
                      AI Features
                    </h3>
                    <div className="space-y-3">
                      {currentTabData.aiFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Zap size={14} className="mt-1 text-purple-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Value */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <DollarSign size={18} className="mr-2 text-green-600" />
                      Business Value
                    </h3>
                    <div className="space-y-3">
                      {currentTabData.businessValue.map((value, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle size={14} className="mt-1 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Activity size={18} className="mr-2 text-orange-600" />
                      Key Insights
                    </h3>
                    <div className="space-y-3">
                      {currentTabData.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <TrendingUp size={14} className="mt-1 text-orange-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Special content for overview tab */}
                {currentTab === 0 && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Database size={18} className="mr-2 text-blue-600" />
                      System Architecture Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <Database size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Arbitor</div>
                          <div className="text-sm text-gray-600">Central data repository</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          <MessageSquare size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Riddler</div>
                          <div className="text-sm text-gray-600">Conversational interface</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <Monitor size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">OpsPortal</div>
                          <div className="text-sm text-gray-600">Operations dashboard</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Navigation Footer */}
            <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
              <div className="flex space-x-1">
                {tabDetails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTab(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTab 
                        ? 'w-8 bg-blue-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                {currentTab > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {currentTab === tabDetails.length - 1 ? 'Get Started' : 'Next'}
                  {currentTab < tabDetails.length - 1 && <ChevronRight size={16} className="ml-1" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;