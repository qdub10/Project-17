const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: [true, 'Path `thoughtText` is required.'],
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: [true, 'Path `username` is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  reactions: [
    {
      reactionBody: String,
      username: String,
      createdAt: Date,
    },
  ],
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
