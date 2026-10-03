import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Flame,
  Layers,
  BadgeCheck
} from 'lucide-react';

export default function About({ setActivePage, onInquire }) {
  return (
    <div className="page-wrapper">
      {/* Header Banner */}
      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(222, 211, 196, 0.08) 0%, transparent 60%)' }}>
        <div className="container">
          <span className="badge-gold">Jamnagar Factory Heritage</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginTop: '0.85rem', marginBottom: '1rem' }}>
            The Story of <span className="text-gold-gradient">Aquahevan Enterprise</span>
          </h1>
          <div className="gold-divider gold-divider-center"></div>
          <p style={{ maxWidth: '760px', margin: '0 auto', color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7 }}>
            Rooted in Jamnagar — the internationally recognized <em>Brass City of India</em> — Aquahevan Enterprise stands at the intersection of traditional brass metallurgy and modern high-precision engineering.
          </p>
        </div>
      </section>

      {/* Main Story & Factory Metallurgy Grid */}
      <section className="container section-spacing">
        <div className="about-hero-grid">
          <div>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>Direct Factory Lineage</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
              From Molten Virgin Brass to Architectural Elegance
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Founded with the vision to deliver uncompromising quality directly from the factory floor, <strong>Aquahevan Enterprise</strong> is driven by <strong>Vivek Akbari</strong> in Jamnagar, Gujarat.
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              Unlike trading houses or intermediaries, we maintain complete end-to-end control over our manufacturing processes: from raw ingot smelting and gravity die casting to robotic CNC milling, multi-tier hand buffing, and advanced PVD electro-coating.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-champagne)" />
                <span style={{ color: '#f8fafc', fontWeight: '500' }}>Direct Factory Manufacturing in Jamnagar, Gujarat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-champagne)" />
                <span style={{ color: '#f8fafc', fontWeight: '500' }}>100% Solid Brass Casting with Zero Porosity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-champagne)" />
                <span style={{ color: '#f8fafc', fontWeight: '500' }}>Multi-Stage Triple Layer Electroplating Protection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-champagne)" />
                <span style={{ color: '#f8fafc', fontWeight: '500' }}>Complete Dealer & Distributor Network Empowerment</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => onInquire({ brand: 'General Inquiry', product: 'Dealership & Direct Supply Terms' })}
            >
              <span>Connect with Vivek Akbari</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Image Showcase Card */}
          <div className="about-image-card">
            <img
              src="/assets/hero/factory_craft_hero.jpg"
              alt="Jamnagar Brass Metallurgy Factory"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div style={{ padding: '1.25rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <MapPin size={16} color="var(--accent-champagne)" />
                <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.95rem' }}>
                  Jamnagar, Gujarat, India
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                The epicenter of world-class brass manufacturing, hardware exports, and precision metallurgy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Engineering Pillars */}
      <section className="section-spacing" style={{ background: 'rgba(13, 16, 23, 0.75)', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span className="badge-gold">Quality Assured</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.4rem)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              The 3 Pillars of Aquahevan Craftsmanship
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              How our products consistently exceed industry benchmarks in durability, aesthetics, and tactile luxury.
            </p>
          </div>

          <div className="craft-pillars-grid">
            <div className="craft-pillar-card">
              <div className="strength-icon-box">
                <Flame size={24} color="var(--accent-champagne)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                1. Virgin Grade Alloy Smelting
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                We use pure IS 319 Grade-I brass ingots and marine-grade SS-304. This guarantees zero micro-voids, optimal tensile strength, and superior resistance to mechanical fatigue.
              </p>
            </div>

            <div className="craft-pillar-card">
              <div className="strength-icon-box" style={{ background: 'rgba(114, 179, 216, 0.08)', borderColor: 'rgba(114, 179, 216, 0.3)' }}>
                <Layers size={24} color="#72b3d8" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                2. Triple PVD Electro-Coating
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                Our 3-tier coating process (Nickel base + Chromium / Titanium PVD + Baked Anti-Tarnish Lacquer) forms a molecular bond that repels oxidation, saltwater air, and harsh cleaning agents.
              </p>
            </div>

            <div className="craft-pillar-card">
              <div className="strength-icon-box" style={{ background: 'rgba(74, 222, 128, 0.08)', borderColor: 'rgba(74, 222, 128, 0.3)' }}>
                <BadgeCheck size={24} color="#4ade80" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                3. 100% Replacement Guarantee
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                Every single handle, lock, shower, and faucet undergoes manual quality inspection. We back every unit with an unconditional replacement guarantee on manufacturing defects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Direct Factory Promise */}
      <section className="container section-spacing">
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius-md)', padding: 'clamp(2rem, 4vw, 3.5rem)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '750px' }}>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>Leadership & Vision</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
              "Quality is Not an Accident, It is Pure Factory Discipline."
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '2rem' }}>
              "At Aquahevan Enterprise, our goal has always been crystal clear: create hardware and bath fittings so robust and beautiful that dealers sell them with pride, and architects specify them with complete confidence. When you deal with Aquahevan, you deal directly with the factory that shapes the metal."
            </p>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc' }}>
                Vivek Akbari
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-champagne)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Managing Director, Aquahevan Enterprise
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
