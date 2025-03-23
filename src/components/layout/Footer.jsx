// src/components/ui/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                    <div>
                        <h6 className="font-semibold text-gray-800 mb-4">Product</h6>
                        <ul className="text-gray-600">
                            <li className="mb-2"><Link to="/features" className="hover:underline cursor-pointer">Features</Link></li>
                            <li className="mb-2"><Link to="/pricing" className="hover:underline cursor-pointer">Pricing</Link></li>
                            <li className="mb-2"><Link to="/case-studies" className="hover:underline cursor-pointer">Case Studies</Link></li>
                            <li><Link to="/demos" className="hover:underline cursor-pointer">Demos</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-semibold text-gray-800 mb-4">Company</h6>
                        <ul className="text-gray-600">
                            <li className="mb-2"><Link to="/about" className="hover:underline cursor-pointer">About Us</Link></li>
                            <li className="mb-2"><Link to="/team" className="hover:underline cursor-pointer">Our Team</Link></li>
                            <li className="mb-2"><Link to="/careers" className="hover:underline cursor-pointer">Careers</Link></li>
                            <li><Link to="/contact" className="hover:underline cursor-pointer">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-semibold text-gray-800 mb-4">Support</h6>
                        <ul className="text-gray-600">
                            <li className="mb-2"><Link to="/faq" className="hover:underline cursor-pointer">FAQ</Link></li>
                            <li className="mb-2"><Link to="/help-center" className="hover:underline cursor-pointer">Help Center</Link></li>
                            <li className="mb-2"><Link to="/guides" className="hover:underline cursor-pointer">Guides</Link></li>
                            <li><Link to="/community" className="hover:underline cursor-pointer">Community</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-semibold text-gray-800 mb-4">Follow Us</h6>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-500 hover:text-blue-600 cursor-pointer" aria-label="Facebook">
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 cursor-pointer" aria-label="Twitter">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 cursor-pointer" aria-label="Instagram">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 cursor-pointer" aria-label="LinkedIn">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} Financial AI. All rights reserved.
                    </p>
                    <p className="mt-2 text-gray-600">
                        <Link to="/terms-and-conditions" className="hover:underline cursor-pointer">Terms & Conditions</Link> |
                        <Link to="/policy" className="hover:underline ml-4 cursor-pointer">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;