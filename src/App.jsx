import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import { Routes, Route, useLocation } from 'react-router-dom';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import MobileApp from './pages/MobileApp';
import Branches from './pages/Branches';
import Support from './pages/Support';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="app" element={<MobileApp />} />
          <Route path="branches" element={<Branches />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
