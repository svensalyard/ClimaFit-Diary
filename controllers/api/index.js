const router = require('express').Router();
const userRoutes = require('./userRoutes');
const openaiRoutes = require('./openaiRoutes');

router.use('/users', userRoutes);
router.use('/openai', openaiRoutes);

module.exports = router;
