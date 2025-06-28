import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Camera, 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Smartphone,
  Truck,
  Users,
  Activity,
  Download,
  Wifi,
  WifiOff
} from 'lucide-react';
import { realTimeDataService } from '../services/realTimeDataService';
import LiveIndicator from '../components/shared/LiveIndicator';

const FieldOpsCompliance = () => {
  const [selectedProject, setSelectedProject] = useState('615-main');
  const [selectedView, setSelectedView] = useState('overview');
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = realTimeDataService.subscribe((data) => {
      setLiveData(data);
    });

    return unsubscribe;
  }, []);

  const projects = [
    {
      id: '615-main',
      name: '615 Main Street Demo',
      status: 'active',
      progress: 60,
      lastUpdate: '15 min ago'
    },
    {
      id: '450-commerce',
      name: '450 Commerce Street',
      status: 'planning',
      progress: 15,
      lastUpdate: '1 day ago'
    },
    {
      id: 'riverside',
      name: 'Riverside Office Complex',
      status: 'completed',
      progress: 100,
      lastUpdate: '3 days ago'
    }
  ];

  const fieldData = [
    {
      id: 1,
      type: 'photo',
      description: 'Demolition progress - 2nd floor removal',
      timestamp: '2024-03-15 14:30:15',
      gpsVerified: true,
      location: '36.1627° N, 86.7816° W',
      accuracy: '±2m',
      uploader: 'Team Alpha'
    },
    {
      id: 2,
      type: 'document',
      description: 'Daily safety inspection checklist',
      timestamp: '2024-03-15 08:15:42',
      gpsVerified: true,
      location: '36.1627° N, 86.7816° W',
      accuracy: '±3m',
      uploader: 'Safety Officer'
    },
    {
      id: 3,
      type: 'haul_ticket',
      description: 'Debris haul #DH-2024-0315-003',
      timestamp: '2024-03-15 16:45:18',
      gpsVerified: true,
      location: 'Off-site transport',
      accuracy: 'N/A',
      uploader: 'Haul Driver'
    }
  ];

  const complianceChecks = [
    {
      id: 1,
      category: 'GPS Validation',
      status: 'passed',
      details: '47/47 photos geotagged on-site',
      score: 100
    },
    {
      id: 2,
      category: 'Jamf Device Lock',
      status: 'passed',
      details: 'All mobile devices compliant',
      score: 100
    },
    {
      id: 3,
      category: 'Data Completeness',
      status: 'warning',
      details: '3 missing haul tickets',
      score: 85
    },
    {
      id: 4,
      category: 'Safety Documentation',
      status: 'passed',
      details: 'Daily inspections complete',
      score: 95
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'planning':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-gray-600 bg-gray-100';
      case 'passed':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <Camera size={16} className="text-blue-600" />;
      case 'document':
        return <FileCheck size={16} className="text-green-600" />;
      case 'haul_ticket':
        return <Truck size={16} className="text-purple-600" />;
      default:
        return <Activity size={16} className="text-gray-600" />;
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
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Field Ops & Compliance</h1>
            <p className="text-secondary">
              Site-level activity tracking, validation, and compliance monitoring for all active projects.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <LiveIndicator />
            
            <select
              className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            
            <button className="flex items-center px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-xl border p-6 cursor-pointer transition-all relative ${
                selectedProject === project.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              {project.status === 'active' && (
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                    animate={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Updated {project.lastUpdate}</p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: <Activity size={18} /> },
              { id: 'field-data', label: 'Field Data', icon: <Smartphone size={18} /> },
              { id: 'compliance', label: 'Compliance', icon: <Shield size={18} /> },
              { id: 'integrations', label: 'Integrations', icon: <Wifi size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`flex items-center pb-4 border-b-2 transition-colors ${
                  selectedView === tab.id
                    ? 'border-black text-black font-medium'
                    : 'border-transparent text-secondary hover:text-black'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'integrations' && liveData && (
                  <div className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Activity size={20} className="mr-2 text-blue-600" />
                Project Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="text-center p-3 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    key="photos"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    47
                  </motion.div>
                  <div className="text-sm text-gray-600">Photos Uploaded</div>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">GPS Validated</div>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Haul Tickets</div>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </motion.div>
              </div>
            </div>

            {/* Live Integration Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <CheckCircle size={20} className="mr-2 text-green-600" />
                  Integration Status
                </h3>
                <LiveIndicator size="sm" />
              </div>
              <div className="space-y-3">
                {liveData?.systemHealth.map((integration: any) => (
                  <motion.div 
                    key={integration.service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {integration.status === 'online' ? (
                          <Wifi size={16} className="text-green-600" />
                        ) : (
                          <WifiOff size={16} className="text-red-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{integration.service}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(integration.status === 'online' ? 'passed' : 'warning')}`}>
                        {integration.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {integration.responseTime}ms
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Field Data Tab */}
        {selectedView === 'field-data' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Smartphone size={20} className="mr-2 text-blue-600" />
                Field Data Log
              </h3>
              <LiveIndicator size="sm" label="Last updated: 15 minutes ago" />
            </div>
            
            <div className="space-y-4">
              {fieldData.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    {getTypeIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{item.description}</p>
                      <div className="flex items-center space-x-2">
                        {item.gpsVerified ? (
                          <span className="flex items-center text-xs text-green-600">
                            <MapPin size={12} className="mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center text-xs text-red-600">
                            <AlertTriangle size={12} className="mr-1" />
                            Unverified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Time:</span> {item.timestamp}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {item.location}
                      </div>
                      <div>
                        <span className="font-medium">Accuracy:</span> {item.accuracy}
                      </div>
                      <div>
                        <span className="font-medium">Uploader:</span> {item.uploader}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {selectedView === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-green-600" />
                Compliance Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complianceChecks.map((check) => (
                  <motion.div 
                    key={check.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{check.category}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(check.status)}`}>
                        {check.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{check.details}</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <motion.div 
                          className={`h-2 rounded-full ${
                            check.score >= 95 ? 'bg-green-500' :
                            check.score >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${check.score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{check.score}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {selectedView === 'integrations' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Wifi size={20} className="mr-2 text-green-600" />
                Live System Integrations
              </h3>
              <LiveIndicator />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveData?.systemHealth.map((system: any) => (
                <motion.div
                  key={system.service}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {system.status === 'online' ? (
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                      ) : system.status === 'degraded' ? (
                        <AlertTriangle size={20} className="text-yellow-600 mr-2" />
                      ) : (
                        <AlertTriangle size={20} className="text-red-600 mr-2" />
                      )}
                      <h4 className="font-medium text-gray-900">{system.service}</h4>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      system.status === 'online' ? 'text-green-600 bg-green-100' :
                      system.status === 'degraded' ? 'text-yellow-600 bg-yellow-100' :
                      'text-red-600 bg-red-100'
                    }`}>
                      {system.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Response Time:</span>
                      <div className="font-medium">{system.responseTime}ms</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Uptime:</span>
                      <div className="font-medium">{system.uptime.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Last check: {new Date(system.lastCheck).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FieldOpsCompliance;