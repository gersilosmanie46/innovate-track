/* 
Filename: ComplexJavaScriptCode.js

This code demonstrates a complex implementation of a chat application using JavaScript.
It includes features such as user authentication, real-time messaging, message history,
and user presence indication.

Author: [Your Name]
*/

// Import required libraries
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const socket = require('socket.io');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Configure middleware and view engine
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure database (assuming MongoDB)
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/chatapp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create models using Mongoose
const User = require('./models/user');
const Message = require('./models/message');

// Define authentication strategies (e.g., local, Google, Facebook, etc.)
const localStrategy = require('passport-local').Strategy;

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username' });

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res === false)
          return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.get('/chat', ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Implement user authentication middleware
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Create server for real-time messaging
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = socket(server);
const connections = [];

io.on('connection', (socket) => {
  connections.push(socket);
  console.log(`Connected: ${socket.id}`);

  // Handle user disconnection
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${socket.id}`);
  });

  // Handle new chat message
  socket.on('chat', (data) => {
    const { username, message } = data;
    const newMessage = new Message({ username, message });

    newMessage.save((err) => {
      if (err) throw err;

      io.emit('chat', newMessage);
    });
  });

  // Send message history to new user
  Message.find({})
    .limit(10)
    .sort({ _id: -1 })
    .exec((err, messages) => {
      if (err) throw err;

      socket.emit('messageHistory', messages);
    });
});

// Print connected users' count in chat
setInterval(() => {
  io.emit('userCount', { count: connections.length });
}, 1000);

// Display welcome message and user count on server startup
console.log('Server started. Welcome to the chat!');
console.log(`Total users connected: ${connections.length}`);

// Export app for testing purposes
module.exports = app;