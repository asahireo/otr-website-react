
import React, { useEffect } from 'react';
import { ArrowDown, ShieldCheck, Users, TrendingUp, Lock } from 'lucide-react';
import { redirectToAppStore } from '../utils/helpers';
import './About.css';

const About = () => {
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>About One Transfer Remittance</h1>
                    <p>Your trusted partner for international money transfers since 2006</p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="who-we-are">
                <div className="container">
                    <div className="who-grid">
                        <div className="who-content">
                            <h2>Who We Are</h2>
                            <p>
                                <span className="highlight">Licensed by Bank Negara Malaysia</span> to operate remittance services in
                                <span className="highlight">6 physical stores</span> and <span className="highlight">1 mobile application</span>.
                                <span className="highlight">Partner to MoneyGram International</span> by Q4 FY19, expanding our global reach
                                and ensuring reliable money transfer services to over 200 countries worldwide.
                            </p>
                            <p>
                                We are committed to providing fast, secure, and affordable remittance services to individuals and businesses
                                across Malaysia and beyond. Our mission is to connect families and support financial inclusion through innovative
                                fintech solutions.
                            </p>
                        </div>
                        <div className="video-container-about">
                            <video controls poster="">
                                <source src="/Assets/videos/OTR-vid.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ownership Section */}
            <section className="ownership">
                <div className="container">
                    <div className="ownership-content">
                        <h2>Our Company Structure</h2>
                        <p>
                            MobilityOne Sdn Bhd made a strategic move in 2021 by acquiring 100% shares of One Transfer Remittance Sdn Bhd.
                            This acquisition was aimed at broadening our product portfolio around the FINTECH space and strengthening our
                            position in the digital financial services industry.
                        </p>

                        <div className="ownership-chart">
                            <div className="chart-item">
                                <div className="chart-header">
                                    <div className="company-name">MobilityOne Sdn Bhd</div>
                                    <div className="ownership-badge">Parent Company</div>
                                </div>
                                <div className="chart-details">
                                    Leading FINTECH solutions provider expanding digital financial services across Southeast Asia
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                <ArrowDown style={{ width: '40px', height: '40px', color: 'var(--primary-red)' }} />
                            </div>

                            <div className="chart-item">
                                <div className="chart-header">
                                    <div className="company-name">One Transfer Remittance Sdn Bhd</div>
                                    <div className="ownership-badge">100% Owned</div>
                                </div>
                                <div className="chart-details">
                                    Licensed money service business specializing in international remittance and currency exchange since 2006
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <h2 className="section-title">Our Impact</h2>
                    <p className="section-subtitle">Trusted by thousands of customers across Malaysia</p>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">2006</div>
                            <div className="stat-label">Established Since</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">200+</div>
                            <div className="stat-label">Countries Served</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">6</div>
                            <div className="stat-label">Physical Branches</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">App Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners">
                <div className="container">
                    <h2 className="section-title">Our Partners</h2>
                    <p className="section-subtitle">Working with leading global financial institutions to serve you better</p>

                    <div className="partners-grid">
                        {[
                            'aquila-logo.png', 'bkash.png', 'lendmn.png', 'linkaja.svg', 'mlhuiller.png',
                            'ovo.png', 'Paytren.png', 'quickpay.png', 'refinitiv.png', 'samsara.png',
                            'thunes.png', 'TrueMoneyIndo.png', 'mastercard.png', 'cityexpress.svg', 'moneygram.png'
                        ].map(img => (
                            <div className="partner-card" key={img}>
                                <img src={`/Assets/images/${img}`} alt={img.split('.')[0]} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAMSB Section */}
            <section className="masb-section">
                <div className="container">
                    <div className="masb-content">
                        <div className="masb-badge">
                            <img src="/Assets/images/MAMSB-Logo.png" alt="Malaysian Association of Money Services Business (MAMSB) logo" />
                        </div>
                        <h2>Associate Member of MAMSB</h2>
                        <p>
                            One Transfer Remittance is a proud <strong>Associate Member of the Malaysian Association of Money Services Business (MAMSB)</strong>,
                            Malaysia's premier industry body representing licensed money services businesses. Our MAMSB membership demonstrates our commitment to maintaining the highest standards of compliance,
                            transparency, and customer service in the money services industry.
                        </p>

                        <div className="masb-features">
                            <div className="masb-feature">
                                <ShieldCheck />
                                <h3>Regulatory Compliance</h3>
                                <p>Adhering to all Bank Negara Malaysia regulations and MAMSB standards</p>
                            </div>
                            <div className="masb-feature">
                                <Users />
                                <h3>Industry Standards</h3>
                                <p>Following best practices in money services and remittance operations</p>
                            </div>
                            <div className="masb-feature">
                                <TrendingUp />
                                <h3>Continuous Improvement</h3>
                                <p>Regular training and development to enhance service quality</p>
                            </div>
                            <div className="masb-feature">
                                <Lock />
                                <h3>Customer Protection</h3>
                                <p>Committed to safeguarding customer interests and data security</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <div className="about-cta-card">
                        <h2>Experience the OTR Difference</h2>
                        <p>Join thousands of satisfied customers who trust us for their international money transfers</p>
                        <button className="btn-primary" onClick={() => redirectToAppStore()}>Start Sending Money Today</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
