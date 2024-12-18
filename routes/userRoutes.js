const router = require('express').Router();
const User = require('../models/User');

// GET all users with populated thoughts and friends
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.success(users);
  } catch (err) {
    res.error('Failed to fetch users');
  }
});

// GET single user by ID with populated thoughts and friends
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.error('No user found with this ID', 404);
    }
    res.success(user);
  } catch (err) {
    res.error('Failed to fetch user');
  }
});

// POST to create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Create the user
    res.success(newUser); // Use success response
  } catch (err) {
    console.error(err); // Log errors
    res.error('Failed to create user', 400); // Return error response
  }
});

// PUT to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated document and run validations
    );

    if (!updatedUser) {
      return res.error('No user found with this ID', 404);
    }

    res.success(updatedUser); // Respond with the updated user
  } catch (err) {
    console.error(err); // Log error
    res.error('Failed to update user');
  }
});

// DELETE to remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.error('No user found with this ID', 404);
    }

    res.success({ message: 'User deleted successfully!', deletedUser });
  } catch (err) {
    res.error('Failed to delete user');
  }
});

// POST to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } }, // Add friend (no duplicates)
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.error('No user found with this ID', 404);
    }

    res.success({ message: 'Friend added successfully!', user });
  } catch (err) {
    res.error('Failed to add friend');
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } }, // Remove friend
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.error('No user found with this ID', 404);
    }

    res.success({ message: 'Friend removed successfully!', user });
  } catch (err) {
    res.error('Failed to remove friend');
  }
});

module.exports = router;
