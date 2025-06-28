import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, RotateCw, User, Bot, AlertTriangle, CheckCircle, Database, Brain, MessageSquare } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: string[];
  validationStage?: 'gpt-initial' | 'grok-review' | 'gpt-final';
  metadata?: {
    permissionCheck?: boolean;
    securityAlert?: boolean;
    dataAccess?: string[];
  };
}

interface RiddlerChatProps {
  selectedNodeContext?: any;
}

const RiddlerChat: React.FC<RiddlerChatProps> = ({ selectedNodeContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Riddler conversational interface initialized. Connected to Arbitor data repository. Permission level: Administrator. How can I help you today?',
      timestamp: new Date(),
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [validationStep, setValidationStep] = useState<'idle' | 'gpt-processing' | 'grok-validating' | 'gpt-finalizing'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample queries from Bill's specifications
  const sampleQueries = [
    "How many dumpsters were used at VUMC Micro Lab?",
    "Dumpster cost in Chattanooga?", 
    "Who provided dumpsters?",
    "Show me recent fraud alerts from Fang",
    "What's the status of 615 Main Street project?",
    "Jerry's salary?",
    "List all active bids",
    "Field data from last week"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (query: string = inputValue) => {
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate GPT → Grok → GPT validation workflow
    await simulateValidationWorkflow(query);
  };

  const simulateValidationWorkflow = async (query: string) => {
    const isPermissionDenied = query.toLowerCase().includes('salary') || 
                               query.toLowerCase().includes('payroll') ||
                               query.toLowerCase().includes('jerry');

    // Step 1: GPT Initial Processing
    setValidationStep('gpt-processing');
    await new Promise(resolve => setTimeout(resolve, 1500));

    let initialResponse = getInitialResponse(query);
    let confidence = isPermissionDenied ? 100 : Math.floor(Math.random() * 15) + 85;

    const gptMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: initialResponse,
      timestamp: new Date(),
      confidence,
      validationStage: 'gpt-initial',
      sources: ['Arbitor Database', 'Real-time Systems'],
      metadata: {
        permissionCheck: isPermissionDenied,
        securityAlert: isPermissionDenied,
        dataAccess: isPermissionDenied ? [] : ['Projects', 'Vendors', 'Equipment']
      }
    };

    if (isPermissionDenied) {
      setMessages(prev => [...prev, gptMessage]);
      setIsLoading(false);
      setValidationStep('idle');
      return;
    }

    setMessages(prev => [...prev, gptMessage]);

    // Step 2: Grok Validation
    setValidationStep('grok-validating');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const grokMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      role: 'system',
      content: '🔍 Grok validation completed. Found minor data gaps in vendor contact details. Refining response...',
      timestamp: new Date(),
      validationStage: 'grok-review'
    };

    setMessages(prev => [...prev, grokMessage]);

    // Step 3: GPT Final Response
    setValidationStep('gpt-finalizing');
    await new Promise(resolve => setTimeout(resolve, 1500));

    const refinedResponse = getRefinedResponse(query);
    const finalConfidence = Math.min(confidence + 8, 99);

    const finalMessage: ChatMessage = {
      id: (Date.now() + 3).toString(),
      role: 'assistant',
      content: refinedResponse,
      timestamp: new Date(),
      confidence: finalConfidence,
      validationStage: 'gpt-final',
      sources: ['Arbitor Database', 'Procore Integration', 'Vendor Records', 'GPS Data'],
      metadata: {
        permissionCheck: false,
        dataAccess: ['Projects', 'Vendors', 'Equipment', 'GPS Coordinates']
      }
    };

    setMessages(prev => [...prev, finalMessage]);
    setIsLoading(false);
    setValidationStep('idle');
  };

  const getInitialResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('dumpster') && lowerQuery.includes('vumc')) {
      return "Based on Arbitor records: VUMC Micro Lab project used 17 C&D dumpsters and 3 recycling dumpsters. Total capacity utilized: 510 cubic yards.";
    }
    
    if (lowerQuery.includes('dumpster') && lowerQuery.includes('cost') && lowerQuery.includes('chattanooga')) {
      return "Chattanooga dumpster pricing: $450 per 30-yard dumpster, includes 5 tons of debris disposal. Additional tonnage billed at $101 per ton.";
    }
    
    if (lowerQuery.includes('who provided dumpster')) {
      return "Primary dumpster vendor: Waste Management Solutions (Contact: Mike Johnson, 615-555-0123). Rating: 4.8/5 stars. Alternative vendor: Southern Waste Services.";
    }
    
    if (lowerQuery.includes('salary') || lowerQuery.includes('jerry')) {
      return "🔒 Access denied. Unauthorized payroll query detected. Security alert #PAY-2024-0315 triggered. Bill Fay has been notified.";
    }
    
    if (lowerQuery.includes('615 main')) {
      return "615 Main Street Project Status: 60% complete. Current phase: 2nd floor demolition. Equipment on-site: CAT 320, Volvo L60H. Next milestone: basement excavation (March 25).";
    }
    
    if (lowerQuery.includes('fraud') || lowerQuery.includes('fang')) {
      return "Recent Fang alerts: 2 medium-risk flags this week. QuickDemo LLC flagged for cash-only requests. Construction Services Inc. flagged for incomplete documentation.";
    }
    
    if (lowerQuery.includes('bid')) {
      return "Active bids: 3 projects. 450 Commerce Street ($2.8M, Turner Construction - 72% win probability). Riverside Office ($1.2M, Skanska - 45% probability). Downtown Garage (awarded).";
    }
    
    return "I can access that information from Arbitor. Let me process your request through our validation workflow.";
  };

  const getRefinedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('dumpster') && lowerQuery.includes('vumc')) {
      return "✅ Validated Response: VUMC Micro Lab demolition project (Project #VUMC-2024-001) utilized:\n• 17 C&D dumpsters (30-yard capacity each)\n• 3 recycling dumpsters (20-yard capacity each)\n• Total debris: 487 tons processed\n• GPS verified: All dumpsters placed within site boundaries\n• Completion date: February 15, 2024\n• Vendor performance rating: 5/5 stars";
    }
    
    if (lowerQuery.includes('dumpster') && lowerQuery.includes('cost') && lowerQuery.includes('chattanooga')) {
      return "✅ Verified Chattanooga Pricing (Contract #CHAT-2024-WM):\n• Base rate: $450 per 30-yard dumpster\n• Includes: 5 tons disposal, delivery, pickup\n• Overage: $101 per additional ton\n• Fuel surcharge: $25 (variable)\n• Available sizes: 10, 20, 30, 40-yard\n• Contract expires: December 31, 2024\n• Volume discount: 10% for orders >20 units/month";
    }
    
    if (lowerQuery.includes('who provided dumpster')) {
      return "✅ Primary Vendor Details:\n**Waste Management Solutions**\n• Contact: Mike Johnson, Operations Manager\n• Phone: 615-555-0123 | Email: mjohnson@wmsolutions.com\n• Address: 1234 Industrial Blvd, Nashville, TN\n• Service rating: 4.8/5 (based on 127 projects)\n• Insurance: $5M liability (verified current)\n• Certifications: EPA compliant, OSHA certified\n• Response time: <2 hours for emergency service";
    }
    
    return "✅ Response validated and enhanced with additional context from Arbitor's comprehensive data repository.";
  };

  const getValidationStageInfo = () => {
    switch (validationStep) {
      case 'gpt-processing':
        return { icon: <Brain className="animate-pulse" size={16} />, text: 'ChatGPT processing...', color: 'text-blue-600' };
      case 'grok-validating':
        return { icon: <CheckCircle className="animate-spin" size={16} />, text: 'Grok validating...', color: 'text-yellow-600' };
      case 'gpt-finalizing':
        return { icon: <Brain className="animate-pulse" size={16} />, text: 'ChatGPT finalizing...', color: 'text-green-600' };
      default:
        return null;
    }
  };

  const getMessageIcon = (message: ChatMessage) => {
    if (message.role === 'user') return <User size={16} />;
    if (message.role === 'system') return <Database size={16} />;
    
    switch (message.validationStage) {
      case 'gpt-initial':
        return <Brain size={16} className="text-blue-600" />;
      case 'grok-review':
        return <CheckCircle size={16} className="text-yellow-600" />;
      case 'gpt-final':
        return <Brain size={16} className="text-green-600" />;
      default:
        return <Bot size={16} />;
    }
  };

  const getMessageBorderColor = (message: ChatMessage) => {
    if (message.metadata?.securityAlert) return 'border-red-200 bg-red-50';
    if (message.validationStage === 'gpt-final') return 'border-green-200 bg-green-50';
    if (message.validationStage === 'grok-review') return 'border-yellow-200 bg-yellow-50';
    return 'border-gray-200 bg-white';
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Riddler</h3>
              <p className="text-sm text-gray-600">Conversational interface to Arbitor data</p>
            </div>
          </div>
          
          {validationStep !== 'idle' && (
            <div className="flex items-center space-x-2">
              {getValidationStageInfo() && (
                <>
                  <span className={`text-sm ${getValidationStageInfo()!.color}`}>
                    {getValidationStageInfo()!.text}
                  </span>
                  {getValidationStageInfo()!.icon}
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Validation Workflow Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>GPT → Grok → GPT Validation Active</span>
          <span>95%+ accuracy guaranteed</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 rounded-lg border ${getMessageBorderColor(message)} ${
                  message.role === 'user' ? 'bg-blue-600 text-white border-blue-600' : ''
                }`}>
                  <div className="flex items-start space-x-2">
                    <div className={`p-1 rounded ${message.role === 'user' ? 'bg-blue-500' : 'bg-gray-100'}`}>
                      {getMessageIcon(message)}
                    </div>
                    <div className="flex-1">
                      {message.id === messages[messages.length - 1]?.id && isLoading && message.role === 'assistant' ? (
                        <TypeAnimation
                          sequence={[message.content]}
                          speed={70}
                          cursor={false}
                          className="whitespace-pre-line text-sm"
                        />
                      ) : (
                        <p className="whitespace-pre-line text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message metadata */}
                  <div className="mt-2 pt-2 border-t border-opacity-20 border-gray-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className={message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      
                      {message.confidence && (
                        <div className="flex items-center space-x-2">
                          {message.validationStage && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              message.validationStage === 'gpt-final' ? 'bg-green-100 text-green-700' :
                              message.validationStage === 'grok-review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {message.validationStage}
                            </span>
                          )}
                          <span className={message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}>
                            {message.confidence}% confidence
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-1">
                        <span className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          Sources: {message.sources.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {message.metadata?.securityAlert && (
                      <div className="mt-1 flex items-center space-x-1 text-red-600">
                        <AlertTriangle size={12} />
                        <span className="text-xs">Security alert triggered</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Sample Queries */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600 mb-2">Try these sample queries:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.slice(0, 4).map((query, index) => (
            <button
              key={index}
              onClick={() => handleSubmit(query)}
              disabled={isLoading}
              className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              "{query}"
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask Riddler anything about Tiny's operations..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          
          <button
            onClick={() => setIsListening(!isListening)}
            disabled={isLoading}
            className={`p-2 rounded-lg border transition-colors ${
              isListening 
                ? 'bg-red-600 text-white border-red-600' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            } disabled:opacity-50`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading || !inputValue.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <RotateCw size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiddlerChat;