import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Layout>
          <AppRoutes />
        </Layout>
      </AnimatePresence>
    </Router>
  );
}

export default App;