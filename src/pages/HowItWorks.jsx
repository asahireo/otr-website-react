
import React from 'react';
import {
    UserCheck, FileText, CreditCard, Clock, Smartphone, Zap, Bell, History,
    UserPlus, Calculator, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { redirectToAppStore } from '../utils/helpers';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>How It Works</h1>
                    <p>Choose your preferred method to send money with One Transfer Remittance</p>
                </div>
            </section>

            {/* Transfer Methods */}
            <section className="transfer-methods">
                <div className="container">
                    <div className="methods-grid">
                        <div className="method-card">
                            <div className="method-number">1</div>
                            <h3 className="method-title">Visit Our Store</h3>
                            <p className="method-desc">Come and visit us in person at any of our branches. Get a member of our team to assist you with a transaction or to register for the OTR mobile application.</p>
                            <ul className="method-features">
                                <li><UserCheck /> Personal assistance from our staff</li>
                                <li><FileText /> Help with registration</li>
                                <li><CreditCard /> Multiple payment options</li>
                                <li><Clock /> Same-day transfers available</li>
                            </ul>
                        </div>

                        <div className="method-card">
                            <div className="method-number">2</div>
                            <h3 className="method-title">Through OTR App</h3>
                            <p className="method-desc">Download the OTR app to equip yourself with capabilities to send money at anytime, from anywhere! Available on Android and iOS.</p>
                            <ul className="method-features">
                                <li><Smartphone /> Send money 24/7</li>
                                <li><Zap /> Instant transfers</li>
                                <li><Bell /> Real-time notifications</li>
                                <li><History /> Track all transactions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="steps-section">
                <div className="container">
                    <h2 className="section-title">Send Money in 4 Easy Steps</h2>
                    <p className="section-subtitle">Whether you visit us or use the app, sending money is quick and simple</p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-icon"><UserPlus /></div>
                            <div className="step-number">Step 1</div>
                            <h3 className="step-title">Register</h3>
                            <p className="step-desc">Sign up at any branch or download the OTR app and create your account</p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon"><UserCheck /></div>
                            <div className="step-number">Step 2</div>
                            <h3 className="step-title">Add Recipient</h3>
                            <p className="step-desc">Enter your recipient's details including their bank or pickup location</p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon"><Calculator /></div>
                            <div className="step-number">Step 3</div>
                            <h3 className="step-title">Enter Amount</h3>
                            <p className="step-desc">Choose how much to send and see the exchange rate and fees upfront</p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon"><Send /></div>
                            <div className="step-number">Step 4</div>
                            <h3 className="step-title">Send & Track</h3>
                            <p className="step-desc">Complete payment and track your transfer in real-time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Get Started?</h2>
                        <p>Choose your preferred way to send money today</p>
                        <div className="cta-buttons">
                            <button className="btn-primary" onClick={() => redirectToAppStore()}>Download OTR App</button>
                            <Link to="/branches" className="btn btn-secondary">Find a Branch</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HowItWorks;
