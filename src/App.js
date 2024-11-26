import React from 'react';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import { Login, PertaminaDashboard } from './Pages';
// import Dashboard from './Pages/valida/Dasboard';
// import LoginPage from './Auth/Login/Login';
// import SettingsPage from './Pages/Setting';
// import UploadPage from './Pages/valida/Upload';
// import ScannedFilesPage from './Pages/valida/ScanFile';
// import TemplateSelectionPage from './Pages/TemplateSection';
// import FileAnalysisDashboard from './Pages/AnalyzeFile';
// import AnalyticsDashboard from './Pages/AnalyzeDashboard';
// import DocumentProcessingPage from './Pages/valida/ProccesPage';
// import DocumentReviewPage from './Pages/valida/Document/ReviewPage';
// import WindowHome from './Pages/valida/WindowDressing/WindowHome';

// Components for different routes

function App() {
  return (
    //<Router>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PertaminaDashboard />} />

        {/* <Route path="/dashboar-valida" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/scanned-files" element={<ScannedFilesPage />} />
        <Route path="/upload" element={<TemplateSelectionPage />} />
        <Route path="/upload/:document" element={<UploadPage />} />
        <Route path="/upload/:document/processed-file" element={<DocumentProcessingPage />} />
        <Route path="/upload/:document/processed-file/review-file" element={<DocumentReviewPage />} />
        <Route path="/analyzed-files" element={<AnalyticsDashboard />} />
        <Route path="/window-dressing" element={<WindowHome />} /> */}

      </Routes>
    </HashRouter>
    //</Router>
  );
}

export default App;
