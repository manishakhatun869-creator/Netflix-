import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
const distAdminPath = path.join(__dirname, '..', 'dist-admin');
const indexPath = path.join(distPath, 'index.html');
const adminIndexPath = path.join(distAdminPath, 'index.html');

console.log('Preparing admin build...');

// Ensure dist exists
if (!fs.existsSync(distPath)) {
  console.error('dist folder not found, run npm run build first');
  process.exit(1);
}

// Copy dist to dist-admin
fs.rmSync(distAdminPath, { recursive: true, force: true });
fs.cpSync(distPath, distAdminPath, { recursive: true });

console.log('Copied dist to dist-admin');

// Inject admin flag into index.html
let html = fs.readFileSync(adminIndexPath, 'utf-8');

// Inject script before </head> that sets IS_ADMIN_APK and app_mode
const injection = `
    <script>
      window.IS_ADMIN_APK = true;
      localStorage.setItem('app_mode', 'admin');
      document.title = 'Netflix Admin';
      console.log('Admin APK mode enabled');
    </script>
`;

if (html.includes('</head>')) {
  html = html.replace('</head>', `${injection}</head>`);
} else {
  html = injection + html;
}

fs.writeFileSync(adminIndexPath, html, 'utf-8');
console.log('Injected admin flag into dist-admin/index.html');
console.log('Admin build ready at dist-admin/');
