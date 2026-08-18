require('dotenv').config();
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

function injectSupabaseConfig(html) {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

  const script = `
  <script>
    window.ENV_SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
    window.ENV_SUPABASE_KEY = ${JSON.stringify(supabaseKey)};
  </script>
  `;

  return html.replace('</head>', `${script}</head>`);
}

const servePage = (fileName) => (req, res) => {
  const filePath = path.join(__dirname, 'public', fileName);

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.status(404).send('Page not found');
      return;
    }

    res.type('html').send(injectSupabaseConfig(html));
  });
};

app.get('/', servePage('login.html'));
app.get('/login', servePage('login.html'));
app.get('/home', servePage('home.html'));
app.get('/employee', servePage('employees.html'));
app.get('/employees', servePage('employees.html'));
app.get('/customers', servePage('customers.html'));
app.get('/items', servePage('items.html'));
app.get('/invoices', servePage('invoices.html'));

app.use(express.static(path.join(__dirname, 'public')));

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;