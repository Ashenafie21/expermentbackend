const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Database connection
const db = mysql.createConnection({
    user: 'u498923693_experment',
    database: 'u498923693_expdatabase',
    host: '154.56.47.154',
    // port: '8889',
    password: 'Experment@2024'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Database');
});

// Define routes for registration, login, etc.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Login
app.post('/login', (req, res) => {
    try {
        const { phone,email, password } = req.body;
        console.log(phone,email, password);
       db.query('INSERT INTO users ( phone,email, password) VALUES (?, ?, ?)', [ phone, email, password], (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        res.status(500).send('Error registering/logging in');
                    } else {
                        res.status(200).send('Registration and login successful');
                    }
        });
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).send('Internal server error');
    }
});
