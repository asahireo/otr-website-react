
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetPath, redirectToAppStore } from '../utils/helpers';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const headerRef = useRef(null);

    // Toggle menu
    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Scroll effect
    useEffect(() => {
        const updateHeaderLayout = () => {
            if (!headerRef.current) return;
            const isMobile = window.innerWidth <= 1100;
            const scrollY = window.scrollY;

            if (isMobile) {
                headerRef.current.style.left = '12px';
                headerRef.current.style.right = '12px';
                headerRef.current.style.transform = 'none';
                headerRef.current.style.width = 'auto';
                headerRef.current.style.top = scrollY > 10 ? '12px' : '24px';
            } else {
                headerRef.current.style.left = '50%';
                headerRef.current.style.right = '';
                headerRef.current.style.transform = 'translateX(-50%)';
                headerRef.current.style.width = scrollY > 50 ? '95%' : '90%';
                headerRef.current.style.top = scrollY > 50 ? '10px' : '24px';
            }
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeaderLayout();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', updateHeaderLayout);

        // Initial call
        updateHeaderLayout();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateHeaderLayout);
        };
    }, []);

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return 'active';
        if (path !== '/' && location.pathname.startsWith(path)) return 'active';
        return '';
    };

    return (
        <header className="glass-card" ref={headerRef}>
            <nav>
                <Link to="/" className="logo-container">
                    <div className="logo-icon">
                        <img src={getAssetPath('Assets/images/otr-logo.svg')} alt="OTR Logo" />
                    </div>
                    <span className="logo">
                        <span>One</span>
                        <span>Transfer</span>
                        <span>Remittance</span>
                    </span>
                </Link>
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" className={isActive('/')}>Home</Link></li>
                    <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                    <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
                    <li><Link to="/how-it-works" className={isActive('/how-it-works')}>How It Works</Link></li>
                    <li><Link to="/app" className={isActive('/app')}>App</Link></li>
                    <li><Link to="/branches" className={isActive('/branches')}>Branches</Link></li>
                    <li><Link to="/support" className={isActive('/support')}>Support</Link></li>
                </ul>
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="#" className="nav-cta" onClick={(e) => { e.preventDefault(); redirectToAppStore(); }}>Send Money</a>
            </nav>
        </header>
    );
};

export default Header;
