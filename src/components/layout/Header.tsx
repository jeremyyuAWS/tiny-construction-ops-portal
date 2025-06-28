import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/images/tinys-logo-square.png" alt="Tiny's Logo" className="h-20 w-auto" />
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-primary">
              Riddler
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
              GPT → Grok → GPT Validation
            </div>
          </div>
          <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
            Contact Tiny's
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;