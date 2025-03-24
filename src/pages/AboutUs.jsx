// src/pages/AboutPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Fade } from 'react-awesome-reveal'; // Import Fade animation
import LoadingWrapper from '../components/ui/LoadingWrapper'; // Import LoadingWrapper


function AboutPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State for mouse position
    const heroSectionRef = useRef(null); // Ref for hero section

    useEffect(() => {
        const heroSection = heroSectionRef.current; // Get current ref value

        // **Conditional Check:** Ensure heroSection is not null before proceeding
        if (heroSection) {
            const handleMouseMove = (event) => {
                const rect = heroSection.getBoundingClientRect();
                const x = event.clientX - rect.left; // Mouse X relative to hero section
                const y = event.clientY - rect.top;  // Mouse Y relative to hero section

                setMousePos({ x, y });
            };

            heroSection.addEventListener('mousemove', handleMouseMove);

            return () => { // Cleanup listener
                heroSection.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []); // Empty dependency array for mount/unmount effect

    const parallaxIntensity = 0.02; // Adjust for intensity of parallax effect
    const imageTransformStyle = {
        transform: `translateX(${mousePos.x * parallaxIntensity}px) translateY(${mousePos.y * parallaxIntensity}px)`,
    };


    return (
        <LoadingWrapper> {/* Wrap the entire content with LoadingWrapper */}
            <div>
                <Navbar />

                {/* Hero Section - Stylishly Updated with Parallax Image and Medium Speed Animations */}
                <section ref={heroSectionRef} className="bg-gradient-to-br from-blue-50 to-white py-24 relative overflow-hidden"> {/* Added ref to section */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                            <div className="mb-12 md:mb-0">
                                <Fade duration={500}> {/* Animation duration reduced to 500ms (medium speed) */}
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                        Helping Investors Succeed Through the Power of AI.
                                    </h2>
                                </Fade>
                                <Fade duration={500} delay={100}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Financial AI is your intelligent partner in navigating the complexities of the investment world. We empower individuals in India with AI-driven tools and insights to make smarter financial decisions and achieve their investment goals.
                                    </p>
                                </Fade>
                                <Fade duration={500} delay={200}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full cursor-pointer transition-colors duration-300 shadow-md hover:shadow-lg">
                                        Get Started for Free
                                    </button>
                                </Fade>
                            </div>
                            <div className="md:block  relative overflow-hidden" style={{ borderRadius: '10px' }}> {/* Added relative and overflow-hidden for parallax container */}
                                <Fade duration={750} delay={300}> {/* Animation duration reduced to 750ms (medium speed), delay adjusted for image*/}
                                <img
                                    src="./AboutHero.png" // Correct path to public folder
                                    alt="Financial AI Illustration"
                                    className="rounded-lg shadow-xl absolute top-0 left-0 w-full h-full object-cover transform origin-center"
                                    style={imageTransformStyle}
                                />
                                </Fade>
                            </div>
                        </div>
                    </div>
                    {/* Background Shape - Optional, for visual flair */}
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-blue-500 opacity-10 pointer-events-none" style={{ borderRadius: '50% 50% 0 0', transform: 'scaleX(2)' }}></div>
                </section>


                <section className="bg-white py-20">
                    <div className="container mx-auto px-6">
                        <Fade duration={500} delay={100}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Our Mission - Bridging the Financial Literacy Gap</h2>
                        </Fade>
                        <Fade duration={500} delay={200}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                            <p className="text-gray-700 leading-relaxed mb-8 text-center md:text-left">
                                In a nation brimming with investment potential, we're dedicated to leveling the playing field. Financial AI is built to democratize access to sophisticated financial tools and knowledge, ensuring every Indian investor can make confident and informed decisions.
                            </p>
                        </Fade>

                        {/* Key Features Section - Reusing from HomePage, adjust if needed */}
                        <Fade duration={500} delay={300}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                            <section className="mt-16">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-12 text-center">Key Features That Empower You</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* You can reuse KeyFeatureCard components from HomePage here if you want, or create new ones */}
                                    {/* Example placeholder Feature Cards - Replace with your actual KeyFeatureCard components */}
                                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Advice</h4>
                                        <p className="text-gray-600">Personalized guidance for your financial journey.</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Live Data Analysis</h4>
                                        <p className="text-gray-600">Real-time insights for informed decisions.</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Risk Assessment</h4>
                                        <p className="text-gray-600">Identify potential risks in your policies.</p>
                                    </div>
                                </div>
                            </section>
                        </Fade>


                        {/* More About Us Content - Reusing paragraphs from previous version */}
                        <Fade duration={500} delay={400}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-16 text-center md:text-left">Built for Scale, Driven by AI</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We understand the immense scale of the challenge in India. Manual financial guidance simply cannot reach the hundreds of millions of investors entering the market. AI is the only viable solution to provide personalized support and education at scale. Our GenAI-based platform is engineered to handle this demand, ensuring that quality financial guidance is available to everyone, anytime.
                            </p>
                        </Fade>

                        <Fade duration={500} delay={500}> {/* Animation duration reduced to 500ms (medium speed), delay adjusted */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 text-center md:text-left">Our Commitment to You</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We are more than just a platform; we are your partners in your financial journey. We are committed to building a future where financial literacy is no longer a barrier to wealth creation in India. Join us as we leverage the power of AI to empower investors and build a more financially informed nation.
                            </p>
                        </Fade>

                        {/* Optional: Team Section Link - Animated */}
                        {/* <Fade duration={500} delay={600}>
                            <p className="mt-8 text-center md:text-left">
                                <Link to="/team" className="text-blue-600 hover:underline font-semibold">Meet Our Team</Link>
                            </p>
                        </Fade> */}
                    </div>
                </section>

                <Footer />
            </div>
        </LoadingWrapper>
    );
}

export default AboutPage;