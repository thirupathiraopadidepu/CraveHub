// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thirupathi@1233',
    database: 'fooditems' // Update the database/schema name here
  });
  

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Routes

// Route for creating a new user with mobile number and password
app.post('/signup', (req, res) => {
  const { mobile_number, password } = req.body;
  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    // Store user details in database
    const sql = 'INSERT INTO users (mobile_number, password, otp) VALUES (?, ?, ?)';
    connection.query(sql, [mobile_number, hash, otp], (err, result) => {
      if (err) {
        console.error('Error inserting user into database: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Route for user login
app.post('/login', (req, res) => {
    const { mobile_number, password } = req.body;
    // Check if the user exists in the database
    const sql = 'SELECT * FROM users WHERE mobile_number = ?';
    connection.query(sql, [mobile_number], (error, results) => {
        if (error) {
            console.error('Error fetching user from database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // User found, now verify the password
                const user = results[0];
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        if (result) {
                            // Passwords match, login successful
                            res.status(200).json({ message: 'Login successful', user });
                        } else {
                            // Passwords don't match
                            res.status(401).json({ error: 'Invalid mobile number or password' });
                        }
                    }
                });
            } else {
                // User not found in the database
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

  
// Route for fetching all food items
app.get('/fooditems', (req, res) => {
    const sql = 'SELECT * FROM fooditems'; // Query to select all food items from the database
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results); // Send the fetched food items as a JSON response
      }
    });
  });
  
  
// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
