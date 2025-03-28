// src/features/pdfRiskAnalysis/RiskAnalysisResults.jsx
import React from 'react';

const RiskAnalysisResults = ({ analysisResults }) => {
    if (!analysisResults) {
        return <p>No analysis results yet. Upload a PDF to get started.</p>;
    }

    if (analysisResults.length === 0) {
        return <p>No significant risks found in the policy based on the analysis.</p>; // Handle empty array case explicitly
    }

    return (
        <div>
            <h3>Risk Analysis Results:</h3>
            <ul>
                {analysisResults.map((result, index) => (
                    <li key={index}>
                        <p><strong>Issue:</strong> {result.issue || 'N/A'}</p>
                        <p><strong>Description:</strong> {result.description || 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RiskAnalysisResults;