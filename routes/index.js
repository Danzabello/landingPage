//index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the main page of the app
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
          // Correct the path according to your directory structure
          res.sendFile(path.join(__dirname, '..', 'views', 'admin_dashboard.html'));
      } else {
        // Serve student dashboard view
        res.sendFile(path.join(__dirname, '..', 'views', 'student_dashboard.html'));
      }
  } else {
      res.redirect('/login');
  }
});

router.get('/facts', (req, res) => {
    // Assuming authentication is not required to view facts
    res.sendFile(path.join(__dirname, '..', 'views', 'facts.html'));
});

// Serve the Michael Cooley collection page
router.get('/michaelcooleycollection', (req, res) => {
    // Assuming authentication is not required to view the collection
    res.sendFile(path.join(__dirname, '..', 'views', 'michaelcooleycollection.html'));
});

module.exports = router;
