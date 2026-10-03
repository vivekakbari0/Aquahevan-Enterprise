import React, { useState, useEffect } from 'react';
import { X, Download, Trash2, RefreshCw, Lock, Search, Phone, Mail, Calendar, AlertTriangle } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function AdminInquiries({ onClose, onTriggerServerError }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('ALL');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.status >= 500) {
        if (onTriggerServerError) {
          onClose();
          onTriggerServerError({
            code: `${res.status}`,
            title: 'Database & Inquiries API Failure',
            message: 'Inquiries load karte waqt server error aya (500).',
            details: { endpoint: '/api/inquiries', status: res.status }
          });
          return;
        }
      }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();

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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert('Error deleting inquiry.');
    }
  };

  const handleExportCSV = () => {
    window.open('/api/export-inquiries', '_blank');
  };

  const handleTestErrorPage = async () => {
    try {
      const res = await fetch('/api/test-error');
      const data = await res.json();
      if (onTriggerServerError) {
        onClose();
        onTriggerServerError({
          code: '500',
          title: 'Simulated 500 Server Error',
          message: data.message || 'Test error triggered from management portal.',
          details: data
        });
      }
    } catch (err) {
      if (onTriggerServerError) {
        onClose();
        onTriggerServerError({
          code: '500 (Offline)',
          title: 'Backend Disconnected',
          message: 'Server unreachable during test ping.',
          details: { error: err.message }
        });
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      (inq.name && inq.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.phone && inq.phone.includes(searchTerm)) ||
      (inq.product && inq.product.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.message && inq.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBrand =
      brandFilter === 'ALL' || (inq.brand && inq.brand.toLowerCase().includes(brandFilter.toLowerCase()));

    return matchesSearch && matchesBrand;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '980px', padding: '2.5rem' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-gold">
                <Lock size={12} /> Management Portal
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)' }}>
              Inquiry Records & Leads
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Real-time inquiries stored securely in local database (<code>data/inquiries.json</code>).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleTestErrorPage}
              className="btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}
              title="Test 500 Error Page"
            >
              <AlertTriangle size={13} color="#f87171" />
              <span>Simulate 500 Error</span>
            </button>

            <button
              type="button"
              onClick={fetchInquiries}
              className="btn-secondary"
              style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem' }}
              title="Refresh Inquiries"
            >
              <RefreshCw size={13} className={loading ? 'pulse-glow' : ''} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="btn-primary"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by name, phone, product, or requirement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <CustomSelect
            name="brandFilter"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Brands' },
              { value: 'MASTERPIECE', label: 'MASTERPIECE Brass' },
              { value: 'Aquahevan', label: 'Aquahevan Bath' }
            ]}
          />
        </div>

        {/* Inquiries Table / Cards */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <RefreshCw size={28} className="pulse-glow" style={{ margin: '0 auto 1rem auto' }} />
            <p>Loading inquiries from local database...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)' }}>
            <p style={{ color: '#94a3b8' }}>No inquiries found matching your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '55vh', overflowY: 'auto' }}>
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 45px',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                {/* Contact details */}
                <div>
                  <div style={{ fontWeight: '600', color: '#f8fafc', fontSize: '1rem', marginBottom: '0.2rem' }}>
                    {inq.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-champagne)', fontSize: '0.85rem', marginBottom: '0.15rem' }}>
                    <Phone size={12} />
                    <a href={`tel:${inq.phone}`} style={{ color: 'var(--accent-champagne)' }}>{inq.phone}</a>
                  </div>
                  {inq.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                      <Mail size={12} />
                      <span>{inq.email}</span>
                    </div>
                  )}
                </div>

                {/* Product / Requirement */}
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#72b3d8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                    {inq.brand}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', fontWeight: '500', marginBottom: '0.25rem' }}>
                    {inq.product}
                  </div>
                  {inq.message && (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      "{inq.message}"
                    </div>
                  )}
                </div>

                {/* Meta details */}
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                    <Calendar size={12} />
                    <span>{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <span className="spec-pill" style={{ fontSize: '0.72rem' }}>
                    {inq.inquiryType || 'Direct Inquiry'}
                  </span>
                </div>

                {/* Delete action */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      padding: '0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Delete record"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
