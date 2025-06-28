import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  MessageSquare, 
  Network, 
  Brain, 
  Zap, 
  Users,
  Activity,
  Settings,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';
import NetworkGraph from '../components/network/NetworkGraph';
import RiddlerChat from '../components/chat/RiddlerChat';

const ArbitorRiddler = () => {
  const [activeView, setActiveView] = useState<'overview' | 'arbitor' | 'riddler'>('overview');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showNodeDetails, setShowNodeDetails] = useState(true);

  const systemStats = {
    totalNodes: 25,
    totalConnections: 47,
    activeAgents: 8,
    dataPoints: '2.3M',
    uptime: '99.8%',
    queryResponseTime: '1.2s'
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Arbitor/Riddler</h1>
          <p className="text-secondary mb-4">
            Central intelligence engine and conversational interface for Tiny's AI ecosystem.
          </p>
          
          {/* System Architecture Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Database size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Arbitor</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Comprehensive data repository and intelligence engine storing all company data, 
                    managing permissions, and enforcing governance across the ecosystem.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-blue-600">{systemStats.dataPoints}</div>
                      <div className="text-gray-600">Data Points</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-blue-600">{systemStats.uptime}</div>
                      <div className="text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-blue-600">{systemStats.totalConnections}</div>
                      <div className="text-gray-600">Connections</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Riddler</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Natural language interface providing secure, permission-based access to Arbitor's 
                    data through GPT → Grok → GPT validation workflow.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-purple-600">95%+</div>
                      <div className="text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-purple-600">{systemStats.queryResponseTime}</div>
                      <div className="text-gray-600">Response</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-bold text-purple-600">{systemStats.activeAgents}</div>
                      <div className="text-gray-600">AI Agents</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('overview')}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity size={16} className="mr-2" />
              System Overview
            </button>
            <button
              onClick={() => setActiveView('arbitor')}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'arbitor'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Network size={16} className="mr-2" />
              Arbitor Network
            </button>
            <button
              onClick={() => setActiveView('riddler')}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'riddler'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare size={16} className="mr-2" />
              Riddler Chat
            </button>
          </div>
        </div>

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Metrics */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Network Health</h3>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Zap size={20} className="text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Nodes</span>
                        <span className="font-medium">{systemStats.totalNodes}/25</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data Connections</span>
                        <span className="font-medium">{systemStats.totalConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">System Uptime</span>
                        <span className="font-medium text-green-600">{systemStats.uptime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">AI Performance</h3>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Brain size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Agents</span>
                        <span className="font-medium">{systemStats.activeAgents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg Response Time</span>
                        <span className="font-medium">{systemStats.queryResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Validation Accuracy</span>
                        <span className="font-medium text-green-600">95%+</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Data Repository</h3>
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Database size={20} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Data Points</span>
                        <span className="font-medium">{systemStats.dataPoints}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Document Types</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Storage Used</span>
                        <span className="font-medium">2.8 TB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Security Status</h3>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users size={20} className="text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Permission Levels</span>
                        <span className="font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Security Alerts</span>
                        <span className="font-medium text-green-600">0 active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Compliance Score</span>
                        <span className="font-medium text-green-600">100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Validation Workflow */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Validation Workflow</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium text-gray-900">ChatGPT Initial</div>
                        <div className="text-sm text-gray-600">Query processing and data retrieval (~90% confidence)</div>
                      </div>
                    </div>
                    
                    <div className="ml-4 border-l-2 border-gray-200 h-4"></div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium text-gray-900">Grok Validation</div>
                        <div className="text-sm text-gray-600">Response audit and gap identification</div>
                      </div>
                    </div>
                    
                    <div className="ml-4 border-l-2 border-gray-200 h-4"></div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium text-gray-900">ChatGPT Final</div>
                        <div className="text-sm text-gray-600">Refined response delivery (95%+ confidence)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-900">Result Guarantee</div>
                    <div className="text-sm text-green-700 mt-1">
                      Every response validated for accuracy, completeness, and security compliance.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'arbitor' && (
            <motion.div
              key="arbitor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">Arbitor Network Graph</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowNodeDetails(!showNodeDetails)}
                          className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {showNodeDetails ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                          {showNodeDetails ? 'Hide Details' : 'Show Details'}
                        </button>
                        <Settings size={16} className="text-gray-400" />
                      </div>
                    </div>
                    <NetworkGraph onNodeSelect={setSelectedNode} />
                  </div>
                </div>

                {showNodeDetails && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Node Details</h3>
                    
                    {selectedNode ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-lg text-gray-900">{selectedNode.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{selectedNode.type} • {selectedNode.category}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-700">{selectedNode.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Connections:</span>
                            <span className="ml-1 font-medium">{selectedNode.connections}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Importance:</span>
                            <span className="ml-1 font-medium">{selectedNode.importance}/10</span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Node ID: {selectedNode.id}</div>
                            <div>Type: {selectedNode.type}</div>
                            <div>Category: {selectedNode.category}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <Network size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">Click on a node to view details</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === 'riddler' && (
            <motion.div
              key="riddler"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RiddlerChat selectedNodeContext={selectedNode} />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Info size={16} className="mr-2 text-blue-600" />
                      Query Examples
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="font-medium text-blue-900">Operational Queries</div>
                        <div className="text-blue-700 text-xs mt-1">
                          "How many dumpsters were used at VUMC?"
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium text-green-900">Pricing Queries</div>
                        <div className="text-green-700 text-xs mt-1">
                          "Dumpster cost in Chattanooga?"
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="font-medium text-purple-900">Vendor Queries</div>
                        <div className="text-purple-700 text-xs mt-1">
                          "Who provided dumpsters?"
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-medium text-red-900">Restricted Queries</div>
                        <div className="text-red-700 text-xs mt-1">
                          "Jerry's salary?" (triggers security alert)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Validation Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">ChatGPT Engine</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ● Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Grok Validator</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ● Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Arbitor Access</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ● Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ArbitorRiddler;