import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Footer({ setActivePage, onOpenAdmin }) {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div>
            <div className="brand-logo" onClick={() => handleNavClick('home')} style={{ marginBottom: '1.25rem' }} title="Aquahevan Enterprise Jamnagar">
              <div className="brand-landscape-badge" style={{ height: '44px', width: '100px' }}>
                <img
                  src="/assets/brand/aquahevan-logo.png"
                  alt="Aquahevan Enterprise"
                  className="brand-official-logo"
                />
              </div>
              <div>
                <div className="brand-name" style={{ fontSize: '1.15rem' }}>AQUAHEVAN ENTERPRISE</div>
                <div className="brand-subtext">DIRECT MANUFACTURER</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Direct factory manufacturer & supplier of architectural brass hardware (<strong>MASTERPIECE</strong>) and premium bathroom solutions (<strong>Aquahevan</strong>) forged in Jamnagar, Gujarat.
            </p>
            <div className="badge-gold">
              <ShieldCheck size={14} />
              <span>100% Replacement Guarantee</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="footer-link">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick('products'); }} className="footer-link">
                  Product Catalog
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="footer-link">
                  About Our Factory
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="footer-link">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Dual Brands */}
          <div>
            <h4 className="footer-heading">Our Brands</h4>
            <ul className="footer-links">
              <li style={{ color: 'var(--accent-champagne)', fontWeight: '600', fontSize: '0.92rem' }}>
                MASTERPIECE
              </li>
              <li style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>
                • Solid Brass Door Handles
              </li>
              <li style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>
                • High-Security Mortise Locks
              </li>
              <li style={{ color: 'var(--accent-champagne)', fontWeight: '600', fontSize: '0.92rem', marginTop: '0.75rem' }}>
                AQUAHEVAN
              </li>
              <li style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>
                • Multi Function Rain Showers
              </li>
              <li style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>
                • Designer Basin Faucets
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Contact */}
          <div>
            <h4 className="footer-heading">Factory & Office</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={16} color="var(--accent-champagne)" />
                <span>Jamnagar, Gujarat, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="var(--accent-champagne)" />
                <a href={`tel:${companyInfo.phone}`} style={{ color: '#f8fafc' }}>
                  {companyInfo.phoneDisplay} (Vivek Akbari)
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="var(--accent-champagne)" />
                <a href={`mailto:${companyInfo.email}`} style={{ color: '#f8fafc' }}>
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}
                title="WhatsApp Direct Chat"
              >
                <MessageSquare size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            {companyInfo.copyright}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#64748b' }}>Direct Manufacturer Showcase • Jamnagar, Gujarat</span>

            <button
              type="button"
              onClick={onOpenAdmin}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'transparent', border: 'none', color: '#475569', fontSize: '0.78rem', cursor: 'pointer' }}
              title="Factory Admin Inquiries Access"
            >
              <Lock size={12} />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
