import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Navigation from './Navigation';
import WelcomeModal from '../shared/WelcomeModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Check if welcome modal has been shown before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const openHelpModal = () => {
    setShowWelcomeModal(true);
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      <Header onHelpClick={openHelpModal} />
      <Navigation />
      <main className="flex-1 p-4 md:p-6 mt-0 md:mt-16 mb-16 md:mb-0 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto"
        >
          {children}
        </motion.div>
      </main>

      {showWelcomeModal && (
        <WelcomeModal isOpen={showWelcomeModal} onClose={closeWelcomeModal} />
      )}
    </div>
  );
};

export default Layout;