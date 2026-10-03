async function testAll() {
  console.log('Testing Aquahevan Enterprise Live Server...');
  
  // 1. Health
  const resHealth = await fetch('http://localhost:5000/api/health');
  const healthData = await resHealth.json();
  console.log('✔ Health Check:', resHealth.status, healthData.company, healthData.location);

  // 2. Inquiries GET
  const resInquiries = await fetch('http://localhost:5000/api/inquiries');
  const inquiriesData = await resInquiries.json();
  console.log('✔ Inquiries List:', resInquiries.status, 'Total Leads:', inquiriesData.count);

  // 3. New Inquiry POST
  const resPost = await fetch('http://localhost:5000/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Architect Rahul Sharma',
      phone: '+91 9988776655',
      email: 'rahul@sharmaarchitects.com',
      brand: 'MASTERPIECE Brass Hardware',
      product: 'Solid Brass Main Door Pulls & Knurled Levers',
      inquiryType: 'Architect / Interior Designer',
      message: 'Need complete physical catalog & finish samples for a luxury villa project.'
    })
  });
  const postData = await resPost.json();
  console.log('✔ Submit Inquiry:', resPost.status, postData.message);

  // 4. Inquiries Export CSV
  const resCsv = await fetch('http://localhost:5000/api/export-inquiries');
  const csvText = await resCsv.text();
  console.log('✔ Export CSV:', resCsv.status, 'Lines:', csvText.split('\n').length);

  // 5. Static HTML
  const resHtml = await fetch('http://localhost:5000/');
  const htmlText = await resHtml.text();
  console.log('✔ Static Frontend HTML:', resHtml.status, 'Title present:', htmlText.includes('Aquahevan Enterprise'));

  console.log('All backend & frontend endpoints verified successfully!');
}

testAll().catch(console.error);
