const express = require('express');
const router = express.Router();

// Route for month view
router.get('/month', (req, res) => {
  res.render('calendar/month-view', { /* pass any necessary data */ });
});

module.exports = router;
