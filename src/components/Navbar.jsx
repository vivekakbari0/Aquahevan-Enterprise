import React, { useState } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Navbar({ activePage, setActivePage, onOpenInquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar-wrapper">
        <div className="container navbar-container">
          {/* Official Registered Brand Logo (Landscape Badge) */}
          <div className="brand-logo" onClick={() => handleNavClick('home')} title="Aquahevan Enterprise Jamnagar">
            <div className="brand-landscape-badge">
              <img
                src="/assets/brand/aquahevan-logo.png"
                alt="Aquahevan Enterprise"
                className="brand-official-logo"
              />
            </div>
            <div>
              <div className="brand-name">AQUAHEVAN ENTERPRISE</div>
            </div>
          </div>

          {/* Right Navigation & Actions Cluster */}
          <div className="nav-right-cluster">
            {/* Desktop Navigation Links */}
            <nav className="desktop-nav">
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action CTAs */}
            <div className="nav-actions">
              <button
                type="button"
                className="btn-secondary nav-catalog-btn"
                onClick={() => onOpenInquiry({ brand: 'General Inquiry', product: 'Factory Direct Catalog' })}
              >
                <span>Request Catalog</span>
                <ArrowUpRight size={14} />
              </button>
              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={26} color="var(--accent-champagne)" /> : <Menu size={26} color="var(--accent-champagne)" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div style={{ marginBottom: '1rem' }}>
            <span className="badge-gold">Aquahevan Enterprise</span>
          </div>

          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={18} color="var(--accent-champagne)" />
            </button>
          ))}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href={`tel:${companyInfo.phone}`}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={16} />
              <span>Call: {companyInfo.phoneDisplay}</span>
            </a>

            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry({ brand: 'General Inquiry', product: 'General Inquiry' });
              }}
            >
              <span>Direct Factory Inquiry</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
