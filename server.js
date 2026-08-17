require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const servePage = (fileName) => (req, res) => {
  const filePath = path.join(__dirname, 'public', fileName);
  res.sendFile(filePath);
};

// Routes
app.get('/', servePage('login.html'));
app.get('/login', servePage('login.html'));
app.get('/home', servePage('home.html'));
app.get('/employee', servePage('employees.html'));
app.get('/employees', servePage('employees.html'));
app.get('/customers', servePage('customers.html'));
app.get('/items', servePage('items.html'));
app.get('/invoices', servePage('invoices.html'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});