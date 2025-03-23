// src/components/ui/HeroSection.jsx
import React from 'react';

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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full cursor-pointer transition-colors duration-300">
                        Get Started
                    </button>
                    <button className="bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-3 px-8 rounded-full border border-blue-500 hover:border-blue-700 cursor-pointer transition-colors duration-300">
                        Learn More
                    </button>
                </div>
            </div>
            {/* Hero Image - Add your image in public/images */}
            <div className="absolute top-0 right-0 h-full w-1/2 bg-blue-50 bg-opacity-50 hidden md:block" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                <img src="https://www.digitalthakur.com/wp-content/uploads/2022/09/technology-g6b730c8d9_1280-1024x486.jpg" alt="Financial AI Illustration" className="absolute top-1/4 right-1/4 transform translate-x-1/4 -translate-y-1/4 max-h-full max-w-full" style={{opacity: 0.8}} />
            </div>
        </section>
    );
}

export default HeroSection;