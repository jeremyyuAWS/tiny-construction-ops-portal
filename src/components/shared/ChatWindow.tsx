import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { 
  ArrowRight, 
  RefreshCw, 
  PlayCircle, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Pause,
  SkipForward,
  Settings
} from 'lucide-react';
import { Demo, ConversationTurn } from '../../data/agents';
import ChatVisualizer from './ChatVisualizer';
import voiceSynth from '../../utils/voiceSynth';

interface ChatWindowProps {
  demo: Demo;
  onClose: () => void;
  onChangeDemo: (direction: 'next' | 'prev') => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ demo, onClose, onChangeDemo }) => {
  const [visibleMessages, setVisibleMessages] = useState<ConversationTurn[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const pauseRef = useRef(false);

  const playDemo = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsComplete(false);
    pauseRef.current = false;
    
    if (voiceEnabled) {
      voiceSynth.stop();
    }
  };

  const pauseDemo = () => {
    setIsPaused(true);
    setIsPlaying(false);
    pauseRef.current = true;
    if (voiceEnabled) {
      voiceSynth.stop();
    }
  };

  const resumeDemo = () => {
    setIsPaused(false);
    setIsPlaying(true);
    pauseRef.current = false;
  };

  const skipToNext = () => {
    if (currentIndex < demo.conversation.length - 1) {
      const nextMessage = demo.conversation[currentIndex];
      setVisibleMessages(prev => [...prev, nextMessage]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsComplete(false);
    setIsPlaying(false);
    setIsPaused(false);
    pauseRef.current = false;
    
    if (voiceEnabled) {
      voiceSynth.stop();
    }
  }, [demo]);

  useEffect(() => {
    if (isPlaying && !pauseRef.current && currentIndex < demo.conversation.length) {
      const currentMessage = demo.conversation[currentIndex];
      const messageDelay = currentMessage.role === 'user' ? 800 : 1200;
      
      const timer = setTimeout(() => {
        if (!pauseRef.current) {
          setVisibleMessages(prev => [...prev, currentMessage]);
          
          if (voiceEnabled && currentMessage.role === 'agent') {
            setIsVoiceSpeaking(true);
            voiceSynth.speak(currentMessage.message, demo.title);
            
            const checkSpeaking = setInterval(() => {
              if (!voiceSynth.isSpeaking() || pauseRef.current) {
                setIsVoiceSpeaking(false);
                clearInterval(checkSpeaking);
                
                if (!pauseRef.current) {
                  if (currentIndex < demo.conversation.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                  } else {
                    setIsComplete(true);
                    setIsPlaying(false);
                  }
                }
              }
            }, 300);
          } else {
            const nextTimer = setTimeout(() => {
              if (!pauseRef.current) {
                if (currentIndex < demo.conversation.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  setIsComplete(true);
                  setIsPlaying(false);
                }
              }
            }, currentMessage.role === 'agent' ? 2500 : 1000);
            
            return () => clearTimeout(nextTimer);
          }
        }
      }, messageDelay / playbackSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentIndex, demo.conversation, voiceEnabled, playbackSpeed, demo.title]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages]);

  const toggleVoice = () => {
    if (voiceEnabled) {
      voiceSynth.stop();
      setIsVoiceSpeaking(false);
    }
    
    setVoiceEnabled(!voiceEnabled);
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      } 
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const progress = demo.conversation.length > 0 ? (visibleMessages.length / demo.conversation.length) * 100 : 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-primary">{demo.title}</h3>
            <p className="text-sm text-secondary mt-1">{demo.description}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button 
              onClick={toggleVoice} 
              className={`p-2 rounded-full transition-all duration-200 ${voiceEnabled 
                ? 'bg-accent-blue bg-opacity-10 text-accent-blue shadow-sm' 
                : 'hover:bg-gray-200 text-gray-500'}`}
              title={voiceEnabled ? 'Voice enabled' : 'Voice disabled'}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button 
              onClick={() => onChangeDemo('prev')}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
              title="Previous demo"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => onChangeDemo('next')}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
              title="Next demo"
            >
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={onClose}
              className="ml-2 px-3 py-1.5 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-accent-blue to-accent-indigo h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{visibleMessages.length} of {demo.conversation.length} messages</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {visibleMessages.map((message, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={messageVariants}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-gray-100 to-gray-200 text-primary'
                    : 'bg-gradient-to-br from-gray-900 to-black text-white'
                }`}
              >
                {index === visibleMessages.length - 1 && message.role === 'agent' && isPlaying ? (
                  <TypeAnimation
                    sequence={[message.message]}
                    speed={70}
                    cursor={false}
                    className="whitespace-pre-line text-sm leading-relaxed"
                  />
                ) : (
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.message}</p>
                )}
                
                {message.visualType && (
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <ChatVisualizer type={message.visualType} data={message.visualData} />
                  </motion.div>
                )}
                
                <div className={`text-xs mt-2 text-right ${
                  message.role === 'user' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isPlaying && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-4 max-w-[85%]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-gray-300">
                  {isVoiceSpeaking ? 'Speaking...' : 'Processing...'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      {/* Playback controls */}
      {!isPlaying && !isComplete && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="speed-control" className="text-sm text-secondary block mb-1">
                Playback Speed:
              </label>
              <select
                id="speed-control"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value={0.5}>0.5x (Slow)</option>
                <option value={1}>1x (Normal)</option>
                <option value={1.5}>1.5x (Fast)</option>
                <option value={2}>2x (Very Fast)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-secondary block mb-1">
                Voice Narration:
              </label>
              <div className="flex items-center h-10">
                <input
                  type="checkbox"
                  id="voice-toggle"
                  checked={voiceEnabled}
                  onChange={toggleVoice}
                  className="mr-2"
                />
                <label htmlFor="voice-toggle" className="text-sm">
                  Enable voice narration
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={playDemo}
            className="w-full py-3 bg-gradient-to-r from-accent-blue to-accent-indigo text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm"
          >
            <PlayCircle size={18} className="mr-2" />
            <span>Start Demo</span>
          </button>
        </div>
      )}

      {/* Pause/Resume controls */}
      {(isPlaying || isPaused) && !isComplete && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={isPaused ? resumeDemo : pauseDemo}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-indigo text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
            >
              {isPaused ? <PlayCircle size={16} className="mr-2" /> : <Pause size={16} className="mr-2" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            
            <button
              onClick={skipToNext}
              disabled={currentIndex >= demo.conversation.length - 1}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward size={16} className="mr-2" />
              <span>Skip</span>
            </button>
            
            <div className="text-sm text-gray-500 flex items-center">
              {isVoiceSpeaking && voiceEnabled && (
                <>
                  <Volume2 size={14} className="mr-1" />
                  Speaking...
                </>
              )}
              {isPlaying && !isVoiceSpeaking && (
                <>
                  <Settings size={14} className="mr-1 animate-spin" />
                  Processing...
                </>
              )}
              {isPaused && (
                <>
                  <Pause size={14} className="mr-1" />
                  Paused
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Controls after demo completes */}
      {isComplete && (
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="text-center mb-3">
            <div className="text-sm font-medium text-green-700 mb-1">Demo Completed!</div>
            <div className="text-xs text-gray-600">What would you like to do next?</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={playDemo}
              className="py-2 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
            >
              <RefreshCw size={16} className="mr-2" />
              <span>Replay</span>
            </button>
            <button
              onClick={() => onChangeDemo('next')}
              className="py-2 bg-gradient-to-r from-accent-blue to-accent-indigo text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm"
            >
              <span>Next Demo</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;