import React from 'react';
import { Eye, Send } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onInquire }) {
  const isMasterpiece = product.brandId === 'masterpiece';

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <span className={`product-brand-tag ${isMasterpiece ? 'masterpiece' : 'aquahevan'}`}>
          {product.brand}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>

      <div className="product-body">
        <div>
          <div className="product-category-sub">{product.category}</div>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-desc">{product.tagline || product.description}</p>
          
          {/* Finishes Available */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              Finishes Available:
            </div>
            <div className="product-spec-pills">
              {product.finishes.slice(0, 3).map((finish, idx) => (
                <span key={idx} className="spec-pill">
                  {finish}
                </span>
              ))}
              {product.finishes.length > 3 && (
                <span className="spec-pill" style={{ color: 'var(--accent-champagne)' }}>
                  +{product.finishes.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            type="button"
            className="btn-inquire"
            onClick={() => onInquire({ brand: product.brand, product: product.name })}
            title="Inquire about this product directly from factory"
          >
            <Send size={14} />
            <span>Inquire Product</span>
          </button>
          
          <button
            type="button"
            className="btn-quickview"
            onClick={() => onQuickView(product)}
            title="View Full Specifications"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
