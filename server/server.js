import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, '..', 'data', 'inquiries.json');

// Ensure data directory and inquiries.json exists
const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
};

ensureDataFile();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to read inquiries
const getInquiries = () => {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
};

// Helper to write inquiries
const saveInquiries = (inquiries) => {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving inquiries:', err);
    return false;
  }
};

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'Aquahevan Enterprise',
    location: 'Jamnagar, Gujarat',
    brands: ['MASTERPIECE', 'Aquahevan'],
    timestamp: new Date().toISOString()
  });
});

// API: Submit new inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, phone, email, brand, product, inquiryType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone Number are required.' });
    }

    const inquiries = getInquiries();
    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      brand: brand || 'General Inquiry',
      product: product || 'General',
      inquiryType: inquiryType || 'Direct Inquiry',
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry); // newest first
    const saved = saveInquiries(inquiries);

    if (!saved) {
      return res.status(500).json({ success: false, error: 'Failed to write to local storage.' });
    }

    console.log(`[INQUIRY RECEIVED] From: ${newInquiry.name} (${newInquiry.phone}) for ${newInquiry.brand}`);
    return res.status(201).json({
      success: true,
      message: 'Inquiry saved successfully! Our team will contact you shortly.',
      inquiry: newInquiry
    });
  } catch (err) {
    console.error('Error in /api/inquiries POST:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// API: Get all inquiries (Admin / Management View)
app.get('/api/inquiries', (req, res) => {
  const inquiries = getInquiries();
  res.json({ success: true, count: inquiries.length, inquiries });
});

// API: Delete inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    let inquiries = getInquiries();
    const initialLength = inquiries.length;
    inquiries = inquiries.filter(item => item.id !== id);

    if (inquiries.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    saveInquiries(inquiries);
    res.json({ success: true, message: 'Inquiry removed.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete inquiry.' });
  }
});

// API: Export Inquiries to CSV
app.get('/api/export-inquiries', (req, res) => {
  try {
    const inquiries = getInquiries();
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Brand', 'Product', 'Inquiry Type', 'Message'];
    
    const rows = inquiries.map(inq => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleString('en-IN')}"`,
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.brand || '').replace(/"/g, '""')}"`,
      `"${(inq.product || '').replace(/"/g, '""')}"`,
      `"${(inq.inquiryType || '').replace(/"/g, '""')}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=Aquahevan_Inquiries_${Date.now()}.csv`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to export CSV.' });
  }
});

// API: Simulate server error for error-page testing
app.get('/api/test-error', (req, res) => {
  res.status(500).json({
    success: false,
    error: 'Simulated 500 Internal Server Error',
    message: 'This is a test 500 server error triggered for testing the Aquahevan Error Page.',
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend in production build
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global 500 error handler middleware
app.use((err, req, res, next) => {
  console.error('[UNHANDLED SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err?.message || 'Unexpected server fault encountered.',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Aquahevan Enterprise Server Active`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Location: Jamnagar, Gujarat, India`);
  console.log(`=========================================`);
});
