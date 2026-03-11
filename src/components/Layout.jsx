
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            {/* Liquid Animation SVG Filter */}
            <svg className="liquid-filter">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Liquid Background Animation
            <div className="liquid-background">
                <div className="liquid-blob blob-1"></div>
                <div className="liquid-blob blob-2"></div>
                <div className="liquid-blob blob-3"></div>
            </div>
            */}

            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Layout;
