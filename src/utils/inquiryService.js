import { companyInfo } from '../data/companyData';

export async function submitInquiry(formData) {
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const newRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: formData.name ? formData.name.trim() : '',
    phone: formData.phone ? formData.phone.trim() : '',
    email: formData.email ? formData.email.trim() : '',
    brand: formData.brand || 'MASTERPIECE Brass Hardware',
    product: formData.product || 'General Catalog Inquiry',
    inquiryType: formData.inquiryType || 'Dealer / Distribution',
    city: formData.city ? formData.city.trim() : '',
    message: formData.message ? formData.message.trim() : '',
    createdAt: new Date().toISOString()
  };

  // 1. Save in browser localStorage for Management/Admin Portal
  try {
    const existing = JSON.parse(localStorage.getItem('aquahevan_inquiries') || '[]');
    existing.unshift(newRecord);
    localStorage.setItem('aquahevan_inquiries', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save warning:', err);
  }

  // 2. Attempt local backend save if running with Express server
  try {
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).catch(() => {});
  } catch (err) {
    // silently ignore backend offline on static Vercel
  }

  // 3. Send email to Gmail via FormSubmit
  const emailPayload = {
    _subject: `New Factory Lead: ${newRecord.name} (${newRecord.phone}) - Aquahevan Website`,
    _template: 'table',
    _captcha: 'false',
    'Customer Name': newRecord.name,
    'Mobile / WhatsApp': newRecord.phone,
    'Email Address': newRecord.email || 'Not Provided',
    'City & State': newRecord.city || 'Not Provided',
    'Brand Interested': newRecord.brand,
    'Product / Requirement': newRecord.product,
    'Inquiry Type': newRecord.inquiryType,
    'Message / Specifications': newRecord.message || 'Standard inquiry received from website.',
    'Submitted At': timestamp
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${companyInfo.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      console.warn('FormSubmit email returned non-200:', response.status);
    }
    return { success: true, record: newRecord };
  } catch (error) {
    console.warn('FormSubmit network error, fallback to successful client capture:', error);
    return { success: true, record: newRecord };
  }
}

export function getStoredInquiries() {
  try {
    return JSON.parse(localStorage.getItem('aquahevan_inquiries') || '[]');
  } catch (err) {
    return [];
  }
}

export function deleteStoredInquiry(id) {
  try {
    const existing = JSON.parse(localStorage.getItem('aquahevan_inquiries') || '[]');
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem('aquahevan_inquiries', JSON.stringify(updated));
    return updated;
  } catch (err) {
    return [];
  }
}
