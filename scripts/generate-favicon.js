import fs from 'fs';
import path from 'path';

const logoPath = path.resolve('public/assets/brand/aquahevan-logo.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="tabGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0284c7" flood-opacity="0.25"/>
    </filter>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <!-- Clean Crisp White Background with rounded corners for tab visibility -->
  <rect x="12" y="12" width="488" height="488" rx="110" fill="#ffffff" stroke="url(#borderGrad)" stroke-width="12" filter="url(#tabGlow)"/>
  <!-- Official Registered AQUA hevan Logo -->
  <image href="data:image/png;base64,${logoBase64}" x="30" y="30" width="452" height="452" preserveAspectRatio="xMidYMid meet" />
</svg>
`;

fs.writeFileSync(path.resolve('public/favicon.svg'), svgContent);
console.log('favicon.svg successfully generated with registered logo!');
