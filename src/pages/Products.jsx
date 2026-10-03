import React, { useState } from 'react';
import { productsData } from '../data/productsData';
import ProductCard from '../components/ProductCard';

export default function Products({ onQuickView, onInquire }) {
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter logic
  const filteredProducts = productsData.filter((product) => {
    const matchesBrand =
      selectedBrand === 'ALL' || product.brandId === selectedBrand;

    const matchesCategory =
      selectedCategory === 'ALL' || product.category === selectedCategory;

    return matchesBrand && matchesCategory;
  });

  // Get active subcategories based on selected brand
  const getSubcategories = () => {
    if (selectedBrand === 'masterpiece') {
      return ['ALL', 'Door Handles', 'Cabinet Handles', 'Locks', 'Bathroom Accessories'];
    }
    if (selectedBrand === 'aquahevan') {
      return ['ALL', 'Overhead Shower', 'Hand Shower', 'Health Faucet', 'Faucets', 'Bathroom Accessories'];
    }
    return [
      'ALL',
      'Door Handles',
      'Cabinet Handles',
      'Locks',
      'Overhead Shower',
      'Hand Shower',
      'Health Faucet',
      'Faucets',
      'Bathroom Accessories'
    ];
  };

  return (
    <div className="page-wrapper">
      {/* Product Catalog Banner */}
      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(222, 211, 196, 0.08) 0%, transparent 60%)' }}>
        <div className="container">
          <span className="badge-gold">Architectural Specification Showcase</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginTop: '0.85rem', marginBottom: '1rem' }}>
            The <span className="text-gold-gradient">Masterpiece</span> & <span style={{ color: '#72b3d8' }}>Aquahevan</span> Catalog
          </h1>
          <div className="gold-divider gold-divider-center"></div>
          <p style={{ maxWidth: '720px', margin: '0 auto 2rem auto', color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Explore our curated factory-direct collection of solid brass door handles, precision locks, luxury overhead showers, and architectural faucets. Inquire directly with our Jamnagar factory desk for technical brochures and dealer distribution.
          </p>

          <div style={{ display: 'inline-flex', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--accent-border)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', color: 'var(--accent-champagne-light)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>🔒 Direct Factory Showcase</span>
            <span>•</span>
            <span>Technical OEM Inquiries</span>
            <span>•</span>
            <span>100% Quality Assurance</span>
          </div>
        </div>
      </section>

      {/* Catalog Filter Controls */}
      <section className="container" style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {/* Main Brand Selector Toggle */}
          <div className="brand-toggle-bar">
            <button
              type="button"
              className={`brand-toggle-btn ${selectedBrand === 'ALL' ? 'active' : ''}`}
              onClick={() => {
                setSelectedBrand('ALL');
                setSelectedCategory('ALL');
              }}
            >
              All Brands ({productsData.length})
            </button>
            <button
              type="button"
              className={`brand-toggle-btn ${selectedBrand === 'masterpiece' ? 'active' : ''}`}
              onClick={() => {
                setSelectedBrand('masterpiece');
                setSelectedCategory('ALL');
              }}
            >
              MASTERPIECE (Brass Hardware)
            </button>
            <button
              type="button"
              className={`brand-toggle-btn ${selectedBrand === 'aquahevan' ? 'active' : ''}`}
              onClick={() => {
                setSelectedBrand('aquahevan');
                setSelectedCategory('ALL');
              }}
            >
              Aquahevan (Bath Solutions)
            </button>
          </div>

          {/* Subcategory Filter Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {getSubcategories().map((cat, idx) => (
              <button
                type="button"
                key={idx}
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-dark)' }}>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
              No products found for the selected category.
            </p>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setSelectedBrand('ALL');
                setSelectedCategory('ALL');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onInquire={onInquire}
              />
            ))}
          </div>
        )}
      </section>

      {/* Custom Batch Supply CTA */}
      <section style={{ background: 'rgba(13, 16, 23, 0.75)', padding: '4rem 0', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <span className="badge-gold">Custom Manufacturing & Dealerships</span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
              Need Custom Finishes or Bulk Project Specifications?
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6 }}>
              We offer bespoke brass finishes (Antique Copper, Matt Black, Champagne PVD, Brushed Bronze) for luxury bungalows, hotel chains, and major architectural projects with direct factory support.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onInquire({ brand: 'General Inquiry', product: 'Custom Batch Specifications' })}
            >
              <span>Request Custom Specs</span>
            </button>

            <a
              href="https://wa.me/919978716168?text=Hello%20Vivek%20bhai,%20I%20am%20interested%20in%20custom%20brass%20finishes%20and%20bulk%20specifications."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
