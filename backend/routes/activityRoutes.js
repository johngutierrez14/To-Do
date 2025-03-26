const express = require('express');
const { createActivity, getActivities, updateActivity, deleteActivity } = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:taskId', verifyToken, createActivity);
router.get('/:taskId', verifyToken, getActivities);
router.put('/:taskId/activities/:id', verifyToken, updateActivity);
router.delete('/:taskId/activities/:id', verifyToken, deleteActivity);

module.exports = router;