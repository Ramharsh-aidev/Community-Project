// src/pages/PDFRiskAnalysisPage.jsx
import React, { useState } from 'react';
import RiskAnalysisResults from '../features/pdfRiskAnalysis/RiskAnalysisResults';
import LoadingWrapper from '../components/ui/LoadingWrapper';
import { useDropzone } from 'react-dropzone';
import { InboxOutlined } from '@mui/icons-material';

const PDFRiskAnalysisPage = () => {
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleFileUpload = async (file) => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResults(null);
        setUploadedFileName(file.name);

        try {
            const formData = new FormData();
            formData.append('pdfFile', file);

            const response = await fetch('/api/pdf-risk-analysis', { // Your API endpoint (make sure backend is running on port 5000 if testing locally)
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            setAnalysisResults(data.results);
        } catch (error) {
            console.error("Analysis Error:", error);
            setAnalysisError("Error analyzing PDF. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: acceptedFiles => {
            if (acceptedFiles && acceptedFiles[0]) {
                handleFileUpload(acceptedFiles[0]);
            }
        },
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    return (
        <LoadingWrapper loading={isAnalyzing}>
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">PDF Financial Risk Analysis</h2>
                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="flex-1 p-6 border-r border-gray-200 bg-white">
                        <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-6 cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 transition-colors duration-200`}>
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center justify-center">
                                <InboxOutlined style={{ fontSize: 60, color: '#9ca3af' }} />
                                <p className="text-gray-500 mt-2 text-sm">
                                    <span className="font-semibold">Drag and drop PDF here</span>
                                    or <label htmlFor="file-upload" className="text-blue-500 cursor-pointer hover:underline">browse files</label>
                                </p>
                                <p className="text-gray-500 text-xs mt-1">(Only *.pdf files are supported)</p>
                                <input id="file-upload" type="file" accept=".pdf" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]); }} className="hidden"/>
                            </div>
                        </div>
                        {uploadedFileName && <p className="mt-3 text-sm text-gray-600">Uploaded file: <span className="font-semibold">{uploadedFileName}</span></p>}
                        {analysisError && <p className="mt-3 text-red-500">{analysisError}</p>}
                    </div>
                    <div className="flex-1 p-6 bg-gray-50">
                        <div className="bg-white p-4 rounded-md shadow-inner h-full flex flex-col justify-start">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Analysis Results</h3>
                            <div className="overflow-auto">
                                <RiskAnalysisResults analysisResults={analysisResults} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default PDFRiskAnalysisPage;