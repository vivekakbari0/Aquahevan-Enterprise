import React, { useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function ProductModal({ product, onClose, onInquire }) {
  if (!product) return null;

  const isMasterpiece = product.brandId === 'masterpiece';

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

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Vivek Ji (Aquahevan Enterprise),\n\nI am viewing your website product:\n• Brand: ${product.brand}\n• Product: ${product.name}\n• Category: ${product.category}\n\nPlease share the technical specifications, catalog and factory dealer terms.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content product-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="product-modal-grid">
          {/* Product Image Column */}
          <div className="product-modal-image-col">
            <img
              src={product.image}
              alt={product.name}
              className="product-modal-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="product-modal-brand-badge">
              <span className={`product-brand-tag ${isMasterpiece ? 'masterpiece' : 'aquahevan'}`}>
                {product.brand} Collection
              </span>
            </div>
          </div>

          {/* Product Details Column (Scrollable) */}
          <div className="product-modal-details-col">
            <div className="product-modal-details-inner">
              <div className="product-category-sub">{product.category}</div>
              <h2 className="product-modal-title">
                {product.name}
              </h2>
              <p className="product-modal-desc">
                {product.description}
              </p>

              {/* Specifications Block */}
              <div className="product-modal-specs">
                <div className="product-modal-spec-row">
                  <strong>Material:</strong> {product.material}
                </div>
                {product.sizes && (
                  <div className="product-modal-spec-row">
                    <strong>Sizes / Options:</strong> {product.sizes.join(', ')}
                  </div>
                )}
              </div>

              {/* Finishes List */}
              {product.finishes && product.finishes.length > 0 && (
                <div className="product-modal-section">
                  <div className="product-modal-section-title">
                    Available Finishes
                  </div>
                  <div className="product-modal-finishes-list">
                    {product.finishes.map((finish, idx) => (
                      <span key={idx} className="spec-pill" style={{ color: '#e2e8f0' }}>
                        {finish}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="product-modal-section">
                  <div className="product-modal-section-title">
                    Engineering Highlights
                  </div>
                  <div className="product-modal-features-list">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="product-modal-feature-item">
                        <CheckCircle2 size={14} color="var(--accent-champagne)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Inquire & WhatsApp CTA */}
            <div className="product-modal-actions">
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  onClose();
                  onInquire({ brand: product.brand, product: product.name });
                }}
              >
                <Send size={15} />
                <span>Send Factory Inquiry</span>
              </button>

              <button
                type="button"
                className="btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleWhatsAppDirect}
              >
                <MessageSquare size={15} />
                <span>Direct WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

