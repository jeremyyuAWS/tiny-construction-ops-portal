import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AgentGallery from '../pages/AgentGallery';
import RiddlerOS from '../pages/RiddlerOS';
import FieldOpsCompliance from '../pages/FieldOpsCompliance';
import InsightsRetraining from '../pages/InsightsRetraining';
import DocumentManagement from '../pages/DocumentManagement';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/agents" element={<AgentGallery />} />
      <Route path="/riddler-os" element={<RiddlerOS />} />
      <Route path="/field-ops" element={<FieldOpsCompliance />} />
      <Route path="/insights" element={<InsightsRetraining />} />
      <Route path="/documents" element={<DocumentManagement />} />
      <Route path="*" element={<Navigate to="/agents" replace />} />
    </Routes>
  );
};

export default AppRoutes;