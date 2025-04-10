// src/components/ui/FeedbackCards.jsx
import React from 'react';

const feedbacks = [
    {
        name: "Suresh Dhamnkar",
        title: "Happy Customer",
        feedback: "Financial AI has been a game changer for me. I finally feel in control of my finances and am making real progress towards my goals!",
        image: "https://th.bing.com/th/id/OIP.Ee7pg-0WD9WBjBCeoEhxrwHaLZ?w=810&h=1246&rs=1&pid=ImgDetMain"
    },
    {
        name: "Dinesh Kumar",
        title: "Satisfied User",
        feedback: "The AI-powered advice is surprisingly insightful. I've discovered savings I didn't know I could make. Highly recommend!",
        image: 'https://th.bing.com/th/id/OIP.ZVPNwiGRP68Ji-RDuCep5QHaHa?w=626&h=626&rs=1&pid=ImgDetMain'
    },
    {
        name: "Anushka Chaudhary",
        title: "Loyal User",
        feedback: "Easy to use and understand. The spending tracker is fantastic, and the budget planner is helping me stay on track. Great product!",
        image: "https://th.bing.com/th/id/OIP.bDIlzptISFNENH19DHSwewHaHu?w=783&h=817&rs=1&pid=ImgDetMain"
    }
];


function FeedbackCards() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center justify-center mb-4">
                                <img className="w-16 h-16 rounded-full object-cover" src={feedback.image} alt={feedback.name} />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-1">{feedback.name}</h4>
                            <p className="text-gray-500 mb-3">{feedback.title}</p>
                            <p className="text-gray-600 italic">"{feedback.feedback}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeedbackCards;