const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;

// Serve static files from the "dist" directory (generated by Vite)
app.use(express.static(path.join(__dirname, 'dist')));

// Set the correct Content-Type header for JavaScript and JSX module files
app.use((req, res, next) => {
  const url = req.url;
  if (url.endsWith('.js') || url.endsWith('.jsx')) {
    res.type('application/javascript');
  }
  next();
});

// Redirect all routes to index.html (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
