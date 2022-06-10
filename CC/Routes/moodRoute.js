const moodController = require('../Controller/moodController');
const router = require('express').Router();

// Routes untuk model
router.post('/addModel', moodController.addModel);
router.get('/', moodController.getAllModel);
router.get('/getModel/:ID', moodController.getModelByID);
//router.get('/getSummarize/:category/:location', auth, SummarizeController.getSummarizeByLocation);
// router.get('/getSummarize/:id', auth, SummarizeController.getSummarizeByID);

module.exports = router;