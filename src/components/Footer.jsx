
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content glass-card">
                    <div className="footer-links">
                        <div className="footer-section">
                            <h3>Services</h3>
                            <ul>
                                <li><Link to="/services">Money Transfer</Link></li>
                                <li><Link to="/services">Corporate Solutions</Link></li>
                                <li><Link to="/services">International Remittance</Link></li>
                                <li><Link to="/services">Currency Exchange</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Support</h3>
                            <ul>
                                <li><Link to="/support">Help Center</Link></li>
                                <li><Link to="/support">Track Transfer</Link></li>
                                <li><Link to="/branches">Branch Locator</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="/about">About OTR</Link></li>
                                <li><Link to="/services">Bank Negara Compliance</Link></li>
                                <li><Link to="/support">Careers</Link></li>
                                <li><Link to="/support">Press</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 One Transfer Remittance Sdn Bhd. Licensed by Bank Negara Malaysia. All rights
                            reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
