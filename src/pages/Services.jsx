
import React from 'react';
import { ShieldCheck, Banknote, Zap, Lock, Globe, Coins, Building2 } from 'lucide-react';
import { redirectToAppStore } from '../utils/helpers';
import './Services.css';

const Services = () => {
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Our Services</h1>
                    <p>Malaysia's trusted remittance partner since 2006, regulated by Bank Negara Malaysia</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits">
                <div className="container">
                    <h2 className="section-title">Why Choose One Transfer Remittance?</h2>
                    <p className="section-subtitle">We're committed to making international money transfers fast, secure, and affordable</p>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon"><ShieldCheck /></div>
                            <h3 className="benefit-title">Bank Negara Malaysia Licensed</h3>
                            <p className="benefit-desc">Fully regulated Money Service Business licensed by Bank Negara Malaysia since 2006</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><Banknote /></div>
                            <h3 className="benefit-title">Competitive Rates</h3>
                            <p className="benefit-desc">Transparent pricing with competitive exchange rates and fair fees for international money transfers</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><Zap /></div>
                            <h3 className="benefit-title">Instant Transfers</h3>
                            <p className="benefit-desc">Real-time money transfers to bank accounts with OTR mobile app convenience</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><Lock /></div>
                            <h3 className="benefit-title">100% Secure</h3>
                            <p className="benefit-desc">24/7 customer support and real-time transaction tracking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="services-list">
                <div className="container">
                    <div className="service-item">
                        <div className="service-content">
                            <h3>International Money Transfer</h3>
                            <p>Send money to over 200 countries worldwide with competitive exchange rates and low fees. Your loved ones can receive funds through bank deposits, cash pickup, or mobile wallets.</p>
                            <ul>
                                <li>Bank account deposits</li>
                                <li>Cash pickup at partner locations</li>
                                <li>Mobile wallet transfers</li>
                                <li>Real-time tracking</li>
                            </ul>
                        </div>
                        <div className="service-image">
                            <Globe />
                        </div>
                    </div>

                    <div className="service-item">
                        <div className="service-content">
                            <h3>Currency Exchange</h3>
                            <p>Get competitive exchange rates for major world currencies. Whether you're traveling or need foreign currency for business, we offer transparent rates with no hidden fees.</p>
                            <ul>
                                <li>Competitive exchange rates</li>
                                <li>Multiple currency options</li>
                                <li>No hidden charges</li>
                                <li>Instant rate quotes</li>
                            </ul>
                        </div>
                        <div className="service-image">
                            <Coins />
                        </div>
                    </div>

                    <div className="service-item">
                        <div className="service-content">
                            <h3>Corporate Solutions</h3>
                            <p>Tailored remittance solutions for businesses. Streamline your international payments with dedicated support, bulk transfers, and competitive corporate rates.</p>
                            <ul>
                                <li>Bulk transfer capabilities</li>
                                <li>Dedicated account manager</li>
                                <li>API integration available</li>
                                <li>Custom reporting</li>
                            </ul>
                        </div>
                        <div className="service-image">
                            <Building2 />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Send Money?</h2>
                        <p>Download the OTR app and start sending money to your loved ones today</p>
                        <button className="btn-primary" onClick={() => redirectToAppStore()}>Get Started Now</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
