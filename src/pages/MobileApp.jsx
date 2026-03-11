
import React from 'react';
import {
    Check, Download, PlayCircle, Zap, ShieldCheck, Bell, Calculator, Users, History,
    CheckCircle, Play, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { redirectToAppStore } from '../utils/helpers';
import './MobileApp.css';

const MobileApp = () => {
    return (
        <>
            {/* App Hero Section */}
            <section className="app-hero">
                <div className="container">
                    <div className="app-hero-grid">
                        <div className="app-hero-content">
                            <h1>OTR Mobile App</h1>
                            <p className="subtitle">Experience ultimate convenience sending money anytime, anywhere with our award-winning OTR mobile application.</p>

                            <ul className="app-features-list">
                                <li><Check /> Live exchange rates with instant conversion</li>
                                <li><Check /> Multiple secure payment methods</li>
                                <li><Check /> 24/7 real-time transaction tracking</li>
                                <li><Check /> Global network access to 200+ countries</li>
                            </ul>

                            <div className="app-buttons">
                                <button className="app-btn primary" onClick={() => redirectToAppStore()}>
                                    <Download /> Download Now
                                </button>
                                <Link to="/how-it-works" className="app-btn">
                                    <PlayCircle /> See How It Works
                                </Link>
                            </div>
                        </div>

                        <div className="phone-mockup">
                            <div className="video-container">
                                <div className="video-frame">
                                    <iframe
                                        src="https://www.youtube.com/embed/XvhUTvf3mhk?autoplay=1&mute=1&loop=1&playlist=XvhUTvf3mhk&controls=0&modestbranding=1&rel=0"
                                        title="OTR App Demo"
                                        loading="lazy"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">App Features</h2>
                    <p className="section-subtitle">Everything you need for seamless money transfers</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><Zap /></div>
                            <h3 className="feature-title">Instant Transfers</h3>
                            <p className="feature-desc">Send money instantly to bank accounts and mobile wallets worldwide</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><ShieldCheck /></div>
                            <h3 className="feature-title">Bank-Level Security</h3>
                            <p className="feature-desc">Your transactions are protected with enterprise-grade encryption</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><Bell /></div>
                            <h3 className="feature-title">Real-Time Notifications</h3>
                            <p className="feature-desc">Get instant updates on your transfer status at every step</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><Calculator /></div>
                            <h3 className="feature-title">Rate Calculator</h3>
                            <p className="feature-desc">Check live exchange rates and calculate fees before sending</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><Users /></div>
                            <h3 className="feature-title">Saved Recipients</h3>
                            <p className="feature-desc">Save your frequent recipients for faster future transfers</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><History /></div>
                            <h3 className="feature-title">Transaction History</h3>
                            <p className="feature-desc">Access your complete transfer history anytime</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorial Section */}
            <section className="tutorial-section">
                <div className="container">
                    <div className="tutorial-card glass-card">
                        <div className="tutorial-content">
                            <h2>Step-by-Step App Tutorial</h2>
                            <p>Watch our guided walkthrough to learn how to set up your account, send money, and track every transfer in the OTR mobile app.</p>
                            <ul className="tutorial-highlights">
                                <li><CheckCircle /> Account registration and quick verification</li>
                                <li><CheckCircle /> Creating local or international transfers</li>
                                <li><CheckCircle /> Monitoring delivery status and downloading receipts</li>
                            </ul>
                            <div className="tutorial-actions">
                                <a href="https://www.youtube.com/watch?v=XvhUTvf3mhk&list=PLBMwvVv1xuA7IMU-4XNWiIUS_7IqcIIFq" className="app-btn primary" target="_blank" rel="noopener noreferrer">
                                    <Play /> Watch on YouTube
                                </a>
                                <Link to="/how-it-works" className="app-btn">
                                    <BookOpen /> Explore the Guide
                                </Link>
                            </div>
                        </div>
                        <div className="tutorial-video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/XvhUTvf3mhk?si=mWRsBpWjlTz8VYeu" title="OTR App Tutorial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="download-section">
                <div className="container">
                    <div className="download-card">
                        <h2>Download the OTR App</h2>
                        <p>Join thousands of satisfied customers who trust OTR for their money transfers</p>

                        <div className="store-buttons">
                            <a href="https://apps.apple.com/my/app/onetransfer-remittance/id1497130506" className="store-btn" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6534 16.591C16.8532 17.7554 15.9619 18.9135 14.6592 18.9377C13.3768 18.9617 12.9691 18.1752 11.5165 18.1752C10.0384 18.1752 9.57796 18.9135 8.37255 18.9617C7.11977 19.0101 6.06822 17.6833 5.41804 16.7371C4.08985 14.8093 3.09705 11.2829 4.43283 8.94902C5.09346 7.79469 6.27367 7.06554 7.55627 7.04169C8.78345 7.01754 9.69767 7.87196 10.4429 7.87196C11.1636 7.87196 12.2965 6.94508 13.7852 7.01754C14.3377 7.04169 15.9084 7.23438 16.9079 8.70777C16.8242 8.7562 15.1517 9.74366 15.176 12.321C15.2001 15.3558 17.797 16.3986 17.893 16.4468C17.8208 16.6395 17.7725 16.7842 17.6534 16.591ZM12.7535 5.25877C13.3312 4.56015 13.7161 3.59669 13.62 2.6333C12.7297 2.6695 11.6481 3.23538 11.0229 3.98223C10.4704 4.6323 9.96522 5.61985 10.0858 6.55946C11.071 6.65585 12.1526 6.00585 12.7535 5.25877Z" />
                                </svg>
                                <div className="store-info">
                                    <span className="small">Download on the</span>
                                    <span className="name">App Store</span>
                                </div>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.mobilityone.onetransfer.android.app&pcampaignid=web_share" className="store-btn" target="_blank" rel="noopener noreferrer">
                                <Play fill="currentColor" />
                                <div className="store-info">
                                    <span className="small">Get it on</span>
                                    <span className="name">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MobileApp;
