# Social Network API

## Description

The **Social Network API** is a back-end application that enables the creation and management of users, thoughts, reactions, and friendships. It leverages **Node.js**, **Express.js**, and **MongoDB** with **Mongoose** as the ORM to handle large-scale unstructured data efficiently. This API provides essential functionality for a social networking platform, including user management, thoughts sharing, reactions, and friend connections.

---

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction and Friend Routes](#reaction-and-friend-routes)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---
## Video Walkthrough

https://app.screencastify.com/v2/manage/videos/guC7USOiX7sMQ83FIIDP 


## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
    ```bash
  cd social-network-api

3. Install Dependencies:
    ```bash
    npm install

4. Ensure MongoDB is installed and running on your machine:
    ```bash
    mongod

5. Seed the database (optional):
    ```bash
    node seed.js

6. Start the application: 
    ```bash
    npm run dev

## Usage

1. Start the server:
    ```bash
    npm run dev

2. Use a tool like Insomnia or Postman to test the API endpoints.

3. The API runs on http://localhost:3001.

## API Endpoints

1. User Routes
   
    GET /api/users: Retrieve all users.
    GET /api/users/:id: Retrieve a single user by ID.
    POST /api/users: Create a new user.
        Body:
            json
        {
        "username": "test_user",
        "email": "test_user@example.com"
        }
    PUT /api/users/:id: Update a user's information.
    DELETE /api/users/:id: Delete a user by ID.

2. Thought Routes

    GET /api/thoughts: Retrieve all thoughts.
    GET /api/thoughts/:id: Retrieve a single thought by ID.
    POST /api/thoughts: Create a new thought.
        Body:
            json
        {
        "thoughtText": "This is a thought",
        "username": "test_user"
        }
    PUT /api/thoughts/:id: Update a thought by ID.
    DELETE /api/thoughts/:id: Delete a thought by ID.

3. Reaction and Friend Routes

    POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.
        Body:
            json
        {
        "reactionBody": "This is a reaction",
        "username": "test_user"
        }
    DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.
    POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.
    DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.

## Technologies Used

1. Node.js: JavaScript runtime for server-side development.

2. Express.js: Framework for building RESTful APIs.

3. MongoDB: NoSQL database for storing unstructured data.

4. Mongoose: ODM for MongoDB.

5. JavaScript: Primary programming language.

6. Insomnia: Tool for testing API endpoints.

## Features

1. Users can be created, updated, deleted, and queried.

2. Thoughts (posts) can be created, updated, deleted, and queried.

3. Reactions (comments) can be added and removed from thoughts.

4. Users can add and remove friends from their friend list.

5. Mongoose validation ensures data integrity.

6. Error handling for duplicate entries and missing data.

## Future Enhancements

1. Authentication and Authorization: Add user authentication using JWT.

2. Pagination: Implement pagination for large datasets.

3. Advanced Friend Suggestions: Suggest friends based on mutual connections.

4. Deployment: Host the application on a cloud platform like Render or AWS.
