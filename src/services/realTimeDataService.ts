export interface LiveActivity {
  id: string;
  type: 'email' | 'call' | 'document' | 'alert' | 'bid' | 'field_update';
  title: string;
  description: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  source: string;
  confidence?: number;
  status: 'new' | 'processing' | 'completed' | 'flagged';
}

export interface SystemHealth {
  service: string;
  status: 'online' | 'degraded' | 'offline';
  responseTime: number;
  uptime: number;
  lastCheck: Date;
}

export interface LiveMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

class RealTimeDataService {
  private activities: LiveActivity[] = [];
  private systemHealth: SystemHealth[] = [
    { service: 'DemoField', status: 'online', responseTime: 120, uptime: 99.8, lastCheck: new Date() },
    { service: 'Tenna GPS', status: 'online', responseTime: 85, uptime: 99.9, lastCheck: new Date() },
    { service: 'ClockShark', status: 'online', responseTime: 200, uptime: 98.5, lastCheck: new Date() },
    { service: 'FuelCloud', status: 'degraded', responseTime: 450, uptime: 95.2, lastCheck: new Date() },
    { service: 'Procore', status: 'online', responseTime: 340, uptime: 99.1, lastCheck: new Date() },
    { service: 'monday.com', status: 'online', responseTime: 180, uptime: 99.7, lastCheck: new Date() },
  ];
  
  private metrics: LiveMetric[] = [
    { name: 'emails_processed', value: 47, change: 0, trend: 'stable' },
    { name: 'active_bids', value: 3, change: 0, trend: 'stable' },
    { name: 'active_alerts', value: 3, change: 0, trend: 'stable' },
    { name: 'auto_route_success', value: 89, change: 0, trend: 'stable' }
  ];

  private listeners: ((data: any) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeData();
    this.startSimulation();
  }

  private initializeData() {
    const initialActivities: LiveActivity[] = [
      {
        id: '1',
        type: 'email',
        title: 'Turner Construction',
        description: 'Demo Permit Update - 450 Commerce',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        priority: 'high',
        source: 'Sift',
        confidence: 95,
        status: 'completed'
      },
      {
        id: '2',
        type: 'call',
        title: 'Metro Public Works',
        description: 'Street closure coordination',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        priority: 'medium',
        source: 'Sift',
        confidence: 87,
        status: 'processing'
      },
      {
        id: '3',
        type: 'document',
        title: 'Field Photos Upload',
        description: '12 new photos from 615 Main Street',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        priority: 'low',
        source: 'Field Hustle',
        status: 'completed'
      }
    ];
    
    this.activities = initialActivities;
  }

  private startSimulation() {
    this.interval = setInterval(() => {
      this.simulateNewActivity();
      this.updateSystemHealth();
      this.updateMetrics();
      this.notifyListeners();
    }, 15000); // Update every 15 seconds
  }

  private simulateNewActivity() {
    const activityTypes = [
      {
        type: 'email' as const,
        titles: ['Henderson Construction', 'Skanska USA', 'Brasfield & Gorrie', 'Metro Permits'],
        descriptions: [
          'Bid response for downtown project',
          'Schedule coordination meeting',
          'Permit approval notification',
          'Insurance documentation request'
        ],
        priorities: ['high', 'medium', 'low'] as const,
        sources: ['Sift', 'Triage']
      },
      {
        type: 'field_update' as const,
        titles: ['Site Progress Update', 'Equipment Status', 'Safety Check'],
        descriptions: [
          'Daily progress photos uploaded',
          'CAT 320 maintenance completed',
          'Site safety inspection passed'
        ],
        priorities: ['medium', 'low'] as const,
        sources: ['Field Hustle', 'DemoScope']
      },
      {
        type: 'alert' as const,
        titles: ['Weather Alert', 'Equipment Alert', 'Schedule Alert'],
        descriptions: [
          'Rain forecast for tomorrow',
          'Fuel level low on Volvo L60H',
          'Permit expiring in 3 days'
        ],
        priorities: ['high', 'medium'] as const,
        sources: ['BidSentry', 'Field Hustle']
      }
    ];

    // 30% chance to generate new activity
    if (Math.random() < 0.3) {
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const title = activityType.titles[Math.floor(Math.random() * activityType.titles.length)];
      const description = activityType.descriptions[Math.floor(Math.random() * activityType.descriptions.length)];
      const priority = activityType.priorities[Math.floor(Math.random() * activityType.priorities.length)];
      const source = activityType.sources[Math.floor(Math.random() * activityType.sources.length)];

      const newActivity: LiveActivity = {
        id: Date.now().toString(),
        type: activityType.type,
        title,
        description,
        timestamp: new Date(),
        priority,
        source,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        status: Math.random() < 0.8 ? 'processing' : 'flagged'
      };

      this.activities.unshift(newActivity);
      
      // Keep only last 20 activities
      if (this.activities.length > 20) {
        this.activities = this.activities.slice(0, 20);
      }
    }
  }

  private updateSystemHealth() {
    this.systemHealth = this.systemHealth.map(system => {
      // Small random fluctuations
      const responseChange = (Math.random() - 0.5) * 50;
      const uptimeChange = (Math.random() - 0.5) * 0.1;
      
      let newStatus = system.status;
      const newResponseTime = Math.max(50, system.responseTime + responseChange);
      
      // Determine status based on response time
      if (newResponseTime > 500) {
        newStatus = 'degraded';
      } else if (newResponseTime > 1000) {
        newStatus = 'offline';
      } else {
        newStatus = 'online';
      }

      return {
        ...system,
        status: newStatus,
        responseTime: Math.round(newResponseTime),
        uptime: Math.max(90, Math.min(100, system.uptime + uptimeChange)),
        lastCheck: new Date()
      };
    });
  }

  private updateMetrics() {
    this.metrics = this.metrics.map(metric => {
      const change = Math.floor((Math.random() - 0.5) * 6); // -3 to +3
      let newValue = metric.value;
      let trend: 'up' | 'down' | 'stable' = 'stable';

      if (metric.name === 'emails_processed') {
        newValue = Math.max(0, metric.value + Math.floor(Math.random() * 3));
        trend = newValue > metric.value ? 'up' : 'stable';
      } else if (metric.name === 'active_alerts') {
        newValue = Math.max(0, Math.min(10, metric.value + (Math.random() < 0.3 ? 1 : Math.random() < 0.2 ? -1 : 0)));
        trend = newValue > metric.value ? 'up' : newValue < metric.value ? 'down' : 'stable';
      } else {
        newValue = Math.max(0, metric.value + change);
        trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
      }

      return {
        ...metric,
        value: newValue,
        change: newValue - metric.value,
        trend
      };
    });
  }

  private notifyListeners() {
    const data = {
      activities: this.activities,
      systemHealth: this.systemHealth,
      metrics: this.metrics,
      timestamp: new Date()
    };
    
    this.listeners.forEach(listener => listener(data));
  }

  public subscribe(callback: (data: any) => void) {
    this.listeners.push(callback);
    
    // Send initial data
    callback({
      activities: this.activities,
      systemHealth: this.systemHealth,
      metrics: this.metrics,
      timestamp: new Date()
    });

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  public getActivities(): LiveActivity[] {
    return this.activities;
  }

  public getSystemHealth(): SystemHealth[] {
    return this.systemHealth;
  }

  public getMetrics(): LiveMetric[] {
    return this.metrics;
  }

  public destroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.listeners = [];
  }
}

// Singleton instance
export const realTimeDataService = new RealTimeDataService();