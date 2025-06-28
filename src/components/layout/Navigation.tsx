import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Monitor, Shield, TrendingUp, Menu, X, FileText } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Agent Gallery', path: '/agents', icon: <Users size={20} /> },
    { name: 'Riddler OS', path: '/riddler-os', icon: <Monitor size={20} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} /> },
    { name: 'Field Ops & Compliance', path: '/field-ops', icon: <Shield size={20} /> },
    { name: 'Insights & Retraining', path: '/insights', icon: <TrendingUp size={20} /> },
  ];

  // Close menu when navigation happens
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Desktop navigation - always visible */}
      <div className="hidden md:flex fixed top-20 left-0 right-0 z-20 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center md:justify-start">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-4 transition-colors relative ${
                    isActive
                      ? 'text-black font-medium'
                      : 'text-secondary hover:text-black'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed right-4 top-4 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-2 transition-colors ${
                  isActive
                    ? 'text-black font-medium'
                    : 'text-secondary'
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name.split(' ')[0]}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <motion.nav
        initial={false}
        animate={isOpen ? { x: 0 } : { x: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:hidden w-full h-full bg-white border-r border-gray-200 shadow-sm z-20 md:translate-x-0"
      >
        <div className="p-6 pt-16 md:pt-6">
          <div className="space-y-8">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-black text-white font-medium'
                        : 'text-secondary hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black z-10"
        />
      )}
    </>
  );
};

export default Navigation;