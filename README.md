# mern-authentication
Project for MERN authentication (users can registers, login, logout)

A full-stack minimal MERN app with users authenticatoin (JsonWebToken, Passport) and implementation of Redux for global state management.

Preview the app [here](https://www.youtube.com/watch?v=E_p8WOMUfto)

How to use this repository:

1) Git clone this reposity
2) Configure your own MongoDB URI in config/key.js as below:

module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};

3) npm install and cd into client and do the npm install again for installing dependencies.
4) npm run dev to run both client & server concurrently. Client will run at localhost:3000 while server on localhost:5000
