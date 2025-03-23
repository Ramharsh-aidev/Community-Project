import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your page components
import HomePage from '../features/home/pages/HomePage';
// import FinancialQuestionResolverPage from '../features/chatAI/pages/FinancialQuestionResolverPage';
// import ShareDataAnalysisPage from '../features/chatAI/pages/ShareDataAnalysisPage';
// import LiveShareTrackingPage from '../features/dataAnalysis/pages/LiveShareTrackingPage';
// import PDFRiskAnalysisPage from '../features/pdfRiskAnalysis/pages/PDFRiskAnalysisPage';
// import BudgetPlannerPage from '../features/budgetPlanner/pages/BudgetPlannerPage';
// import LoginPage from '../features/auth/pages/LoginPage';
// import RegisterPage from '../features/auth/pages/RegisterPage';
// import TermsAndConditionsPage from '../pages/TermsAndConditionsPage'; 
// import AboutPage from '../pages/AboutPage';
function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} /> 
                <Route path="/home" element={<HomePage />} /> 
                {/* <Route path="/financial-advice" element={<FinancialQuestionResolverPage />} />
                <Route path="/share-analysis" element={<ShareDataAnalysisPage />} />
                <Route path="/live-tracking" element={<LiveShareTrackingPage />} />
                <Route path="/pdf-risk-analysis" element={<PDFRiskAnalysisPage />} />
                <Route path="/budget-planner" element={<BudgetPlannerPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/about" element={<AboutPage />} />

                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> */}

                {/* You can add more routes here as needed */}

            </Routes>
        </Router>
    );
}

export default AppRoutes;