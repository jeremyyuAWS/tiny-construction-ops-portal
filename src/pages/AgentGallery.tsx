import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, LayoutGrid, Grid3X3, X, Tag } from 'lucide-react';
import AgentCard from '../components/shared/AgentCard';
import AgentCard3D from '../components/shared/AgentCard3D';
import ChatWindow from '../components/shared/ChatWindow';
import { constructionAgents, Agent, Demo } from '../data/agents';

const AgentGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [filterDepartment, setFilterDepartment] = useState<string | 'all'>('all');
  const [filterType, setFilterType] = useState<string | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [use3DCards, setUse3DCards] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define available tags for filtering
  const availableTags = {
    'Agent Types': [
      'Chat-type', 'RAG-type', 'Integration', 'Prompt-type', 'Data-type'
    ],
    'Departments': [
      'Communications', 'Risk & Compliance', 'Operations Intelligence', 
      'Business Development', 'Project Management', 'Compliance & Data', 'Field Operations'
    ],
    'Use Cases': [
      'Email Processing', 'Fraud Detection', 'Pattern Recognition', 'Bid Management',
      'Project Setup', 'Data Protection', 'Field Documentation', 'Follow-up Communication'
    ],
    'Capabilities': [
      'Real-time Processing', 'Document Analysis', 'GPS Validation', 'Compliance Scanning',
      'Predictive Analytics', 'Automated Routing', 'Photo Analysis', 'Report Generation'
    ]
  };

  // Map agents to their tags based on their properties
  const getAgentTags = (agent: Agent): string[] => {
    const tags: string[] = [];
    
    // Agent type tags
    tags.push(agent.type);
    
    // Department tags
    tags.push(agent.department);
    
    // Use case tags based on agent functionality
    if (agent.name.includes('Sift') || agent.description.includes('email')) {
      tags.push('Email Processing');
    }
    if (agent.name.includes('Fang') || agent.description.includes('fraud')) {
      tags.push('Fraud Detection');
    }
    if (agent.name.includes('Triage') || agent.description.includes('pattern')) {
      tags.push('Pattern Recognition');
    }
    if (agent.name.includes('BidSentry') || agent.description.includes('bid')) {
      tags.push('Bid Management');
    }
    if (agent.name.includes('DemoScope') || agent.description.includes('launch')) {
      tags.push('Project Setup');
    }
    if (agent.name.includes('Shear') || agent.description.includes('compliance')) {
      tags.push('Data Protection');
    }
    if (agent.name.includes('Field Hustle') || agent.description.includes('field')) {
      tags.push('Field Documentation');
    }
    if (agent.name.includes('Prod') || agent.description.includes('follow-up')) {
      tags.push('Follow-up Communication');
    }

    // Capability tags
    if (agent.description.includes('real-time') || agent.metrics.responseTime.includes('sec')) {
      tags.push('Real-time Processing');
    }
    if (agent.description.includes('document') || agent.description.includes('analysis')) {
      tags.push('Document Analysis');
    }
    if (agent.description.includes('GPS') || agent.description.includes('coordinates')) {
      tags.push('GPS Validation');
    }
    if (agent.description.includes('compliance') || agent.description.includes('redaction')) {
      tags.push('Compliance Scanning');
    }
    if (agent.description.includes('predictive') || agent.description.includes('pattern')) {
      tags.push('Predictive Analytics');
    }
    if (agent.description.includes('routing') || agent.description.includes('classification')) {
      tags.push('Automated Routing');
    }
    if (agent.description.includes('photo') || agent.description.includes('image')) {
      tags.push('Photo Analysis');
    }
    if (agent.description.includes('report') || agent.description.includes('summary')) {
      tags.push('Report Generation');
    }

    return [...new Set(tags)]; // Remove duplicates
  };

  const filteredAgents = constructionAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || agent.department === filterDepartment;
    const matchesType = filterType === 'all' || agent.type === filterType;
    
    // Tag filtering
    const agentTags = getAgentTags(agent);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => agentTags.includes(tag));
    
    return matchesSearch && matchesDepartment && matchesType && matchesTags;
  });

  const uniqueDepartments = ['all', ...new Set(constructionAgents.map(agent => agent.department))];
  const agentTypes = ['all', 'Chat-type', 'RAG-type', 'Integration', 'Prompt-type', 'Data-type'];

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setSelectedDemo(agent.demos[0]);
  };

  const handleCloseDemo = () => {
    setSelectedAgent(null);
    setSelectedDemo(null);
  };

  const handleChangeDemo = (direction: 'next' | 'prev') => {
    if (!selectedAgent || !selectedDemo) return;
    
    const currentIndex = selectedAgent.demos.findIndex(demo => demo.id === selectedDemo.id);
    let newIndex;
    
    if (direction === 'next') {
      if (currentIndex === selectedAgent.demos.length - 1) {
        const currentAgentIndex = constructionAgents.findIndex(agent => agent.id === selectedAgent.id);
        const nextAgentIndex = (currentAgentIndex + 1) % constructionAgents.length;
        const nextAgent = constructionAgents[nextAgentIndex];
        setSelectedAgent(nextAgent);
        setSelectedDemo(nextAgent.demos[0]);
        return;
      }
      newIndex = (currentIndex + 1) % selectedAgent.demos.length;
    } else {
      if (currentIndex === 0) {
        const currentAgentIndex = constructionAgents.findIndex(agent => agent.id === selectedAgent.id);
        const prevAgentIndex = (currentAgentIndex - 1 + constructionAgents.length) % constructionAgents.length;
        const prevAgent = constructionAgents[prevAgentIndex];
        setSelectedAgent(prevAgent);
        setSelectedDemo(prevAgent.demos[prevAgent.demos.length - 1]);
        return;
      }
      newIndex = (currentIndex - 1 + selectedAgent.demos.length) % selectedAgent.demos.length;
    }
    
    setSelectedDemo(selectedAgent.demos[newIndex]);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const getTagColor = (category: string) => {
    switch (category) {
      case 'Agent Types':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'Departments':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'Use Cases':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      case 'Capabilities':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Agent Gallery</h1>
            <p className="text-secondary">
              Explore Tiny's specialized AI agents for demolition, recycling, and construction operations.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full md:w-auto">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                {uniqueDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {agentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setUse3DCards(!use3DCards)}
              className="p-2 rounded-lg border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50"
              title={use3DCards ? "Switch to standard view" : "Switch to 3D view"}
            >
              {use3DCards ? <LayoutGrid size={18} /> : <Grid3X3 size={18} />}
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Tag size={18} className="mr-2 text-gray-500" />
              <h3 className="font-medium text-gray-700">Filter by Category</h3>
            </div>
            <div className="flex items-center space-x-2">
              {selectedTags.length > 0 && (
                <button
                  onClick={clearAllTags}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-sm text-accent-blue hover:text-accent-blue/80"
              >
                {showAllTags ? 'Show less' : 'Show all tags'}
              </button>
            </div>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleTagClick(tag)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    {tag}
                    <X size={14} className="ml-1" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Tag Categories */}
          <div className="space-y-4">
            {Object.entries(availableTags).map(([category, tags]) => {
              const visibleTags = showAllTags ? tags : tags.slice(0, 4);
              
              return (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {visibleTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? 'bg-black text-white'
                            : getTagColor(category)
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {!showAllTags && tags.length > 4 && (
                      <button
                        onClick={() => setShowAllTags(true)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        +{tags.length - 4} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedAgent && selectedDemo ? (
          <div className="h-[calc(100vh-200px)]">
            <ChatWindow
              demo={selectedDemo}
              onClose={handleCloseDemo}
              onChangeDemo={handleChangeDemo}
            />
          </div>
        ) : (
          <div>
            {/* Results count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredAgents.length} of {constructionAgents.length} agents
                {selectedTags.length > 0 && (
                  <span className="ml-1">
                    filtered by {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''}
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  custom={index}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {use3DCards ? (
                    <AgentCard3D agent={agent} onClick={() => handleAgentClick(agent)} />
                  ) : (
                    <AgentCard agent={agent} onClick={() => handleAgentClick(agent)} />
                  )}
                </motion.div>
              ))}
              {filteredAgents.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-secondary text-lg">No agents match your search criteria.</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AgentGallery;