import React, { useState, useEffect } from 'react';
import { 
  ServerOff, 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  MessageSquare, 
  Phone, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  WifiOff 
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function ErrorPage({ 
  errorCode = '500',
  errorTitle = 'Server Connection Interrupted',
  errorMessage = 'Hamare Jamnagar factory server se connection me temporary samasya aa rahi hai. Hamari technical team is par kaam kar rahi hai.',
  technicalDetails = null,
  onRetry = null,
  onGoHome = null
}) {
  const [checkingServer, setCheckingServer] = useState(false);
  const [serverStatus, setServerStatus] = useState('unknown');
  const [latency, setLatency] = useState(null);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [lastCheckedTime, setLastCheckedTime] = useState(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    setCheckingServer(true);
    setServerStatus('checking');
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/health', { 
        method: 'GET',
        signal: controller.signal 
      });
      clearTimeout(timeoutId);

      const duration = Math.round(performance.now() - startTime);

      if (res.ok) {
        setServerStatus('online');
        setLatency(duration);
      } else {
        setServerStatus('offline');
        setLatency(null);
      }
    } catch (err) {
      setServerStatus('offline');
      setLatency(null);
    } finally {
      setCheckingServer(false);
      setLastCheckedTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  const handleRetryAction = async () => {
    await checkServerHealth();
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHomeAction = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.hash = 'home';
      window.location.reload();
    }
  };

  const handleWhatsAppSupport = () => {
    const text = encodeURIComponent(
      `Hello Vivek Ji (Aquahevan Enterprise),\n\nI am experiencing a server error on the website:\n• Error Code: ${errorCode}\n• Status: ${serverStatus}\n• Time: ${new Date().toLocaleString('en-IN')}\n\nPlease look into this requirement.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="error-page-container">
      <div className="container" style={{ maxWidth: '780px' }}>
        <div className="error-card">
          
          {/* Header Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <span className="badge-gold">
              <AlertTriangle size={14} />
              <span>HTTP {errorCode} — Internal Server Error</span>
            </span>
          </div>

          {/* Icon */}
          <div style={{ width: '70px', height: '70px', borderRadius: '14px', background: 'rgba(222, 211, 196, 0.1)', border: '1.5px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            {serverStatus === 'offline' ? (
              <WifiOff size={36} color="#f87171" />
            ) : (
              <ServerOff size={36} color="var(--accent-champagne)" />
            )}
          </div>

          {/* Error Number Display */}
          <div className="error-code-glitch">
            {errorCode}
          </div>

          {/* Error Title */}
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
            {errorTitle}
          </h1>

          <div className="gold-divider gold-divider-center" style={{ margin: '1rem auto 1.5rem auto', maxWidth: '90px' }}></div>

          {/* Error Description (Hindi & English) */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '2rem', textAlign: 'left' }}>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              We are currently experiencing a temporary communication issue with our factory backend server in Jamnagar. 
              Your data is safe and our engineering desk is actively monitoring the status.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--accent-champagne-light)', lineHeight: 1.6 }}>
              {errorMessage}
            </p>
          </div>

          {/* Real-time Server Health Diagnostics Widget */}
          <div style={{ background: 'rgba(16, 20, 28, 0.65)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--accent-champagne)" />
                <span style={{ fontWeight: '600', fontSize: '0.88rem', color: '#f8fafc' }}>
                  Live Factory Server Diagnostics
                </span>
              </div>
              
              <button 
                type="button"
                onClick={checkServerHealth}
                disabled={checkingServer}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}
                title="Ping server status"
              >
                <RefreshCw size={12} className={checkingServer ? 'spin-animation' : ''} />
                <span>{checkingServer ? 'Pinging...' : 'Check Status'}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
              {/* Status Indicator */}
              <div>
                <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Server Health</span>
                <div>
                  {serverStatus === 'checking' && <span style={{ color: '#fcd34d' }}>Testing Connection...</span>}
                  {serverStatus === 'online' && <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={13} /> Online ({latency}ms)</span>}
                  {serverStatus === 'offline' && <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><XCircle size={13} /> Unreachable</span>}
                  {serverStatus === 'unknown' && <span style={{ color: '#94a3b8' }}>Checking...</span>}
                </div>
              </div>

              {/* Endpoint */}
              <div>
                <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Monitored Service</span>
                <span style={{ color: '#cbd5e1' }}>/api/health</span>
              </div>

              {/* Node Location */}
              <div>
                <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Location Node</span>
                <span style={{ color: '#cbd5e1' }}>Jamnagar (361004)</span>
              </div>

              {/* Last Checked */}
              <div>
                <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Last Checked</span>
                <span style={{ color: '#cbd5e1' }}>{lastCheckedTime || 'Just now'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button 
              type="button"
              onClick={handleRetryAction} 
              className="btn-primary"
              disabled={checkingServer}
            >
              <RefreshCw size={15} className={checkingServer ? 'spin-animation' : ''} />
              <span>Retry Connection</span>
            </button>

            <button 
              type="button"
              onClick={handleGoHomeAction} 
              className="btn-secondary"
            >
              <Home size={15} />
              <span>Return to Homepage</span>
            </button>

            <button 
              type="button"
              onClick={handleWhatsAppSupport} 
              className="btn-whatsapp"
            >
              <MessageSquare size={15} />
              <span>Direct WhatsApp Desk</span>
            </button>
          </div>

          {/* Collapsible Technical Details */}
          <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '1.25rem' }}>
            <button 
              type="button" 
              onClick={() => setShowTechDetails(!showTechDetails)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
            >
              <span>Technical Diagnostics & Details</span>
              {showTechDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showTechDetails && (
              <div style={{ marginTop: '1rem', background: '#0a0c10', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'left', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <div style={{ marginBottom: '0.35rem' }}><strong>Timestamp:</strong> {new Date().toISOString()}</div>
                <div style={{ marginBottom: '0.35rem' }}><strong>Error Type:</strong> 500 Server Error / Network Disconnect</div>
                <div style={{ marginBottom: '0.35rem' }}><strong>Client Browser:</strong> {navigator.userAgent}</div>
                {technicalDetails && (
                  <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflowX: 'auto' }}>
                    {typeof technicalDetails === 'object' ? JSON.stringify(technicalDetails, null, 2) : technicalDetails.toString()}
                  </pre>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
