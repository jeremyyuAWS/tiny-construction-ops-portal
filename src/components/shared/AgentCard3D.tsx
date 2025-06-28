import React, { useRef, useState } from 'react';
import { Agent } from '../../data/agents';
import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';

interface AgentCard3DProps {
  agent: Agent;
  onClick: () => void;
}

const AgentCard3D: React.FC<AgentCard3DProps> = ({ agent, onClick }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; 
    const mouseY = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;
    
    setRotateX(-percentY * 10);
    setRotateY(percentX * 10);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col" style={{ transform: 'translateZ(20px)' }}>
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
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="w-full py-3 px-4 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors font-medium"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span>See Demo{agent.demos.length > 1 ? 's' : ''} ({agent.demos.length})</span>
          <ExternalLink size={16} className="ml-2" />
        </motion.button>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 text-xs text-secondary border-t border-gray-100" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex justify-between items-center">
          <span className="font-medium">{agent.department}</span>
          <span>{agent.metrics.dailyTasks} tasks daily</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard3D;