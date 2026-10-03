import React from 'react';
import { MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function WhatsAppFloating() {
  return (
    <a
      href={companyInfo.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      title="Chat with Vivek Akbari on WhatsApp"
      id="floating-whatsapp-btn"
    >
      <MessageSquare size={20} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
