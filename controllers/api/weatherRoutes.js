require('dotenv').config();
const router = require('express').Router();

router.get("/",(req, res) => {
    res.json(process.env.OPENWEATHER_API_KEY)
});

module.exports = router;