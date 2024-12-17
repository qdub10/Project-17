const router = require('express').Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('friends').populate('thoughts');
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
