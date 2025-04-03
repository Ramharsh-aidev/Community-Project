// src/features/budgetPlanner/BudgetReport.jsx
import React from 'react';

const BudgetReport = ({ report, loading, isInitialized, error, modelUsedForInit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Your AI Budget Report</h2>
      {isInitialized && modelUsedForInit && (
        <p className="text-xs text-gray-500 text-center mb-4">
          Using AI Model: {modelUsedForInit}
        </p>
      )}
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none min-h-[200px] text-gray-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-gray-600">Generating report...</p>
          </div>
        ) : report ? (
          <pre className="whitespace-pre-wrap font-sans text-sm">{report}</pre>
        ) : (
          <div className="text-gray-500 italic text-center py-12">
            {isInitialized ? 'Enter your details above and click "Generate Budget Plan" to see your personalized report.' : error ? 'Could not initialize AI. See error message above.' : 'Initializing AI or waiting for API key...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetReport;