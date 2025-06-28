import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  onHelpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm relative"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/images/tinys-logo-square.png" alt="Tiny's Logo" className="h-20 w-auto" />
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-primary">
              OpsPortal
            </h1>
            <p className="text-xs text-accent-indigo">
              AI-Powered Operating System for Construction
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Arbitor • Riddler • OpsPortal
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-secondary px-3 py-1 rounded-full bg-gray-100">
              Demolition & Recycling
            </div>
            <div className="text-xs text-gray-500 mt-1">
              GPT → Grok → GPT Validation (95%+ accuracy)
            </div>
          </div>
          <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
            Contact Tiny's
          </button>
        </div>
      </div>
      
      {/* Help Button */}
      <button
        onClick={onHelpClick}
        className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg group"
        title="Help & System Overview"
      >
        <HelpCircle size={20} />
        <div className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Help & Overview
        </div>
      </button>
    </motion.header>
  );
};

export default Header;