// src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Import your page components
import HomePage from '../features/home/pages/HomePage';
// import FinancialQuestionResolverPage from '../features/chatAI/pages/FinancialQuestionResolverPage'; // Assuming path, adjust if needed
// import ShareDataAnalysisPage from '../features/chatAI/pages/ShareDataAnalysisPage'; // Example protected route - uncomment and adjust path if needed
// import LiveShareTrackingPage from '../features/dataAnalysis/pages/LiveShareTrackingPage'; // Example protected route - uncomment and adjust path if needed
// import PDFRiskAnalysisPage from '../features/pdfRiskAnalysis/pages/PDFRiskAnalysisPage'; // Example protected route - uncomment and adjust path if needed
// import BudgetPlannerPage from '../features/budgetPlanner/pages/BudgetPlannerPage'; // Example protected route - uncomment and adjust path if needed
// import TermsAndConditionsPage from '../pages/TermsAndConditionsPage'; // Example public route - uncomment and adjust path if needed
// import AboutPage from '../pages/AboutPage'; // Example public route - uncomment and adjust path if needed
import SignInPage from '../features/auth/pages/SignInPage'; // Adjust path if needed!
import SignUpPage from '../features/auth/pages/SignUpPage'; // Adjust path if needed!
import { useAuth } from '@clerk/clerk-react'; // Import useAuth

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
};


function AppRoutes() {
    return (
        // <Router> {/* REMOVE: No Router needed here */}
            <Routes>
                {/* Public Routes - Sign In, Sign Up, HomePage, and AI Chat are PUBLIC */}
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/" element={<HomePage />} />         {/* HomePage is PUBLIC */}
                <Route path="/home" element={<HomePage />} />     {/* HomePage is PUBLIC */}
                {/* <Route path="/financial-advice" element={<FinancialQuestionResolverPage />} />  */}


                {/* Protected Routes - Add ProtectedRoute for routes that need login */}
                {/* Example of protected routes - Uncomment and adjust paths and components as needed: */}
                {/*
                <Route path="/share-analysis" element={
                    <ProtectedRoute>
                        <ShareDataAnalysisPage />
                    </ProtectedRoute>
                } />
                <Route path="/live-tracking" element={
                    <ProtectedRoute>
                        <LiveShareTrackingPage />
                    </ProtectedRoute>
                } />
                <Route path="/pdf-risk-analysis" element={
                    <ProtectedRoute>
                        <PDFRiskAnalysisPage />
                    </ProtectedRoute>
                } />
                <Route path="/budget-planner" element={
                    <ProtectedRoute>
                        <BudgetPlannerPage />
                    </ProtectedRoute>
                } />
                */}

                {/* Public Routes - Terms and About remain public - Examples, uncomment if needed */}
                {/*
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                */}


                {/* You can add more routes here as needed */}

            </Routes>
        // </Router> {/* REMOVE: No Router needed here */}
    );
}

export default AppRoutes;