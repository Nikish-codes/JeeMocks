const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to serve question data
app.get('/api/questions', (req, res) => {
  // Implement your logic to read and serve question data from JSON files
  // Example logic:
  // res.json(questions);
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
