const router = require('express').Router();
const calendarRoutes = require('./calendarRoutes');
const dayViewRoutes = require('./dayViewRoutes');

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/calendar', calendarRoutes);
router.use('/day', dayViewRoutes);

module.exports = router;
