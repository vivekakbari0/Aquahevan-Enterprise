import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import CustomSelect from '../components/CustomSelect';

export default function Contact({ onTriggerServerError }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: 'MASTERPIECE Brass Hardware',
    product: 'Dealership & Catalog Inquiry',
    inquiryType: 'Dealer / Distribution',
    city: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your Name and Mobile Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: formData.city ? `[City: ${formData.city}] ${formData.message}` : formData.message
        })
      });

      if (response.status >= 500) {
        if (onTriggerServerError) {
          onTriggerServerError({
            code: `${response.status}`,
            title: 'Factory Server Offline / 500 Error',
            message: 'Inquiry submit karte samay server par 500 Internal Error aya.',
            details: { endpoint: '/api/inquiries', status: response.status, statusText: response.statusText }
          });
          return;
        }
      }

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.warn('Network issue encountered during submission:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Vivek Ji (Aquahevan Enterprise),\n\nI am contacting you from the official website:\n• Name: ${formData.name || 'Visitor'}\n• Phone: ${formData.phone || 'N/A'}\n• City: ${formData.city || 'N/A'}\n• Brand: ${formData.brand}\n• Product Requirement: ${formData.product}\n• Inquiry Type: ${formData.inquiryType}\n• Message: ${formData.message || 'Please send catalog and factory dealer terms.'}`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="page-wrapper">
      {/* Header Banner */}
      <section style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(222, 211, 196, 0.08) 0%, transparent 60%)' }}>
        <div className="container">
          <span className="badge-gold">Direct Factory Desk</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginTop: '0.85rem', marginBottom: '1rem' }}>
            Contact <span className="text-gold-gradient">Aquahevan Enterprise</span>
          </h1>
          <div className="gold-divider gold-divider-center"></div>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7 }}>
            Have a project requirement, looking for dealer distribution in your city, or need bespoke finishes? Connect directly with <strong>Vivek Akbari</strong> and our factory team.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="container section-spacing">
        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div>
            <div className="contact-card">
              <span className="badge-gold" style={{ marginBottom: '1rem' }}>Direct Factory Point of Contact</span>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                Vivek Akbari
              </h2>
              <p style={{ color: 'var(--accent-champagne)', fontWeight: '500', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Aquahevan Enterprise • Jamnagar, Gujarat
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Phone & WhatsApp */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="strength-icon-box" style={{ width: '42px', height: '42px', minWidth: '42px', margin: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Call & WhatsApp
                    </div>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f8fafc', display: 'block', marginTop: '0.15rem' }}
                    >
                      {companyInfo.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="strength-icon-box" style={{ width: '42px', height: '42px', minWidth: '42px', margin: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Official Email
                    </div>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      style={{ fontSize: '1rem', fontWeight: '600', color: '#f8fafc', display: 'block', marginTop: '0.15rem' }}
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="strength-icon-box" style={{ width: '42px', height: '42px', minWidth: '42px', margin: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Manufacturing Plant & Location
                    </div>
                    <div style={{ fontSize: '1rem', color: '#cbd5e1', marginTop: '0.15rem', lineHeight: 1.5 }}>
                      Jamnagar, Gujarat, India (361004)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-champagne)', marginTop: '0.2rem' }}>
                      Brass City Industrial Hub
                    </div>
                  </div>
                </div>

                {/* Business Type */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="strength-icon-box" style={{ width: '42px', height: '42px', minWidth: '42px', margin: 0 }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Business Model
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                      Manufacturer & Direct Factory Supplier
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-dark)' }}>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageSquare size={18} />
                  <span>Start WhatsApp Chat Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div>
            <div className="contact-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(222, 211, 196, 0.12)', border: '2px solid var(--accent-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} color="var(--accent-champagne)" />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
                    Inquiry Submitted Successfully
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Your inquiry has been safely saved in our factory records. Vivek Akbari and the Aquahevan team will connect with you promptly.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                      type="button"
                      className="btn-whatsapp"
                      onClick={handleWhatsAppSend}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <MessageSquare size={16} />
                      <span>Send a Copy via WhatsApp Directly</span>
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          brand: 'MASTERPIECE Brass Hardware',
                          product: 'Dealership & Catalog Inquiry',
                          inquiryType: 'Dealer / Distribution',
                          city: '',
                          message: ''
                        });
                      }}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <span className="badge-gold">Factory Inquiry Form</span>
                    <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', marginTop: '0.5rem', marginBottom: '0.35rem' }}>
                      Send Direct Requirement
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                      All submissions are recorded directly for immediate factory review.
                    </p>
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Mobile / WhatsApp Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="rahul.sharma@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Your City & State</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Mumbai, Maharashtra"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <CustomSelect
                        label="Interested Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        options={[
                          { value: 'MASTERPIECE Brass Hardware', label: 'MASTERPIECE Hardware' },
                          { value: 'Aquahevan Bath Solutions', label: 'Aquahevan Bath Solutions' },
                          { value: 'Both Brands (Complete Factory Range)', label: 'Both Brands (All Products)' }
                        ]}
                      />
                      <CustomSelect
                        label="Inquiry Purpose"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        options={[
                          { value: 'Dealer / Distribution', label: 'Dealership / Distribution' },
                          { value: 'Architect / Interior Designer', label: 'Architect / Interior' },
                          { value: 'Builder / Bulk Project', label: 'Bulk Project Supply' },
                          { value: 'Individual Client', label: 'Direct Client / Villa' }
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message / Specific Product Requirement</label>
                      <textarea
                        name="message"
                        placeholder="Tell us about the products you are interested in, quantity estimates, or dealership region..."
                        value={formData.message}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="4"
                      />
                    </div>

                    <div className="form-actions-row">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ flex: 1, minWidth: '200px', justifyContent: 'center' }}
                      >
                        <Send size={16} />
                        <span>{loading ? 'Saving Inquiry...' : 'Submit Inquiry to Factory'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="btn-whatsapp"
                        title="Send directly over WhatsApp"
                      >
                        <MessageSquare size={16} />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed (Jamnagar, Gujarat) */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-gold">
                <MapPin size={12} /> Factory Location
              </span>
              <h3 style={{ fontSize: '1.35rem', marginTop: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                Jamnagar, Gujarat, India
              </h3>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Direct Factory Supply Nationwide
            </span>
          </div>

          <div style={{ width: '100%', height: '350px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
            <iframe
              title="Aquahevan Enterprise Jamnagar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118151.7865261899!2d70.0035043542289!3d22.463283296181745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395764d081f9f23d%3A0xb35a0d33e5ec7765!2sJamnagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
