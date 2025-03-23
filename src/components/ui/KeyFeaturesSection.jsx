// src/components/ui/KeyFeaturesSection.jsx
import React from 'react';
import KeyFeatureCard from './KeyFeatureCard';
import {
    BanknotesIcon,
    ChartBarSquareIcon,
    DocumentChartBarIcon,
    MagnifyingGlassIcon,
    BoltIcon,
    LockClosedIcon,
    ChartPieIcon,
    ReceiptPercentIcon,
    LightBulbIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

function KeyFeaturesSection() {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <KeyFeatureCard
                        icon={<BanknotesIcon className="w-6 h-6 text-blue-500" />}
                        title="AI-Powered Budgeting"
                        description="Intelligent budget creation, spending insights, and adaptive budget strategies."
                    />
                    <KeyFeatureCard
                        icon={<ChartBarSquareIcon className="w-6 h-6 text-blue-500" />}
                        title="Bank Account Integration"
                        description="Seamlessly connect with major banks for automated transaction tracking."
                    />
                    <KeyFeatureCard
                        icon={<ChartPieIcon className="w-6 h-6 text-blue-500" />}
                        title="Investment Portfolio Management"
                        description="Track, analyze, and optimize your investment portfolio with AI insights."
                    />
                    <KeyFeatureCard
                        icon={<ReceiptPercentIcon className="w-6 h-6 text-blue-500" />}
                        title="FD Manager"
                        description="Track fixed deposits, get maturity alerts, and discover better FD investment avenues."
                    />
                    <KeyFeatureCard
                        icon={<LightBulbIcon className="w-6 h-6 text-blue-500" />}
                        title="Financial Advisor"
                        description="Offers personalized financial advice based on your unique situation."
                    />
                    <KeyFeatureCard
                        icon={<ShieldCheckIcon className="w-6 h-6 text-blue-500" />}
                        title="Data Security & Privacy"
                        description="End-to-end encryption with secure authentication, ensuring your data is safe."
                    />
                </div>
            </div>
        </section>
    );
}

export default KeyFeaturesSection;