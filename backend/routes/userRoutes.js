const express = require('express');
const { getAllUsers, getUser , updateUser , deleteUser  } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllUsers);
router.get('/:id', verifyToken, isAdmin, getUser );
router.put('/:id', verifyToken, isAdmin, updateUser );
router.delete('/:id', verifyToken, isAdmin, deleteUser );

module.exports = router;