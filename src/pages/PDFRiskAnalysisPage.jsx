// src/pages/PDFRiskAnalysisPage.jsx
import React, { useState } from 'react';
import RiskAnalysisResults from '../features/pdfRiskAnalysis/RiskAnalysisResults';
import LoadingWrapper from '../components/ui/LoadingWrapper'; // Assuming you have this
import { useDropzone } from 'react-dropzone';
import { InboxOutlined } from '@mui/icons-material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'; // For success/error icons

const PDFRiskAnalysisPage = () => {
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [analysisSuccess, setAnalysisSuccess] = useState(false); // State for success message

    const handleFileUpload = async (file) => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResults(null);
        setUploadedFileName(file.name);
        setAnalysisSuccess(false); // Reset success state

        try {
            const formData = new FormData();
            formData.append('pdfFile', file);

            const response = await fetch('/api/pdf-risk-analysis', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            setAnalysisResults(data.results);
            setAnalysisSuccess(true); // Set success state if API call is ok
        } catch (error) {
            console.error("Analysis Error:", error);
            setAnalysisError("Failed to analyze PDF. Please try again.");
            setAnalysisSuccess(false); // Ensure success is false on error
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
            <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans"> {/* Full height and centering */}
                <div className="container mx-auto p-8 max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden"> {/* Card container */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center"> {/* Centered title, larger font */}
                        <span className="text-blue-500">PDF</span> Financial Risk Analysis
                    </h2>
                    <div className="flex flex-col md:flex-row shadow-md rounded-lg overflow-hidden"> {/* Flex for side-by-side layout on medium screens and up */}
                        <div className="flex-1 p-8 border-r border-gray-200 bg-white flex flex-col justify-between"> {/* Left side: Upload */}
                            <div>
                                <div {...getRootProps()} className={`rounded-md p-6 cursor-pointer border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'} transition-colors duration-200`}>
                                    <input {...getInputProps()} id="file-upload-input" />
                                    <div className="flex flex-col items-center justify-center">
                                        <InboxOutlined style={{ fontSize: 70, color: '#9ca3af' }} /> {/* Larger icon */}
                                        <p className="text-gray-600 mt-3 text-sm text-center">
                                            <span className="font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => document.getElementById('file-upload-input').click()}> {/* Make "browse files" clickable */}
                                                Drag and drop PDF here or browse files
                                            </span>
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">(Only *.pdf files are supported)</p>
                                    </div>
                                </div>
                                <input id="file-upload" type="file" accept=".pdf" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]); }} className="hidden"/>
                                {uploadedFileName && <p className="mt-4 text-sm text-gray-600">Uploaded: <span className="font-semibold">{uploadedFileName}</span></p>}
                            </div>
                            <div> {/* Status messages area */}
                                {analysisError && (
                                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                                        <ErrorOutline className="mr-2" />
                                        <p>{analysisError}</p>
                                    </div>
                                )}
                                {analysisSuccess && analysisResults && ( // Success message when results are available
                                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                                        <CheckCircleOutline className="mr-2" />
                                        <p>Analysis successful. Results are shown below.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 p-8 bg-gray-50"> {/* Right side: Results */}
                            <div className="bg-white p-6 rounded-md shadow-inner h-full flex flex-col justify-start">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Analysis Results</h3> {/* Subtitle for results */}
                                <div className="overflow-auto">
                                    <RiskAnalysisResults analysisResults={analysisResults} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default PDFRiskAnalysisPage;