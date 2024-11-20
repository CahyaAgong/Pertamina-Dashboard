import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './Auth/Login/Login';
import Dashboard from './Dasboard';
import SettingsPage from './Pages/Setting';
import UploadPage from './Pages/Upload';
import ScannedFilesPage from './Pages/ScanFile';
import TemplateSelectionPage from './Pages/TemplateSection';
import FileAnalysisDashboard from './Pages/AnalyzeFile';
import AnalyticsDashboard from './Pages/AnalyzeDashboard';
import DocumentProcessingPage from './Pages/Document/ProccesPage';
import DocumentReviewPage from './Pages/Document/ReviewPage';
import WindowHome from './Pages/WindowDressing/WindowHome';

// Components for different routes

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/scanned-files" element={<ScannedFilesPage />} />
          <Route path="/upload" element={<TemplateSelectionPage />} />
          <Route path="/upload/:document" element={<UploadPage />} />
          <Route path="/upload/:document/processed-file" element={<DocumentProcessingPage />} />
          <Route path="/upload/:document/processed-file/review-file" element={<DocumentReviewPage />} />
          <Route path="/analyzed-files" element={<AnalyticsDashboard />} />
          <Route path="/window-dressing" element={<WindowHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
