// PDFRiskAnalysisPage.jsx
import React from 'react';
import RiskAnalysisResults from '../features/pdfRiskAnalysis/RiskAnalysisResults';
import LoadingWrapper from '../components/ui/LoadingWrapper';
import { useDropzone } from 'react-dropzone';
import { InboxOutlined, PictureAsPdfOutlined } from '@mui/icons-material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
import { useState } from 'react';

const PDFRiskAnalysisPage = () => {
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [analysisSuccess, setAnalysisSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = async (file) => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResults(null);
        setAnalysisSuccess(false);

        try {
            const formData = new FormData();
            formData.append('pdfFile', file);
        
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/`, {
                method: 'POST',
                body: formData,
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
            }
        
            const data = await response.json();
            setAnalysisResults(data.results);
            setAnalysisSuccess(true);
        } catch (error) {
            console.error('Analysis Error:', error);
            setAnalysisError('Failed to analyze PDF. Please try again.');
            setAnalysisSuccess(false);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmitAnalysis = () => {
        if (uploadedFile) {
            handleFileUpload(uploadedFile);
        } else {
            setAnalysisError("Please upload a PDF file first.");
        }
    };

    const onDrop = acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0]) {
            setUploadedFile(acceptedFiles[0]);
            setUploadedFileName(acceptedFiles[0].name);
            setAnalysisError(null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setUploadedFileName(e.target.files[0].name);
            setAnalysisError(null);
        }
    };

    return (
        <LoadingWrapper loading={isAnalyzing}>
            <Navbar />
            <div className="bg-blue-50 max-h-screen flex justify-center font-sans">
                <div className="container mx-auto px-6 py-12 max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden mt-10 mb-10" style={{maxWidth: '1200px'}}> {/* ADDED: inline style for maxWidth */}
                    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center md:mb-10 lg:mb-12">
                        <span className="text-blue-500">PDF</span> Financial Risk Analysis
                    </h2>
                    <div className="flex flex-col lg:flex-row shadow-md rounded-lg overflow-hidden">
                        <div className="flex-1 p-6 lg:p-8 border-b lg:border-r lg:border-b-0 border-gray-200 bg-gray-50 flex flex-col justify-between">
                            <div className="mb-4 lg:mb-6">
                                <div {...getRootProps()} className={`rounded-md p-6 lg:p-8 cursor-pointer border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-400 hover:border-blue-500 bg-white'} transition-colors duration-200`}> {/* Reduced padding here */}
                                    <input {...getInputProps()} id="file-upload-input" onChange={handleFileInputChange} />
                                    <div className="flex flex-col items-center justify-center">
                                        {uploadedFileName ? (
                                            <>
                                                <PictureAsPdfOutlined style={{ fontSize: 80, color: '#4285F4' }} />
                                                <p className="text-gray-700 mt-4 text-lg text-center">
                                                    Uploaded: <span className="font-semibold">{uploadedFileName}</span>
                                                </p>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Click or drag to replace PDF file
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <InboxOutlined style={{ fontSize: 80, color: '#9ca3af' }} />
                                                <p className="text-gray-600 mt-4 text-lg text-center">
                                                    <span className="font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => document.getElementById('file-upload-input').click()}>
                                                        Drag and drop PDF here or browse files
                                                    </span>
                                                </p>
                                                <p className="text-gray-500 text-sm mt-2">(Only *.pdf files are supported)</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={handleSubmitAnalysis}
                                        disabled={!uploadedFile || isAnalyzing}
                                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline text-lg ${!uploadedFile || isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Analyze PDF
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 lg:mt-0">
                                {analysisError && (
                                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center space-x-2">
                                        <ErrorOutline className="mr-2" />
                                        <p>{analysisError}</p>
                                    </div>
                                )}
                                {analysisSuccess && analysisResults && (
                                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center space-x-2">
                                        <CheckCircleOutline className="mr-2" />
                                        <p>Analysis successful. Results are shown below.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 p-6 lg:p-8 bg-white">
                            <div className="bg-gray-50 p-6 rounded-md shadow-inner h-full flex flex-col justify-start" style={{ maxHeight: '600px', overflowY: 'auto' }}> {/* ADDED: inline styles for maxHeight and overflowY */}
                                <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Analysis Results</h3>
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
