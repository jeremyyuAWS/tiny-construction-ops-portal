import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AgentGallery from '../pages/AgentGallery';
import OpsPortal from '../pages/OpsPortal';
import ArbitorRiddler from '../pages/ArbitorRiddler';
import FieldOpsCompliance from '../pages/FieldOpsCompliance';
import InsightsRetraining from '../pages/InsightsRetraining';
import DocumentManagement from '../pages/DocumentManagement';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/agents" element={<AgentGallery />} />
      <Route path="/ops-portal" element={<OpsPortal />} />
      <Route path="/arbitor-riddler" element={<ArbitorRiddler />} />
      <Route path="/field-ops" element={<FieldOpsCompliance />} />
      <Route path="/insights" element={<InsightsRetraining />} />
      <Route path="/documents" element={<DocumentManagement />} />
      {/* Legacy route redirect */}
      <Route path="/riddler-os" element={<Navigate to="/ops-portal" replace />} />
      <Route path="*" element={<Navigate to="/agents" replace />} />
    </Routes>
  );
};

export default AppRoutes;