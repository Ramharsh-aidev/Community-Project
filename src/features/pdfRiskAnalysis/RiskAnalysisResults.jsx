// src/features/pdfRiskAnalysis/RiskAnalysisResults.jsx
import React from 'react';

const RiskAnalysisResults = ({ analysisResults }) => {
    if (!analysisResults) {
        return <p className="text-gray-600 italic">No analysis results yet. Upload a PDF to get started.</p>; // Italic text
    }

    if (analysisResults.length === 0) {
        return <p className="text-gray-600 italic">No significant risks found in the policy based on the analysis.</p>; // Italic text
    }

    return (
        <div className="space-y-4"> {/* Add vertical spacing between results */}
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Identified Issues:</h4> {/* Subheading for issues */}
            <ul>
                {analysisResults.map((result, index) => (
                    <li key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm"> {/* Style each result item */}
                        <p><strong className="font-semibold text-gray-800">Issue:</strong> {result.issue || 'N/A'}</p>
                        <p className="text-gray-700"><strong className="font-semibold text-gray-800">Description:</strong> {result.description || 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RiskAnalysisResults;