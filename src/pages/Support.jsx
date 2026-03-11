
import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, ChevronDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const faqs = [
        {
            question: "How do I register for an account?",
            answer: "You can register for an OTR account by downloading our mobile app from the App Store or Google Play Store. Alternatively, you can visit any of our branch locations with your ID/Passport, and our staff will assist you with the registration process."
        },
        {
            question: "What documents do I need to send money?",
            answer: "For Malaysian citizens, you'll need your MyKad. For foreign nationals, a valid passport or work permit is required. Additional documents may be requested for large transfer amounts in compliance with Bank Negara Malaysia regulations."
        },
        {
            question: "How long does a transfer take?",
            answer: "Most transfers are instant or completed within minutes. However, depending on the destination country, receiving bank, and payment method, some transfers may take 1-2 business days."
        },
        {
            question: "What are the fees?",
            answer: "Our fees vary depending on the destination country and the amount you're sending. We pride ourselves on transparency - you'll always see the exact fee and exchange rate before you confirm your transfer. Use our rate calculator on the home page or app to get a quote."
        },
        {
            question: "Is my money safe?",
            answer: "Yes, absolutely. One Transfer Remittance is a licensed Money Service Business regulated by Bank Negara Malaysia. We use industry-standard security measures and encryption to protect your personal information and funds."
        },
        {
            question: "Can I track my transaction?",
            answer: "Yes, you can track your transaction in real-time through our mobile app using your transaction reference number. You'll also receive SMS notifications at key stages of the transfer process."
        }
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Support Center</h1>
                    <p>We're here to help you. Get in touch with our team or browse our FAQs.</p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-options-grid">
                        <div className="contact-card">
                            <div className="contact-icon"><MessageCircle /></div>
                            <h3>WhatsApp Support</h3>
                            <p>Chat with our support team for quick assistance</p>
                            <a href="https://wa.me/601157864498" className="contact-action" target="_blank" rel="noopener noreferrer">
                                Chat Now <ChevronDown className="rotate-[-90deg]" />
                            </a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon"><Phone /></div>
                            <h3>Call Us</h3>
                            <p>Speak directly with a customer service representative</p>
                            <a href="tel:+601157864498" className="contact-action">
                                +60 11-5786 4498
                            </a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon"><MapPin /></div>
                            <h3>Visit a Branch</h3>
                            <p>Find a location near you for in-person support</p>
                            <Link to="/branches" className="contact-action">
                                Find Branch <ChevronDown className="rotate-[-90deg]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Find answers to common questions about using OTR</p>

                    <div className="faq-container">
                        {faqs.map((faq, index) => (
                            <div
                                className={`faq-item ${openIndex === index ? 'active' : ''}`}
                                key={index}
                            >
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
                                    {faq.question}
                                    <ChevronDown className="faq-icon" />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="faq-help">
                        <h3>Still have questions?</h3>
                        <p>Our support team is available Mon-Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Support;
