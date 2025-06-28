import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { Agent } from '../../data/agents';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  const getTagColor = (type: string) => {
    switch (type) {
      case 'Chat-type':
        return 'bg-accent-blue bg-opacity-10 text-accent-blue';
      case 'RAG-type':
        return 'bg-accent-green bg-opacity-10 text-accent-green';
      case 'Integration':
        return 'bg-accent-indigo bg-opacity-10 text-accent-indigo';
      case 'Prompt-type':
        return 'bg-purple-100 text-purple-700';
      case 'Data-type':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-xl text-primary leading-tight">{agent.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getTagColor(agent.type)} whitespace-nowrap ml-2`}>
            {agent.type}
          </span>
        </div>
        
        <p className="text-secondary text-sm mb-6 leading-relaxed flex-1">
          {agent.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-muted mb-1">Accuracy</div>
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">{agent.metrics.accuracy}%</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-muted mb-1">Response Time</div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-accent-green" />
              <span className="text-xl font-bold text-primary">{agent.metrics.responseTime}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClick}
          className="w-full py-3 px-4 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors font-medium"
        >
          <span>See Demo{agent.demos.length > 1 ? 's' : ''} ({agent.demos.length})</span>
          <ExternalLink size={16} className="ml-2" />
        </button>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 text-xs text-secondary border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-medium">{agent.department}</span>
          <span>{agent.metrics.dailyTasks} tasks daily</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;