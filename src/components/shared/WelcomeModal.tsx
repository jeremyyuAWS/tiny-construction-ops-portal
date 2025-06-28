import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Hammer, Users, BarChart3, Brain } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: 'Welcome to Riddler',
      description: 'AI-powered operating system for Tiny\'s Demolition & Recycling, automating communications, document routing, and compliance monitoring.',
      icon: <Hammer size={36} className="text-accent-blue" />,
    },
    {
      title: 'Explore Construction Agents',
      description: 'Discover specialized AI agents for demolition operations including Sift, Fang, Triage, and more with real-time demonstrations.',
      icon: <Users size={36} className="text-accent-blue" />,
    },
    {
      title: 'Monitor Field Operations',
      description: 'Track site-level activity, GPS validation, compliance monitoring, and integration with DemoField, Tenna, and other field tools.',
      icon: <Brain size={36} className="text-accent-blue" />,
    },
    {
      title: 'Data-Driven Insights',
      description: 'Analyze win/loss patterns, agent performance, and continuous model retraining for improved accuracy and business outcomes.',
      icon: <BarChart3 size={36} className="text-accent-blue" />,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="font-bold text-lg">Riddler Demo</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 h-64 flex flex-col justify-center">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{steps[step].icon}</div>
                <h3 className="text-xl font-bold mb-2">{steps[step].title}</h3>
                <TypeAnimation
                  sequence={[steps[step].description]}
                  wrapper="p"
                  speed={70}
                  className="text-gray-600"
                />
              </motion.div>
            </div>

            <div className="p-4 bg-gray-50 flex justify-between">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-6 rounded-full ${
                      index === step ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="flex items-center space-x-1 px-4 py-2 bg-black text-white rounded-md"
              >
                <span>{step === steps.length - 1 ? 'Get Started' : 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;