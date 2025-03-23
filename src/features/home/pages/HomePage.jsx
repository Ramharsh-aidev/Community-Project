// src/features/home/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import HeroSection from '../../../components/ui/HeroSection';
import HowItWorksSection from '../../../components/ui/HowItWorksSection';
import KeyFeaturesSection from '../../../components/ui/KeyFeaturesSection';
import FeedbackCards from '../../../components/ui/FeedbackCards';
import { Fade } from 'react-awesome-reveal'; // Install if you haven't: npm install react-awesome-reveal
import { ClimbingBoxLoader } from 'react-spinners'; // Install if you haven't: npm install react-spinners

function HomePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay (replace with actual data fetching if needed)
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Increased delay for loader to be visible
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-50 h-screen flex justify-center items-center">
                <ClimbingBoxLoader color="#3b82f6" loading={loading} size={30} />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 font-sans">
            <Navbar />

            <Fade duration={1000}>
                <HeroSection />
            </Fade>

            <Fade duration={1000} delay={200}>
                <HowItWorksSection />
            </Fade>

            <Fade duration={1000} delay={400}>
                <KeyFeaturesSection />
            </Fade>

            <Fade duration={1000} delay={600}>
                <FeedbackCards />
            </Fade>

            <Footer />
        </div>
    );
}

export default HomePage;