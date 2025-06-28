import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  ClipboardList, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  FileText,
  MapPin,
  DollarSign,
  Users,
  Activity,
  Eye,
  Filter,
  Camera,
  Truck,
  Bell,
  Wifi,
  WifiOff,
  Zap,
  Brain,
  Database,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { realTimeDataService, LiveActivity, SystemHealth, LiveMetric } from '../services/realTimeDataService';
import LiveIndicator from '../components/shared/LiveIndicator';
import MetricCard from '../components/shared/MetricCard';

const OpsPortal = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [liveData, setLiveData] = useState<{
    activities: LiveActivity[];
    systemHealth: SystemHealth[];
    metrics: LiveMetric[];
    timestamp: Date;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = realTimeDataService.subscribe((data) => {
      setLiveData(data);
    });

    return unsubscribe;
  }, []);

  // Static bid tracker data (will be made dynamic in next priority)
  const bidTracker = [
    {
      id: 1,
      project: '450 Commerce Street Demo',
      gc: 'Turner Construction',
      value: '$2.8M',
      status: 'submitted',
      dueDate: 'Apr 2, 2024',
      probability: 72
    },
    {
      id: 2,
      project: 'Riverside Office Complex',
      gc: 'Skanska USA',
      value: '$1.2M',
      status: 'preparing',
      dueDate: 'Apr 8, 2024',
      probability: 45
    },
    {
      id: 3,
      project: 'Downtown Parking Garage',
      gc: 'Brasfield & Gorrie',
      value: '$895K',
      status: 'awarded',
      dueDate: 'Completed',
      probability: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'awarded':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'submitted':
        return 'text-blue-600 bg-blue-100';
      case 'flagged':
      case 'preparing':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-500" />;
      case 'low':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={16} className="text-blue-600" />;
      case 'call':
        return <Phone size={16} className="text-green-600" />;
      case 'document':
        return <FileText size={16} className="text-purple-600" />;
      case 'field_update':
        return <Camera size={16} className="text-orange-600" />;
      case 'alert':
        return <Bell size={16} className="text-red-600" />;
      case 'bid':
        return <DollarSign size={16} className="text-green-600" />;
      default:
        return <Activity size={16} className="text-gray-600" />;
    }
  };

  const getMetricByName = (name: string): LiveMetric | undefined => {
    return liveData?.metrics.find(m => m.name === name);
  };

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return timestamp.toLocaleDateString();
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
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">OpsPortal</h1>
            <p className="text-secondary mb-3">
              Central operational dashboard for real-time alerts, bid tracking, system health, and operations oversight.
            </p>
            
            {/* System Architecture Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Brain size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">Powered by Tiny's AI Architecture</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Database size={16} className="text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900">Arbitor</div>
                        <div className="text-blue-700">Data Engine & Repository</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={16} className="text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900">Riddler</div>
                        <div className="text-blue-700">Conversational Interface</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor size={16} className="text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900">OpsPortal</div>
                        <div className="text-blue-700">Operations Dashboard</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex items-center space-x-2 text-xs text-blue-700">
                      <CheckCircle size={12} />
                      <span>Validation: GPT → Grok → GPT (95%+ accuracy)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <LiveIndicator />
            
            <select
              className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            <button className="flex items-center px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Eye size={16} className="mr-2" />
              Live View
            </button>
          </div>
        </div>

        {/* Live Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Emails Processed"
            value={getMetricByName('emails_processed')?.value || 47}
            change={getMetricByName('emails_processed')?.change}
            trend={getMetricByName('emails_processed')?.trend}
            icon={<Mail size={20} />}
            color="blue"
            isLive={true}
          />

          <MetricCard
            title="Active Bids"
            value={getMetricByName('active_bids')?.value || 3}
            change={getMetricByName('active_bids')?.change}
            trend={getMetricByName('active_bids')?.trend}
            icon={<ClipboardList size={20} />}
            color="green"
            isLive={true}
          />

          <MetricCard
            title="Active Alerts"
            value={getMetricByName('active_alerts')?.value || 3}
            change={getMetricByName('active_alerts')?.change}
            trend={getMetricByName('active_alerts')?.trend}
            icon={<AlertTriangle size={20} />}
            color="yellow"
            isLive={true}
          />

          <MetricCard
            title="Auto-Route Success"
            value={`${getMetricByName('auto_route_success')?.value || 89}%`}
            change={getMetricByName('auto_route_success')?.change}
            trend={getMetricByName('auto_route_success')?.trend}
            icon={<TrendingUp size={20} />}
            color="purple"
            isLive={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Live Inbound Activity Feed */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Activity size={20} className="mr-2 text-blue-600" />
                Inbound Activity Feed
              </h3>
              <LiveIndicator size="sm" />
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {liveData?.activities.slice(0, 10).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <div className="flex items-center space-x-2">
                          {getPriorityIcon(item.priority)}
                          <span className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.confidence && (
                          <span className="text-xs text-gray-500">
                            {item.confidence}% confidence • {item.source}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {!liveData?.activities.length && (
                <div className="text-center text-gray-500 py-8">
                  <Activity size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </div>

          {/* System Health Monitor */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Zap size={20} className="mr-2 text-green-600" />
                System Health
              </h3>
              <LiveIndicator size="sm" label="Monitoring" />
            </div>
            
            <div className="space-y-3">
              {liveData?.systemHealth.map((system) => (
                <motion.div
                  key={system.service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      {system.status === 'online' ? (
                        <Wifi size={16} className="text-green-600" />
                      ) : (
                        <WifiOff size={16} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{system.service}</span>
                      <div className="text-xs text-gray-500">
                        {system.responseTime}ms • {system.uptime.toFixed(1)}% uptime
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getSystemStatusColor(system.status)}`}>
                      {system.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(system.lastCheck)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bid Tracker and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bid Tracker (Static for now) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <FileText size={20} className="mr-2 text-green-600" />
                Bid Tracker
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            
            <div className="space-y-4">
              {bidTracker.map((bid) => (
                <div key={bid.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bid.project}</p>
                      <p className="text-xs text-gray-600">{bid.gc}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{bid.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bid.status)}`}>
                      {bid.status}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{bid.dueDate}</p>
                      <p className="text-xs font-medium text-gray-700">{bid.probability}% win rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Alerts & Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Bell size={20} className="mr-2 text-red-600" />
                Live Alerts & Tasks
              </h3>
              <LiveIndicator size="sm" />
            </div>
            
            <div className="space-y-3">
              {liveData?.activities
                .filter(activity => activity.type === 'alert' || activity.status === 'flagged')
                .slice(0, 5)
                .map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className={`p-1 rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-600' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle size={12} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">{alert.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{alert.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>From {alert.source}</span>
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

              {/* Static tasks */}
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-gray-900">Review demo permit - 615 Main</p>
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Urgent</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Assigned to: Bill Fay</span>
                  <span>Due: Today 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OpsPortal;