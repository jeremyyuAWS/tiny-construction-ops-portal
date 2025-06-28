import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Download, 
  FolderOpen, 
  Search, 
  Filter,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Grid,
  List,
  Folder
} from 'lucide-react';
import DocumentManager from '../components/document/DocumentManager';
import FolderStructure from '../components/document/FolderStructure';
import { documentService } from '../services/documentService';

const DocumentManagement = () => {
  const [activeView, setActiveView] = useState<'manager' | 'folders' | 'analytics'>('manager');
  const [selectedFolder, setSelectedFolder] = useState<string>('/');

  // Mock analytics data
  const analytics = {
    totalDocuments: 156,
    totalSize: documentService.formatFileSize(2847562240), // 2.8GB
    todayUploads: 12,
    processingQueue: 3,
    automationRate: 89,
    averageProcessingTime: '2.3 sec'
  };

  const recentActivity = [
    {
      id: 1,
      action: 'uploaded',
      file: '615Main_SafetyInspection_DailyCheck_089.pdf',
      user: 'Field Hustle',
      timestamp: '2 min ago',
      status: 'completed'
    },
    {
      id: 2,
      action: 'processed',
      file: 'Turner_BidResponse_450Commerce_001.pdf',
      user: 'BidSentry',
      timestamp: '8 min ago',
      status: 'completed'
    },
    {
      id: 3,
      action: 'auto-named',
      file: 'Site_Photos_615Main.zip',
      user: 'System',
      timestamp: '15 min ago',
      status: 'completed'
    },
    {
      id: 4,
      action: 'compliance_scan',
      file: 'Metro_Permits_Call.mp3',
      user: 'Shear',
      timestamp: '23 min ago',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'uploaded':
        return <Upload size={16} className="text-blue-600" />;
      case 'processed':
        return <Settings size={16} className="text-green-600" />;
      case 'auto-named':
        return <FileText size={16} className="text-purple-600" />;
      case 'compliance_scan':
        return <CheckCircle size={16} className="text-orange-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
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
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Document Management</h1>
            <p className="text-secondary">
              Automated file organization with intelligent naming, compliance scanning, and version control.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button 
                className={`flex items-center px-3 py-2 text-sm rounded transition-colors ${
                  activeView === 'manager' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
                onClick={() => setActiveView('manager')}
              >
                <List size={16} className="mr-2" />
                Documents
              </button>
              <button 
                className={`flex items-center px-3 py-2 text-sm rounded transition-colors ${
                  activeView === 'folders' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
                onClick={() => setActiveView('folders')}
              >
                <Folder size={16} className="mr-2" />
                Folders
              </button>
              <button 
                className={`flex items-center px-3 py-2 text-sm rounded transition-colors ${
                  activeView === 'analytics' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
                onClick={() => setActiveView('analytics')}
              >
                <BarChart3 size={16} className="mr-2" />
                Analytics
              </button>
            </div>
            
            <button className="flex items-center px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText size={20} className="text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+12 today</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.totalDocuments}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.totalSize}</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings size={20} className="text-purple-600" />
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{analytics.processingQueue} in queue</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.automationRate}%</div>
            <div className="text-sm text-gray-600">Auto-Processing</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock size={20} className="text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.averageProcessingTime}</div>
            <div className="text-sm text-gray-600">Avg Processing</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">98.7%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-sm text-gray-600">Needs Review</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main View */}
          <div className="lg:col-span-3">
            {activeView === 'manager' && <DocumentManager />}
            {activeView === 'folders' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-[600px]">
                <FolderStructure
                  onFolderSelect={setSelectedFolder}
                  onUploadToFolder={(path) => console.log('Upload to:', path)}
                />
              </div>
            )}
            {activeView === 'analytics' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-lg mb-4">Document Analytics Dashboard</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Document Types Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Field Data</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Bid Proposals</span>
                          <span className="font-medium">28%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Call Logs</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Other</span>
                          <span className="font-medium">12%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Processing Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Auto-Named Files</span>
                          <span className="font-medium">89%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>GPS Validated</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compliance Passed</span>
                          <span className="font-medium">98.7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-1 bg-white rounded border border-gray-200">
                      {getActionIcon(activity.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {activity.action.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-600 mb-1 truncate">
                        {activity.file}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentManagement;