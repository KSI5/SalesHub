const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: 'user_auth',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Route for handling login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error during login:', error);
            res.status(500).send('<h2 style="color: red;">Internal Server Error</h2>');
        } else {
            if (results.length > 0) {
                const user = results[0];
                const userImage = user.image || '';

                res.redirect(`/cash_register.html?username=${username}&userImage=${userImage}`);
            } else {
                const errorMessage = '<h3 style="color: red;">Oops! Invalid username and password. Try again with your correct credentials.</h3>' +
                '<a href="/index.html"><button style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; font-family: \'Poppins\', sans-serif;"><b>Back to Login</b></button></a>';

                res.status(401).send(errorMessage);
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
