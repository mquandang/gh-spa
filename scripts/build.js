const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all HTML files from public to dist
const publicDir = path.join(__dirname, '../public');
const files = fs.readdirSync(publicDir);

files.forEach(file => {
  if (file.endsWith('.html')) {
    const source = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    fs.copyFileSync(source, dest);
    console.log(`✓ Copied ${file} to dist/`);
  }
});

console.log('✓ Build complete: HTML files copied to dist/');
