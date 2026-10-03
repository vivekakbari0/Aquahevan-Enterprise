import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ProductModal from './components/ProductModal';
import InquiryModal from './components/InquiryModal';
import AdminInquiries from './components/AdminInquiries';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryData, setInquiryData] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Handle URL hash changes for quick navigation (#home, #products, #about, #contact, #admin, #error, #500)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'products', 'about', 'contact'].includes(hash)) {
        setActivePage(hash);
        setServerError(null);
      } else if (hash === 'error' || hash === '500') {
        setActivePage('error');
      } else if (hash === 'admin') {
        setAdminOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    setServerError(null);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (data = null) => {
    setInquiryData(data || { brand: 'General Inquiry', product: 'General Inquiry' });
  };

  const handleTriggerServerError = (errInfo = {}) => {
    setServerError({
      code: errInfo.code || '500',
      title: errInfo.title || 'Server Connection Interrupted',
      message: errInfo.message || 'Hamare Jamnagar factory server se connection me samasya aa rahi hai.',
      details: errInfo.details || errInfo
    });
    setActivePage('error');
    window.location.hash = 'error';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetError = () => {
    setServerError(null);
    handlePageChange('home');
  };

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main Page Routing */}
      <main className="main-content">
        {(activePage === 'error' || activePage === '500' || serverError) ? (
          <ErrorPage
            errorCode={serverError?.code || '500'}
            errorTitle={serverError?.title || 'Server Connection Interrupted'}
            errorMessage={serverError?.message || 'Hamare Jamnagar factory server se connection me temporary samasya aa rahi hai. Hamari technical team is par kaam kar rahi hai.'}
            technicalDetails={serverError?.details}
            onRetry={handleResetError}
            onGoHome={handleResetError}
          />
        ) : (
          <>
            {activePage === 'home' && (
              <Home
                setActivePage={handlePageChange}
                onQuickView={(p) => setSelectedProduct(p)}
                onInquire={handleOpenInquiry}
              />
            )}

            {activePage === 'products' && (
              <Products
                onQuickView={(p) => setSelectedProduct(p)}
                onInquire={handleOpenInquiry}
              />
            )}

            {activePage === 'about' && (
              <About
                setActivePage={handlePageChange}
                onInquire={handleOpenInquiry}
              />
            )}

            {activePage === 'contact' && (
              <Contact 
                onTriggerServerError={handleTriggerServerError}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer (shown unless error page is active) */}
      {activePage !== 'error' && activePage !== '500' && !serverError && (
        <Footer
          setActivePage={handlePageChange}
          onOpenAdmin={() => setAdminOpen(true)}
        />
      )}

      {/* Floating Action Elements */}
      <WhatsAppFloating />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onInquire={(data) => {
            setSelectedProduct(null);
            handleOpenInquiry(data);
          }}
        />
      )}

      {inquiryData && (
        <InquiryModal
          initialData={inquiryData}
          onClose={() => setInquiryData(null)}
          onTriggerServerError={handleTriggerServerError}
        />
      )}

      {adminOpen && (
        <AdminInquiries
          onClose={() => setAdminOpen(false)}
          onTriggerServerError={handleTriggerServerError}
        />
      )}
    </div>
  );
}

