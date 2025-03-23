// src/components/ui/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BanknotesIcon,
    ChartBarSquareIcon,
    DocumentChartBarIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <nav className="bg-white shadow-md sticky top-0 z-50"> {/* Sticky navbar */}
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src="/logo.jpeg" alt="Financial AI Logo" className="h-8 mr-2" /> {/* Replace with your logo image in public/images */}
                    <span className="font-bold text-xl text-blue-600">FinTech</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/home" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Home</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center cursor-pointer transition-colors duration-300"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            Features <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} mt-2 py-2 w-56 bg-white border rounded-md shadow-xl z-10 transform opacity-0 scale-95 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 scale-100' : ''}`}>
                            <Link to="/financial-advice" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" /> <span>Financial Advice</span>
                            </Link>
                            <Link to="/share-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <ChartBarSquareIcon className="h-5 w-5 text-gray-500" /> <span>Share Analysis</span>
                            </Link>
                            <Link to="/live-tracking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" /> <span>Live Tracking</span>
                            </Link>
                            <Link to="/pdf-risk-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <DocumentChartBarIcon className="h-5 w-5 text-gray-500" /> <span>PDF Risk Analysis</span>
                            </Link>
                            <Link to="/budget-planner" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <BanknotesIcon className="h-5 w-5 text-gray-500" /> <span>Budget Planner</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">About</Link>
                    <Link to="/team" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Team</Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Log in</Link>
                    <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full cursor-pointer transition-colors duration-300">Sign up</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;