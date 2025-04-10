// src/components/ui/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HeroSection() {
    return (
        <section className="bg-gradient-to-br from-blue-100 to-blue-50 py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Manage Your Finances Smarter with AI
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Spend less time stressing about finances and receive AI-driven financial advice to achieve your financial goals.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/sign-up">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full cursor-pointer transition-colors duration-300 shadow-md hover:shadow-lg">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-3 px-8 rounded-full border border-blue-500 hover:border-blue-700 cursor-pointer transition-colors duration-300 shadow-md hover:shadow-lg">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
            {/* Hero Image - Add your image in public/images folder, or use an external URL */}
            <div className="absolute top-0 right-0 h-full w-1/2 bg-blue-50 bg-opacity-50 hidden md:block" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                <img
                    src="https://www.kf-finance.si/pic/KF-Finance-Valuation-header.jpg" // Path to your image in the public folder (e.g., public/hero-image.png)
                    alt="Financial AI Illustration"
                    className="absolute top-1/4 right-1/4 transform translate-x-1/4 -translate-y-1/4 rounded-lg shadow-xl"
                    style={{ opacity: 0.8, width: '100%', height: '100%', objectFit: 'cover' }} // Added width, height and objectFit
                />
            </div>
        </section>
    );
}

export default HeroSection;


// https://www.kf-finance.si/pic/KF-Finance-Valuation-header.jpg