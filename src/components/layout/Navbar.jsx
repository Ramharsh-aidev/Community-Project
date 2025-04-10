// src/components/ui/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BanknotesIcon,
    ChartBarSquareIcon,
    DocumentChartBarIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    Bars3Icon, // Hamburger Icon
    XMarkIcon, // Close Icon
    ListBulletIcon,
    ChatBubbleLeftRightIcon,
    TrophyIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useAuth, SignOutButton } from '@clerk/clerk-react'; // Import useAuth and SignOutButton

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const { isSignedIn } = useAuth();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        const handleClickOutsideMobileMenu = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideDropdown);
        document.addEventListener('mousedown', handleClickOutsideMobileMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
            document.removeEventListener('mousedown', handleClickOutsideMobileMenu);
        };
    }, [isDropdownOpen, isMobileMenuOpen, dropdownRef, mobileMenuRef]);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50"> {/* Sticky navbar */}
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo - Only visible on Desktop */}
                <Link to="/" className="flex items-center cursor-pointer hidden md:flex"> {/* HIDDEN on mobile */}
                    <img src="./logo.jpeg" alt="Financial AI Logo" className="h-8 mr-2" />
                    <span className="font-bold text-xl text-blue-600">FInTech</span>
                </Link>

                {/* Logo - Only visible on Mobile - Inside Mobile Menu Button Area */}
                <Link to="/" className="flex items-center cursor-pointer md:hidden"> {/* VISIBLE on mobile */}
                    <img src="./logo.jpeg" alt="Financial AI Logo" className="h-8 mr-2" />
                    <span className="font-bold text-xl text-blue-600">FInTech</span>
                </Link>


                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="focus:outline-none cursor-pointer" aria-label="Toggle mobile menu">
                        {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6 text-gray-700" /> : <Bars3Icon className="h-6 w-6 text-gray-700" />}
                    </button>
                </div>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/home" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Home</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center cursor-pointer transition-colors duration-300" aria-expanded={isDropdownOpen} aria-haspopup="true">
                            Features <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} mt-2 py-2 w-56 bg-white border rounded-md shadow-xl z-10 transform opacity-0 scale-95 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 scale-100' : ''}`}>
                            <Link to="/financial-advice" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={closeDropdown}>
                                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" /> <span>Financial Advice</span>
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

                 {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    {isSignedIn ? (
                        <SignOutButton>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full cursor-pointer transition-colors duration-300">Sign Out</button>
                        </SignOutButton>
                    ) : (
                        <>
                            <Link to="/sign-in" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Sign in</Link>
                            <Link to="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full cursor-pointer transition-colors duration-300">Sign up</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu - Full Width, Top Aligned List Style - UPDATED for Single Navbar */}
            <div ref={mobileMenuRef} className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20 transform transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                 {/* Mobile Menu Header - Removed Close Button - UPDATED */}

                {/* Mobile Menu Auth Links - Moved to be below Header - UPDATED */}
                <div className="px-6 py-3 border-b border-gray-200">
                    {!isSignedIn ? (
                        <div className="flex justify-around text-gray-700 ">
                            <Link to="/sign-up" className="hover:text-blue-600 cursor-pointer transition-colors duration-300 py-2 block text-center">Sign up</Link>
                            <Link to="/sign-in" className="hover:text-blue-600 cursor-pointer transition-colors duration-300 py-2 block text-center">Sign in</Link>
                        </div>
                    ) : (
                        <div className="text-gray-700 font-semibold px-6 py-2 text-center">Welcome User</div>
                    )}
                </div>


                {/* Mobile Menu Body - List of Links - UPDATED - Includes ALL Desktop Links */}
                <nav className="py-2 px-6">
                    <Link to="/home" className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ListBulletIcon className="h-5 w-5 text-gray-500" /> <span>Home</span>
                    </Link>
                    {/* Features Dropdown in Mobile Menu - Kept Dropdown Functionality */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none flex items-center justify-between w-full cursor-pointer transition-colors duration-300"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <div className="flex items-center space-x-3">
                                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" /> <span>Features</span>
                            </div>
                            <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} mt-2 py-2 w-full bg-white border rounded-md shadow-xl z-10`}>
                            <Link to="/financial-advice" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" /> <span>Financial Advice</span>
                            </Link>
                            <Link to="/share-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                                <ChartBarSquareIcon className="h-5 w-5 text-gray-500" /> <span>Share Analysis</span>
                            </Link>
                            <Link to="/live-tracking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" /> <span>Live Tracking</span>
                            </Link>
                            <Link to="/pdf-risk-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                                <DocumentChartBarIcon className="h-5 w-5 text-gray-500" /> <span>PDF Risk Analysis</span>
                            </Link>
                            <Link to="/budget-planner" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center space-x-2 transition-colors duration-300" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
                                <BanknotesIcon className="h-5 w-5 text-gray-500" /> <span>Budget Planner</span>
                             </Link>
                        </div>
                    </div>
                    <Link to="/about" className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <DocumentChartBarIcon className="h-5 w-5 text-gray-500" /> <span>About</span>
                    </Link>
                    <Link to="/team" className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <TrophyIcon className="h-5 w-5 text-gray-500" /> <span>Team</span>
                    </Link>
                    <Link to="/contact" className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-500" /> <span>Contact</span>
                    </Link>
                     <Link to="/pricing" className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ShoppingCartIcon className="h-5 w-5 text-gray-500" /> <span>Pricing</span>
                    </Link>

                    {isSignedIn && (
                        <SignOutButton>
                            <button className="block py-2 text-red-600 hover:bg-red-100 cursor-pointer transition-colors duration-300 w-full text-left flex items-center space-x-3 px-6" onClick={closeMobileMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25a3 3 0 00-3-3H7.5a3 3 0 00-3 3v13.5a3 3 0 003 3h7.5a3 3 0 003-3V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span>Sign Out</span>
                            </button>
                        </SignOutButton>
                    )}
                </nav>
            </div>
        </nav>
    );
}

export default Navbar;