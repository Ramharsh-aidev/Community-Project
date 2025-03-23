// src/components/ui/HowItWorksSection.jsx
import React from 'react';
import FeatureCard from './FeatureCard';
import {
    BanknotesIcon as BanknotesIconOutline,
    ChartBarSquareIcon as ChartBarSquareIconOutline,
    DocumentChartBarIcon as DocumentChartBarIconOutline,
    MagnifyingGlassIcon as MagnifyingGlassIconOutline,
    BoltIcon
} from '@heroicons/react/24/outline';

function HowItWorksSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-12">How Our AI Financial Assistant Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<ChartBarSquareIconOutline className="w-6 h-6" />}
                        title="Track Your Stocks"
                        description="Get real-time updates on market trends and portfolio performance for informed investing strategies."
                    />
                    <FeatureCard
                        icon={<BanknotesIconOutline className="w-6 h-6" />}
                        title="Connect Your Accounts"
                        description="Securely sync your bank accounts and investment portfolios for a holistic view of your finances."
                    />
                    <FeatureCard
                        icon={<MagnifyingGlassIconOutline className="w-6 h-6" />}
                        title="Track Your Spending"
                        description="Categorize transactions, visualize your spending patterns, and receive insights to optimize your budget."
                    />
                    <FeatureCard
                        icon={<BoltIcon className="w-6 h-6" />}
                        title="Get AI-Powered Advice"
                        description="Receive personalized financial guidance, investment recommendations, and actionable insights from our AI assistant."
                    />
                </div>
            </div>
        </section>
    );
}

export default HowItWorksSection;