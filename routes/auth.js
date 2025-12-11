// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 

// Load base path from .env so redirects work on the Goldsmiths server
const BASE_PATH = process.env.HEALTH_BASE_PATH || '/';

// =========================================================
// 1. LOGIN ROUTES
// =========================================================

// GET /login - Renders the login form
router.get('/login', (req, res) => {
    res.render('login', { 
        pageTitle: 'User Login',
        error: null 
    });
});

// POST /login - Handles form submission and authentication
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const pool = req.app.locals.pool;

    try {
        // 1. Check if user exists
        const [rows] = await pool.query('SELECT * FROM User WHERE username = ?', [username]);
        const user = rows[0];

        if (user) {
            // 2. Compare hashed passwords
            const match = await bcrypt.compare(password, user.password_hash);

            if (match) {
                // Success: set session data
                req.session.isLoggedIn = true;
                req.session.userId = user.id;
                req.session.username = user.username;

                console.log(`✅ Login successful for user: ${username}`);
                return res.redirect(`${BASE_PATH}`); // Redirect to home
            }
        }

        // Failure: wrong username or password
        res.render('login', { 
            pageTitle: 'User Login',
            error: 'Invalid username or password.'
        });

    } catch (error) {
        console.error('❌ Login error:', {
            code: error.code,
            message: error.message,
            sqlMessage: error.sqlMessage
        });
        res.render('login', { 
            pageTitle: 'User Login',
            error: 'A database error occurred during login.' 
        });
    }
});


// =========================================================
// 2. REGISTRATION ROUTES
// =========================================================

// GET /register - Renders the registration form
router.get('/register', (req, res) => {
    res.render('register', { 
        pageTitle: 'User Registration',
        error: null 
    });
});

// POST /register - Handles new user creation
router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    const pool = req.app.locals.pool;

    // 1. Validate password match
    if (password !== confirm_password) {
        return res.render('register', { 
            pageTitle: 'User Registration', 
            error: 'Passwords do not match.' 
        });
    }

    try {
        // 2. Check if username or email already exists
        const [existingUser] = await pool.query(
            'SELECT id FROM User WHERE username = ? OR email = ?', 
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.render('register', { 
                pageTitle: 'User Registration', 
                error: 'Username or Email already in use.' 
            });
        }

        // 3. Hash password securely
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // 4. Insert new user into database
        await pool.query(
            'INSERT INTO User (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );

        console.log(`✅ New user registered: ${username}`);
        res.redirect(`${BASE_PATH}login?registered=true`);

    } catch (error) {
        console.error('❌ Registration error:', {
            code: error.code,
            message: error.message,
            sqlMessage: error.sqlMessage
        });
        res.render('register', { 
            pageTitle: 'User Registration',
            error: 'An unexpected error occurred during registration.' 
        });
    }
});


// =========================================================
// 3. LOGOUT ROUTE
// =========================================================

// GET /logout - Destroys session and redirects to login
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('❌ Logout error:', err);
        }
        res.redirect(`${BASE_PATH}login`);
    });
});

module.exports = router;
