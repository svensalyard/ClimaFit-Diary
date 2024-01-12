const router = require('express').Router();
const userRoutes = require('./userRoutes');
const openaiRoutes = require('./openaiRoutes');
const weatherRoutes = require('./weatherRoutes')

router.use('/users', userRoutes);
router.use('/openai', openaiRoutes);
router.use('/weatherkey', weatherRoutes);

module.exports = router;
