
import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Smartphone, MessageCircle, Map } from 'lucide-react';
import { redirectToAppStore } from '../utils/helpers';
import './Branches.css';

const Branches = () => {
    const branches = [
        {
            name: "Kampung Baru, Kuala Lumpur",
            address: "Kampung Baru, Kuala Lumpur",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/cFnjxoroXm2gprui6"
        },
        {
            name: "Plaza Idaman, Kuala Lumpur",
            address: "Plaza Idaman, Kuala Lumpur",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/7jXkVFX6shFEm9bQA"
        },
        {
            name: "Shah Alam, Selangor",
            address: "Shah Alam, Selangor",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/NFJKtD1gdsEec6qH6"
        },
        {
            name: "Penang, Sungai Bakap",
            address: "Sungai Bakap, Penang",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/ffwjWQcd9VqFZfFr9"
        },
        {
            name: "Kluang, Johor",
            address: "Kluang, Johor",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/tqW4usHZXNg6XGLZ6"
        },
        {
            name: "Batu Pahat, Johor",
            address: "Batu Pahat, Johor",
            hours: "Mon - Sat: 9:00 AM - 6:00 PM",
            phone: "+60 11-5786 4498",
            mapLink: "https://maps.app.goo.gl/Tk2Adq2koJTi2keR8"
        }
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Our Branch Locations</h1>
                    <p>Visit us at any of our convenient locations across Malaysia</p>
                </div>
            </section>

            {/* Locations Section */}
            <section className="locations-section">
                <div className="container">
                    <div className="locations-grid">
                        {branches.map((branch, index) => (
                            <div className="location-card" key={index}>
                                <div className="location-header">
                                    <div className="location-icon"><MapPin /></div>
                                    <h3 className="location-name">{branch.name}</h3>
                                </div>
                                <div className="location-details">
                                    <p><Map /> {branch.address}</p>
                                    <p><Clock /> {branch.hours}</p>
                                    <p><Phone /> {branch.phone}</p>
                                </div>
                                <a href={branch.mapLink} className="location-link" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink /> View on Google Maps
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="contact-cta">
                <div className="container">
                    <div className="contact-card" style={{ background: 'linear-gradient(135deg, #FF3B30, #D70015)', color: 'white' }}>
                        <h2>Can't Find a Branch Near You?</h2>
                        <p>Use our mobile app to send money from anywhere, or contact us for assistance</p>
                        <div className="contact-buttons">
                            <button className="contact-btn" onClick={() => redirectToAppStore()}>
                                <Smartphone /> Download App
                            </button>
                            <a href="https://wa.me/601157864498?text=Hi%20OTR%20Support%2C%20I%20need%20help" className="contact-btn whatsapp" target="_blank" rel="noopener noreferrer">
                                <MessageCircle /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Branches;
