const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = [
  { username: 'john_doe', email: 'john.doe@example.com' },
  { username: 'jane_doe', email: 'jane.doe@example.com' },
];

const seedThoughts = [
  { thoughtText: 'This is John\'s first thought!', username: 'john_doe' },
  { thoughtText: 'This is Jane\'s first thought!', username: 'jane_doe' },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(seedUsers);
    console.log('Users seeded:', users);

    const thoughts = await Thought.insertMany(seedThoughts);
    console.log('Thoughts seeded:', thoughts);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
