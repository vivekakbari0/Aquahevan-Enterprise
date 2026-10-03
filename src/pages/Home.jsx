import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Factory,
  Layers,
  BadgeCheck,
  TrendingUp,
  Truck,
  Lightbulb,
  CheckCircle2,
  Award
} from 'lucide-react';
import { strengths, trustHighlights } from '../data/companyData';
import { productsData } from '../data/productsData';
import ProductCard from '../components/ProductCard';

export default function Home({ setActivePage, onQuickView, onInquire }) {
  const featuredProducts = productsData.filter(p => p.featured).slice(0, 3);

  const getStrengthIcon = (iconName) => {
    switch (iconName) {
      case 'Factory': return <Factory size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      case 'Layers': return <Layers size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'BadgeCheck': return <BadgeCheck size={22} />;
      case 'TrendingUp': return <TrendingUp size={22} />;
      case 'Truck': return <Truck size={22} />;
      case 'Lightbulb': return <Lightbulb size={22} />;
      default: return <Award size={22} />;
    }
  };

  return (
    <div className="page-wrapper">
      {/* 1. HERO SECTION (MINIMAL CLASSY LUXURY & HIGH PERFORMANCE) */}
      <section className="hero-section">
        {/* Background Image with Clean Luxury Overlay */}
        <img
          src="/assets/hero/factory_craft_hero.jpg"
          alt="Jamnagar Brass Manufacturing"
          className="hero-image-bg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
          }}
        />
        <div className="hero-bg-overlay"></div>
        <div className="hero-grid-lines"></div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-dual-grid">

            {/* Left Column: Headline, Description & Actions */}
            <div className="hero-content">
              {/* Badge with Pulse */}
              <div className="hero-badge-container">
                <span className="badge-gold badge-hero-pulse">
                  <span className="hero-pulse-dot"></span>
                  <Factory size={14} /> Direct Factory Supply • Jamnagar, Gujarat
                </span>
              </div>

              {/* Minimal Luxury Headline */}
              <h1 className="hero-title">
                Architectural Brass Hardware & <span className="text-gold-gradient">Precision Bath Solutions</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle">
                Aquahevan Enterprise is the proud manufacturer of <strong>MASTERPIECE</strong> solid brass hardware and <strong>Aquahevan</strong> luxury bathroom solutions. Forged in Jamnagar with virgin alloy billets, triple-coat protection, and architectural craftsmanship.
              </p>

              {/* Hero Action Buttons */}
              <div className="hero-actions">
                <button
                  type="button"
                  id="hero-btn-inquiry"
                  className="btn-primary btn-hero-glow"
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Direct Factory Inquiry</span>
                  <ArrowRight size={16} className="btn-arrow-motion" />
                </button>

                <button
                  type="button"
                  id="hero-btn-catalog"
                  className="btn-secondary"
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Explore Showcase Catalog</span>
                </button>
              </div>

              {/* Trust Metrics Strip */}
              <div className="hero-stats-row">
                {trustHighlights.map((stat, idx) => (
                  <div key={idx} className="hero-stat-card hero-stat-motion">
                    <div className="hero-stat-value">{stat.value}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Showcase Glass Card */}
            <div className="hero-visual-col">
              <div className="hero-showcase-glass-card">

                {/* Official Brand Logo */}
                <div className="showcase-crest-wrap" style={{ width: 'auto', height: 'auto', marginBottom: '1.25rem' }}>
                  <div className="brand-landscape-badge" style={{ height: '52px', width: '120px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.3)' }}>
                    <img
                      src="/assets/brand/aquahevan-logo.png"
                      alt="Aquahevan Enterprise Official Logo"
                      className="brand-official-logo"
                    />
                  </div>
                </div>

                <div className="showcase-brand-header">
                  <div className="showcase-brand-tag">Point of Origin</div>
                  <h3 className="showcase-brand-name text-gold-gradient">AQUAHEVAN ENTERPRISE</h3>
                  <p className="showcase-brand-sub">Jamnagar Brass Industrial Hub • Gujarat (361004)</p>
                </div>

                {/* Feature Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.25rem' }}>
                  <div className="floating-feature-badge">
                    <Sparkles size={14} color="#ded3c4" />
                    <span>100% Virgin Brass Casting</span>
                  </div>

                  <div className="floating-feature-badge">
                    <ShieldCheck size={14} color="#72b3d8" />
                    <span>PVD Multi-Layer Surface Protection</span>
                  </div>

                  <div className="floating-feature-badge">
                    <CheckCircle2 size={14} color="#4ade80" />
                    <span>Direct Factory Dispatch & Custom OEM</span>
                  </div>
                </div>

                {/* Live Factory Strip */}
                <div className="showcase-live-strip">
                  <span className="hero-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                  <span>Active Production & Direct Dealer Shipping</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHORT COMPANY INTRO SECTION */}
      <section className="section-spacing" style={{ background: 'rgba(13, 16, 23, 0.7)', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>Our Heritage & Mission</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', marginBottom: '1.25rem' }}>
              Forged in <span className="text-gold-gradient">Jamnagar</span>, Delivered with Precision
            </h2>
            <div className="gold-divider gold-divider-center"></div>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '2rem' }}>
              Located in Jamnagar, Gujarat — known as the <em>Brass Capital of India</em> — <strong>Aquahevan Enterprise</strong> is a dedicated manufacturer and factory-direct supplier. Under the leadership of <strong>Vivek Akbari</strong>, we engineer state-of-the-art solid brass architectural hardware and hydro-tested bathroom fittings built to last for generations.
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Learn About Our Manufacturing Process</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. DUAL BRAND HIGHLIGHT SPOTLIGHT */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span className="badge-gold">Dual Brand Excellence</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              Two Distinguished Brands. One Standard of Perfection.
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              From heavy solid brass entrance handles to hydro-aerated luxury overhead showers.
            </p>
          </div>

          <div className="brand-spotlight-grid">

            {/* Aquahevan Brand Card */}
            <div className="brand-card aquahevan">
              <div>
                <div className="brand-card-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span className="badge-aqua">Brand Spotlight #1</span>
                    <div className="brand-landscape-badge" style={{ height: '38px', width: '90px', background: '#ffffff' }}>
                      <img src="/assets/brand/aquahevan-logo.png" alt="Aquahevan Official Logo" className="brand-official-logo" />
                    </div>
                  </div>
                  <h3 className="brand-card-title" style={{ color: '#72b3d8' }}>Aquahevan</h3>
                  <p style={{ color: '#72b3d8', fontSize: '0.95rem', fontWeight: '500' }}>
                    Premium Bathroom & Hydro Plumbing Solutions
                  </p>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Crafted for smooth water flow and contemporary elegance. Featuring laser-welded SS-304 overhead showers, solid brass faucets, and zero-drip ceramic cartridge valves.
                </p>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                  Core Collections:
                </div>
                <div className="brand-category-pills">
                  <span className="category-pill">Overhead Rain Showers</span>
                  <span className="category-pill">Multi-Flow Hand Showers</span>
                  <span className="category-pill">Solid Brass Health Faucets</span>
                  <span className="category-pill">Basin & Bib Cock Faucets</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(114, 179, 216, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#72b3d8' }}>500,000-Cycle Tested Valves</span>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem', borderColor: 'rgba(114, 179, 216, 0.35)' }}
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>View Aquahevan Line</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
            {/* Masterpiece Brand Card */}
            <div className="brand-card masterpiece">
              <div>
                <div className="brand-card-header">
                  <span className="badge-gold">Brand Spotlight #2</span>
                  <h3 className="brand-card-title text-gold-gradient">MASTERPIECE</h3>
                  <p style={{ color: '#ded3c4', fontSize: '0.95rem', fontWeight: '500' }}>
                    Premium Solid Brass Hardware & Luxury Accents
                  </p>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Engineered with virgin solid brass billets, high-density hot forging, and multi-stage PVD electroplating for luxury residential and commercial architecture.
                </p>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                  Core Collections:
                </div>
                <div className="brand-category-pills">
                  <span className="category-pill">Brass Door Handles</span>
                  <span className="category-pill">Cabinet Pulls & Knobs</span>
                  <span className="category-pill">High-Security Mortise Locks</span>
                  <span className="category-pill">Brass Bath Accessories</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(222, 211, 196, 0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#ded3c4' }}>100% Solid Brass Casting</span>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>View Masterpiece Line</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR MANUFACTURING STRENGTHS */}
      <section className="section-spacing" style={{ background: 'rgba(13, 16, 23, 0.7)', borderTop: '1px solid var(--border-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge-gold">Why Aquahevan Enterprise</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              Our Manufacturing Strengths
            </h2>
            <div className="gold-divider gold-divider-center"></div>
            <p style={{ color: 'var(--text-muted)' }}>
              Built on foundational trust, superior engineering standards, and unmatched dealer profitability.
            </p>
          </div>

          <div className="strengths-grid">
            {strengths.map((item) => (
              <div key={item.id} className="strength-card">
                <div className="strength-icon-box">
                  {getStrengthIcon(item.icon)}
                </div>
                <h3 className="strength-title">{item.title}</h3>
                <p className="strength-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED SHOWCASE GALLERY */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="badge-gold">Curated Showcase</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.4rem)', marginTop: '0.5rem' }}>
                Featured Signature Designs
              </h2>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View All Products</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onInquire={onInquire}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FACTORY DIRECT CTA BANNER */}
      <section style={{ padding: '5rem 0', background: 'radial-gradient(ellipse at center, rgba(222, 211, 196, 0.08) 0%, rgba(10, 12, 16, 0.8) 75%)', borderTop: '1.5px solid rgba(222, 211, 196, 0.2)', borderBottom: '1.5px solid rgba(222, 211, 196, 0.2)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="badge-gold" style={{ marginBottom: '1.25rem' }}>Direct Factory Supply</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '1.25rem' }}>
            Partner Directly with the <span className="text-gold-gradient">Manufacturer</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Are you an architect, interior designer, hardware wholesaler, or retail showroom owner? Connect directly with <strong>Vivek Akbari</strong> at our Jamnagar factory for dealer-friendly margins, bulk supply catalogs, and full product customization.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Submit Dealership / Trade Inquiry</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="https://wa.me/918511657132?text=Hello%20Vivek%20bhai,%20I%20am%20interested%20in%20direct%20factory%20supply%20from%20Aquahevan%20Enterprise."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <span>Chat on WhatsApp (+91 8511657132)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

