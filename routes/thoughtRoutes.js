const router = require('express').Router();
const Thought = require('../models/Thought');

// GET all thoughts with reaction count
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.success(thoughts);
  } catch (err) {
    res.error('Failed to fetch thoughts');
  }
});

// GET single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.error('No thought found with this ID', 404);
    }
    res.success(thought);
  } catch (err) {
    res.error('Failed to fetch thought');
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.success(newThought);
  } catch (err) {
    res.error('Failed to create thought', 400);
  }
});

// PUT to update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.error('No thought found with this ID', 404);
    }

    res.success(updatedThought);
  } catch (err) {
    res.error('Failed to update thought');
  }
});

// DELETE to remove a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.error('No thought found with this ID', 404);
    }

    res.success({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.error('Failed to delete thought');
  }
});

// POST to add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.error('No thought found with this ID', 404);
    }
    res.success(thought);
  } catch (err) {
    res.error('Failed to add reaction');
  }
});

// DELETE to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.error('No thought found with this ID', 404);
    }
    res.success(thought);
  } catch (err) {
    res.error('Failed to remove reaction');
  }
});

module.exports = router;
