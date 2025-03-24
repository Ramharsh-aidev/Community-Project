// src/features/home/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/ui/HeroSection';
import HowItWorksSection from '../components/ui/HowItWorksSection';
import KeyFeaturesSection from '../components/ui/KeyFeaturesSection';
import FeedbackCards from '../components/ui/FeedbackCards';
import { Fade } from 'react-awesome-reveal';
import LoadingWrapper from '../components/ui/LoadingWrapper'; // Import LoadingWrapper

function HomePage() {

    return (
        <LoadingWrapper> {/* Wrap the entire content with LoadingWrapper */}
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
        </LoadingWrapper>
    );
}

export default HomePage;