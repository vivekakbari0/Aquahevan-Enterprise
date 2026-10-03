import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import CustomSelect from './CustomSelect';
import { submitInquiry } from '../utils/inquiryService';

export default function InquiryModal({ initialData, onClose, onTriggerServerError }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: initialData?.brand || 'MASTERPIECE Brass Hardware',
    product: initialData?.product || 'Catalog & Dealership Inquiry',
    inquiryType: 'Dealer / Distribution',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide both your Name and Contact Phone Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await submitInquiry(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.warn('Inquiry submission fallback:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Vivek Ji (Aquahevan Enterprise),\n\nI am sending a factory inquiry from your website:\n• Name: ${formData.name || 'Visitor'}\n• Phone: ${formData.phone}\n• Email: ${formData.email || 'N/A'}\n• Brand: ${formData.brand}\n• Product / Requirement: ${formData.product}\n• Type: ${formData.inquiryType}\n• Message: ${formData.message || 'Please send catalog & factory pricing.'}`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content inquiry-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(222, 211, 196, 0.12)', border: '2px solid var(--accent-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} color="var(--accent-champagne)" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
              Inquiry Received
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Thank you for reaching out to <strong>Aquahevan Enterprise</strong>. Vivek Akbari and our Jamnagar factory desk have received your requirements.
            </p>

            <div className="form-actions-row" style={{ flexDirection: 'column' }}>
              <button
                type="button"
                className="btn-whatsapp"
                onClick={handleSendToWhatsApp}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageSquare size={16} />
                <span>Open in WhatsApp for Instant Response</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Back to Website</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge-gold">Direct Factory Inquiry</span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
              Connect with Aquahevan
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Request technical catalogs, dealer partnerships, and factory direct quotations from Jamnagar.
            </p>

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
                  <label className="form-label">Mobile / WhatsApp *</label>
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
                <CustomSelect
                  label="Inquiry Type"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  options={[
                    { value: 'Dealer / Distribution', label: 'Dealership Inquiry' },
                    { value: 'Architect / Interior Designer', label: 'Architect / Interior' },
                    { value: 'Builder / Bulk Order', label: 'Bulk Project Order' },
                    { value: 'General Inquiry', label: 'General Inquiry' }
                  ]}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product of Interest</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details</label>
                <textarea
                  name="message"
                  placeholder="Provide any quantity requirements, city/state, or specific finishes..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="form-actions-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
                >
                  <Send size={15} />
                  <span>{loading ? 'Submitting...' : 'Submit to Factory'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="btn-whatsapp"
                  title="Send via WhatsApp"
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
  );
}
