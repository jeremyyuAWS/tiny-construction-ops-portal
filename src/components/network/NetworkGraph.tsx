import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'agent' | 'system' | 'data_source' | 'output' | 'core';
  category: string;
  description: string;
  connections: number;
  importance: number;
}

interface NetworkLink {
  source: string;
  target: string;
  type: 'data_flow' | 'api_call' | 'triggers' | 'monitors' | 'stores';
  strength: number;
  bidirectional?: boolean;
}

interface NetworkGraphProps {
  onNodeSelect?: (node: NetworkNode | null) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onNodeSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Network data representing Tiny's AI ecosystem
  const nodes: NetworkNode[] = [
    // Core System
    { id: 'arbitor', name: 'Arbitor', type: 'core', category: 'Core', description: 'Central data repository and intelligence engine', connections: 12, importance: 10 },
    { id: 'riddler', name: 'Riddler', type: 'core', category: 'Core', description: 'Conversational interface for data queries', connections: 8, importance: 9 },
    { id: 'ops-portal', name: 'OpsPortal', type: 'core', category: 'Core', description: 'Real-time operations dashboard', connections: 15, importance: 10 },

    // AI Agents
    { id: 'sift', name: 'Sift', type: 'agent', category: 'Communications', description: 'Email/call parsing and routing', connections: 8, importance: 8 },
    { id: 'fang', name: 'Fang', type: 'agent', category: 'Risk & Compliance', description: 'Fraud detection and anomaly tracking', connections: 6, importance: 9 },
    { id: 'triage', name: 'Triage', type: 'agent', category: 'Operations Intelligence', description: 'Pattern recognition and classification', connections: 10, importance: 8 },
    { id: 'bidsentry', name: 'BidSentry', type: 'agent', category: 'Business Development', description: 'Bid detection and processing', connections: 7, importance: 7 },
    { id: 'demoscope', name: 'DemoScope', type: 'agent', category: 'Project Management', description: 'Project launch and scope analysis', connections: 9, importance: 8 },
    { id: 'shear', name: 'Shear', type: 'agent', category: 'Compliance & Data', description: 'Document redaction and compliance', connections: 5, importance: 9 },
    { id: 'field-hustle', name: 'Field Hustle', type: 'agent', category: 'Field Operations', description: 'Field data processing and GPS validation', connections: 6, importance: 7 },
    { id: 'prod', name: 'Prod', type: 'agent', category: 'Business Development', description: 'Bid follow-up and response tracking', connections: 5, importance: 6 },

    // External Systems
    { id: 'outlook', name: 'Outlook', type: 'system', category: 'Communications', description: 'Email system integration', connections: 3, importance: 6 },
    { id: 'openphone', name: 'OpenPhone', type: 'system', category: 'Communications', description: 'Call management system', connections: 2, importance: 5 },
    { id: 'monday', name: 'monday.com', type: 'system', category: 'Project Management', description: 'Task and project management', connections: 5, importance: 7 },
    { id: 'procore', name: 'Procore', type: 'system', category: 'Construction', description: 'Construction management platform', connections: 4, importance: 7 },
    { id: 'onedrive', name: 'OneDrive', type: 'system', category: 'Storage', description: 'Document storage and sharing', connections: 6, importance: 6 },
    { id: 'demofield', name: 'DemoField', type: 'system', category: 'Field Operations', description: 'Field data collection app', connections: 3, importance: 6 },
    { id: 'tenna', name: 'Tenna GPS', type: 'system', category: 'Field Operations', description: 'Equipment tracking and GPS', connections: 3, importance: 6 },
    { id: 'clockshark', name: 'ClockShark', type: 'system', category: 'Field Operations', description: 'Time tracking system', connections: 2, importance: 5 },
    { id: 'fuelcloud', name: 'FuelCloud', type: 'system', category: 'Field Operations', description: 'Fuel management system', connections: 2, importance: 4 },

    // Data Sources
    { id: 'building-connected', name: 'BuildingConnected', type: 'data_source', category: 'Bids', description: 'Bid opportunity platform', connections: 2, importance: 6 },
    { id: 'sharefile', name: 'ShareFile', type: 'data_source', category: 'Documents', description: 'Document sharing platform', connections: 2, importance: 5 },
    { id: 'assembly-ai', name: 'AssemblyAI', type: 'data_source', category: 'AI Services', description: 'Speech-to-text processing', connections: 2, importance: 5 },

    // Output/Validation
    { id: 'gpt', name: 'ChatGPT', type: 'output', category: 'AI Validation', description: 'Primary AI processing engine', connections: 4, importance: 8 },
    { id: 'grok', name: 'Grok.ai', type: 'output', category: 'AI Validation', description: 'Response validation and refinement', connections: 3, importance: 7 }
  ];

  const links: NetworkLink[] = [
    // Core system connections
    { source: 'arbitor', target: 'riddler', type: 'data_flow', strength: 10, bidirectional: true },
    { source: 'arbitor', target: 'ops-portal', type: 'data_flow', strength: 10, bidirectional: true },
    { source: 'riddler', target: 'ops-portal', type: 'api_call', strength: 8 },

    // AI Agents to Arbitor
    { source: 'sift', target: 'arbitor', type: 'stores', strength: 9 },
    { source: 'fang', target: 'arbitor', type: 'stores', strength: 8 },
    { source: 'triage', target: 'arbitor', type: 'stores', strength: 9 },
    { source: 'bidsentry', target: 'arbitor', type: 'stores', strength: 7 },
    { source: 'demoscope', target: 'arbitor', type: 'stores', strength: 8 },
    { source: 'shear', target: 'arbitor', type: 'stores', strength: 9 },
    { source: 'field-hustle', target: 'arbitor', type: 'stores', strength: 7 },
    { source: 'prod', target: 'arbitor', type: 'stores', strength: 6 },

    // Agent interconnections
    { source: 'sift', target: 'triage', type: 'triggers', strength: 8 },
    { source: 'fang', target: 'sift', type: 'monitors', strength: 7 },
    { source: 'bidsentry', target: 'demoscope', type: 'triggers', strength: 7 },
    { source: 'shear', target: 'field-hustle', type: 'monitors', strength: 6 },
    { source: 'prod', target: 'bidsentry', type: 'data_flow', strength: 6 },
    { source: 'triage', target: 'fang', type: 'data_flow', strength: 7 },

    // External system connections
    { source: 'outlook', target: 'sift', type: 'data_flow', strength: 9 },
    { source: 'openphone', target: 'sift', type: 'data_flow', strength: 8 },
    { source: 'monday', target: 'sift', type: 'api_call', strength: 8, bidirectional: true },
    { source: 'procore', target: 'demoscope', type: 'api_call', strength: 7, bidirectional: true },
    { source: 'onedrive', target: 'shear', type: 'data_flow', strength: 8, bidirectional: true },
    { source: 'demofield', target: 'field-hustle', type: 'data_flow', strength: 8 },
    { source: 'tenna', target: 'field-hustle', type: 'data_flow', strength: 7 },
    { source: 'clockshark', target: 'field-hustle', type: 'data_flow', strength: 6 },
    { source: 'fuelcloud', target: 'field-hustle', type: 'data_flow', strength: 5 },

    // Data sources
    { source: 'building-connected', target: 'bidsentry', type: 'data_flow', strength: 8 },
    { source: 'sharefile', target: 'bidsentry', type: 'data_flow', strength: 6 },
    { source: 'assembly-ai', target: 'sift', type: 'api_call', strength: 7 },

    // Validation workflow
    { source: 'riddler', target: 'gpt', type: 'api_call', strength: 9 },
    { source: 'gpt', target: 'grok', type: 'api_call', strength: 8 },
    { source: 'grok', target: 'gpt', type: 'data_flow', strength: 8 },
    { source: 'gpt', target: 'riddler', type: 'data_flow', strength: 9 }
  ];

  const getNodeColor = (node: NetworkNode): string => {
    switch (node.type) {
      case 'core': return '#1f2937'; // Dark gray
      case 'agent': return '#3b82f6'; // Blue
      case 'system': return '#10b981'; // Green
      case 'data_source': return '#8b5cf6'; // Purple
      case 'output': return '#f59e0b'; // Orange
      default: return '#6b7280'; // Gray
    }
  };

  const getLinkColor = (link: NetworkLink): string => {
    switch (link.type) {
      case 'data_flow': return '#3b82f6';
      case 'api_call': return '#10b981';
      case 'triggers': return '#f59e0b';
      case 'monitors': return '#ef4444';
      case 'stores': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 800;

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    const container = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force('link', d3.forceLink<NetworkNode, NetworkLink>(links)
        .id(d => d.id)
        .distance(d => 100 - d.strength * 5)
        .strength(d => d.strength / 10))
      .force('charge', d3.forceManyBody()
        .strength(d => -300 - d.importance * 20))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide()
        .radius(d => 30 + d.importance * 2));

    // Create arrow markers for directed links
    const defs = container.append('defs');
    
    ['data_flow', 'api_call', 'triggers', 'monitors', 'stores'].forEach(type => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', getLinkColor({ type } as NetworkLink));
    });

    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => getLinkColor(d))
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.strength) * 2)
      .attr('marker-end', d => d.bidirectional ? '' : `url(#arrow-${d.type})`);

    // Create bidirectional arrows for bidirectional links
    const bidirectionalLinks = container.append('g')
      .selectAll('line')
      .data(links.filter(d => d.bidirectional))
      .enter().append('line')
      .attr('stroke', d => getLinkColor(d))
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1)
      .attr('marker-start', d => `url(#arrow-${d.type})`);

    // Create nodes
    const node = container.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => 15 + d.importance * 2)
      .attr('fill', d => getNodeColor(d))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (15 + d.importance * 2) * 1.2);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 15 + d.importance * 2);
      })
      .on('click', (event, d) => {
        setSelectedNode(d);
        if (onNodeSelect) onNodeSelect(d);
      });

    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .attr('fill', '#374151')
      .style('pointer-events', 'none');

    // Add type indicators
    node.append('text')
      .text(d => d.type.charAt(0).toUpperCase())
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', '#ffffff')
      .style('pointer-events', 'none');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);

      bidirectionalLinks
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(20, 20)');

    const legendData = [
      { type: 'core', label: 'Core Systems', color: '#1f2937' },
      { type: 'agent', label: 'AI Agents', color: '#3b82f6' },
      { type: 'system', label: 'External Systems', color: '#10b981' },
      { type: 'data_source', label: 'Data Sources', color: '#8b5cf6' },
      { type: 'output', label: 'AI Validation', color: '#f59e0b' }
    ];

    legend.selectAll('g')
      .data(legendData)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)
      .each(function(d) {
        const g = d3.select(this);
        g.append('circle')
          .attr('r', 8)
          .attr('fill', d.color);
        g.append('text')
          .attr('x', 15)
          .attr('y', 4)
          .attr('font-family', 'Inter, sans-serif')
          .attr('font-size', '12px')
          .attr('fill', '#374151')
          .text(d.label);
      });

  }, [onNodeSelect]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any, 1.5
    );
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any, 1 / 1.5
    );
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().transform as any,
      d3.zoomIdentity
    );
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          title="Reset View"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-10 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Info size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-900">Network Overview</span>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Zoom: {(zoomLevel * 100).toFixed(0)}%</div>
          <div>Nodes: {nodes.length}</div>
          <div>Connections: {links.length}</div>
        </div>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height="800"
        className="border border-gray-200 rounded-lg bg-gray-50"
        viewBox="0 0 1200 800"
      />
    </div>
  );
};

export default NetworkGraph;