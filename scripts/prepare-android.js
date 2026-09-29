import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const distPath = path.join(root, 'dist');
const distAdminPath = path.join(root, 'dist-admin');

const userAssets = path.join(root, 'android-user', 'app', 'src', 'main', 'assets', 'public');
const adminAssets = path.join(root, 'android-admin', 'app', 'src', 'main', 'assets', 'public');

console.log('Preparing Android assets...');

// Ensure dist exists
if (!fs.existsSync(distPath)) {
  console.error('dist not found, run npm run build first');
  process.exit(1);
}
if (!fs.existsSync(distAdminPath)) {
  console.error('dist-admin not found, run node scripts/prepare-admin.js first');
  process.exit(1);
}

// User APK assets
console.log('Copying user assets...');
fs.rmSync(userAssets, { recursive: true, force: true });
fs.mkdirSync(userAssets, { recursive: true });
fs.cpSync(distPath, userAssets, { recursive: true });
console.log(`✓ User assets copied to ${userAssets}`);

// Admin APK assets
console.log('Copying admin assets...');
fs.rmSync(adminAssets, { recursive: true, force: true });
fs.mkdirSync(adminAssets, { recursive: true });
fs.cpSync(distAdminPath, adminAssets, { recursive: true });
console.log(`✓ Admin assets copied to ${adminAssets}`);

// Extra injection for admin to ensure flag in android assets
const adminIndex = path.join(adminAssets, 'index.html');
if (fs.existsSync(adminIndex)) {
  let html = fs.readFileSync(adminIndex, 'utf-8');
  if (!html.includes('IS_ADMIN_APK')) {
    const injection = `<script>window.IS_ADMIN_APK=true;localStorage.setItem('app_mode','admin');document.title='Netflix Admin';</script>`;
    html = html.replace('</head>', `${injection}</head>`);
    fs.writeFileSync(adminIndex, html, 'utf-8');
    console.log('✓ Injected admin flag into android-admin assets');
  }
}

console.log('Android assets ready!');
