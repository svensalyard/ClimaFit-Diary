const express = require('express');
const router = express.Router();

// Route for detailed day view
router.get('/day/:date', (req, res) => {
    try {
      res.render('calendar/day-view', { date: req.params.date });
    } catch (error) {
      res.status(500).send('Error rendering page');
    }
  });
  
module.exports = router;
