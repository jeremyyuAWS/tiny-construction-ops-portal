import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  ArrowRight, 
  ArrowDown,
  Zap, 
  Target, 
  Shield, 
  Database,
  MessageSquare,
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  GitBranch
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  confidence: number;
  duration: string;
  details: string[];
  processes: string[];
}

const ValidationWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showDetails, setShowDetails] = useState(true);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "ChatGPT Initial Processing",
      subtitle: "Query Interpretation & Data Retrieval",
      description: "ChatGPT interprets the user's query, retrieves data from Arbitor and external sources, and provides an initial response with approximately 90% confidence.",
      icon: <Brain size={32} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      confidence: 90,
      duration: "1.2-2.5 seconds",
      details: [
        "Natural language query parsing and intent recognition",
        "Permission validation against user access levels",
        "Data retrieval from Arbitor's 2.3M data points",
        "Integration with external systems (Procore, monday.com, etc.)",
        "Initial response formulation with context awareness",
        "Confidence scoring based on data availability and query complexity"
      ],
      processes: [
        "Query tokenization and semantic analysis",
        "Entity extraction (projects, vendors, dates, amounts)",
        "Permission matrix validation",
        "Multi-source data aggregation",
        "Response synthesis with structured formatting",
        "Initial confidence assessment"
      ]
    },
    {
      id: 2,
      title: "Grok.ai Audit & Analysis",
      subtitle: "Response Validation & Gap Identification",
      description: "Grok.ai performs a comprehensive audit of the initial response, identifying potential gaps, inaccuracies, or areas requiring additional context or verification.",
      icon: <CheckCircle size={32} />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      confidence: 85,
      duration: "1.5-3.0 seconds",
      details: [
        "Cross-reference validation against multiple data sources",
        "Logical consistency checking across response elements",
        "Completeness assessment for missing context",
        "Accuracy verification using historical patterns",
        "Security and compliance validation",
        "Identification of potential enhancement opportunities"
      ],
      processes: [
        "Response decomposition and fact-checking",
        "Cross-source verification protocols",
        "Pattern matching against known data sets",
        "Anomaly detection and flag identification",
        "Completeness scoring and gap analysis",
        "Refinement recommendation generation"
      ]
    },
    {
      id: 3,
      title: "Grok Refinement Prompts",
      subtitle: "Detailed Enhancement Instructions",
      description: "Grok.ai sends specific, detailed refinement prompts back to ChatGPT, highlighting areas for improvement, additional context needed, and accuracy enhancements.",
      icon: <ArrowRight size={32} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
      confidence: 92,
      duration: "0.8-1.5 seconds",
      details: [
        "Specific data gap identification with source recommendations",
        "Context enhancement suggestions for better user understanding",
        "Accuracy improvement prompts with alternative data sources",
        "Formatting optimization for improved readability",
        "Additional verification steps for critical information",
        "Security compliance adjustments where necessary"
      ],
      processes: [
        "Gap prioritization and criticality assessment",
        "Source recommendation with confidence weighting",
        "Context enhancement prompt generation",
        "Formatting and presentation optimization",
        "Verification protocol activation",
        "Quality assurance checkpoint implementation"
      ]
    },
    {
      id: 4,
      title: "ChatGPT Final Response",
      subtitle: "Enhanced Delivery with 95%+ Confidence",
      description: "ChatGPT integrates Grok's feedback, incorporates additional data and context, and delivers a refined, comprehensive response with 95%+ confidence and complete accuracy.",
      icon: <Target size={32} />,
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      confidence: 97,
      duration: "1.0-2.0 seconds",
      details: [
        "Integration of all Grok feedback and recommendations",
        "Additional data retrieval for identified gaps",
        "Enhanced context and explanatory information",
        "Improved formatting and user experience",
        "Final accuracy verification and confidence scoring",
        "Comprehensive response delivery with source attribution"
      ],
      processes: [
        "Feedback integration and response reconstruction",
        "Supplemental data retrieval and validation",
        "Context enrichment and explanation expansion",
        "Final formatting and presentation optimization",
        "Confidence validation and accuracy confirmation",
        "Response delivery with complete audit trail"
      ]
    }
  ];

  const metrics = {
    totalQueries: "15,247",
    averageAccuracy: "97.3%",
    averageResponseTime: "4.8s",
    successRate: "99.2%",
    dailyVolume: "450+",
    falsePositiveRate: "0.8%"
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= workflowSteps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, (3000 / playbackSpeed));
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, workflowSteps.length]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (activeStep >= workflowSteps.length - 1) {
      setActiveStep(0);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  const currentStep = workflowSteps[activeStep];

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center">
                <GitBranch size={28} className="mr-3 text-blue-600" />
                Validation Workflow
              </h1>
              <p className="text-secondary mb-4">
                Four-step GPT → Grok → GPT validation process ensuring 95%+ accuracy and reliability.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0.5}>0.5x Speed</option>
                <option value={1}>1x Speed</option>
                <option value={1.5}>1.5x Speed</option>
                <option value={2}>2x Speed</option>
              </select>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Eye size={16} className="mr-2" />
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalQueries}</div>
              <div className="text-xs text-gray-600">Total Queries</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.averageAccuracy}</div>
              <div className="text-xs text-gray-600">Avg Accuracy</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.averageResponseTime}</div>
              <div className="text-xs text-gray-600">Avg Response</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{metrics.successRate}</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.dailyVolume}</div>
              <div className="text-xs text-gray-600">Daily Volume</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{metrics.falsePositiveRate}</div>
              <div className="text-xs text-gray-600">False Positives</div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'} Workflow
                </button>
                
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                Step {activeStep + 1} of {workflowSteps.length} • 
                {isPlaying ? ` Playing at ${playbackSpeed}x speed` : ' Paused'}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  animate={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Workflow Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Workflow Steps</h3>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    activeStep === index 
                      ? `${step.bgColor} border-current ${step.color}` 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeStep === index ? 'bg-white' : 'bg-gray-100'
                    }`}>
                      <div className={activeStep === index ? step.color : 'text-gray-600'}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">Step {step.id}</h4>
                        <span className="text-xs text-gray-500">{step.duration}</span>
                      </div>
                      <h5 className="text-sm font-medium text-gray-800 mb-1">{step.title}</h5>
                      <p className="text-xs text-gray-600">{step.subtitle}</p>
                      
                      {/* Confidence Indicator */}
                      <div className="mt-2 flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 mr-2">
                          <motion.div
                            className={`h-1.5 rounded-full ${
                              step.confidence >= 95 ? 'bg-green-500' :
                              step.confidence >= 90 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${step.confidence}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{step.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Current Step Detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-white border rounded-xl p-8 ${currentStep.bgColor}`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-4 bg-white rounded-xl shadow-sm ${currentStep.color}`}>
                    {currentStep.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Step {currentStep.id}: {currentStep.title}
                      </h2>
                      {isPlaying && activeStep === workflowSteps.findIndex(s => s.id === currentStep.id) && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center text-sm text-green-600"
                        >
                          <Activity size={16} className="mr-1" />
                          Processing...
                        </motion.div>
                      )}
                    </div>
                    <h3 className="text-lg text-gray-700 mb-3">{currentStep.subtitle}</h3>
                    <p className="text-gray-600 leading-relaxed">{currentStep.description}</p>
                    
                    {/* Duration and Confidence */}
                    <div className="flex items-center space-x-6 mt-4 text-sm">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-500" />
                        <span className="text-gray-700">Duration: {currentStep.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp size={16} className="mr-2 text-gray-500" />
                        <span className="text-gray-700">Confidence: {currentStep.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {showDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Zap size={16} className="mr-2 text-blue-600" />
                        Key Processes
                      </h4>
                      <div className="space-y-2">
                        {currentStep.details.map((detail, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Processes */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Settings size={16} className="mr-2 text-purple-600" />
                        Technical Implementation
                      </h4>
                      <div className="space-y-2">
                        {currentStep.processes.map((process, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{process}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Flow Arrows */}
                {activeStep < workflowSteps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex flex-col items-center text-gray-400"
                    >
                      <ArrowDown size={24} />
                      <span className="text-xs mt-1">Next Step</span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* System Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-3">
                <Target size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Accuracy Guarantee</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Four-step validation ensures 95%+ accuracy for all responses, with comprehensive fact-checking and verification.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-sm font-medium text-green-900">Current Performance</div>
              <div className="text-lg font-bold text-green-600">{metrics.averageAccuracy} accuracy</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-3">
                <Shield size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Security & Compliance</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Every query undergoes permission validation and security screening, protecting sensitive data with role-based access.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-900">Security Score</div>
              <div className="text-lg font-bold text-blue-600">100% compliant</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-3">
                <Database size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Comprehensive Coverage</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Access to complete operational data across projects, vendors, equipment, and compliance with real-time updates.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="text-sm font-medium text-purple-900">Data Coverage</div>
              <div className="text-lg font-bold text-purple-600">{metrics.totalQueries} queries processed</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ValidationWorkflow;