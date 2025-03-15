import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './utils/passport';

/**
 * Retrieve .env values
 */
dotenv.config({
    path: '.././.env'
});

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET!;

/**
 * Middleware to access json data
 */
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Route to redirect to Log in Route
 */
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
})

/**
 * Login Route
 */
app.get(
    '/auth/google',
    passport.authenticate('google', {
        accessType: 'offline',
        scope: ['profile', 'email']
    }),
    (req, res) => {
        if (!req.user) {
            res.status(400).json({error: "Authentication Failed"});
        }
        res.status(200).json(req.user);
    }
);

/**
 * Code Route
 */
app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        accessType: 'offline',
        scope: ['profile', 'email'],
        failureRedirect: '/auth/error'
    }),
    (req, res) => {
        // TODO: error handling
        if (!req.user) {
            res.status(400).json({error: "Authentication Failed"});
        }
        console.log(res.status(200), req.user, "Successfully Authenticated");
        res.redirect('/auth/success');
    }
);

/**
 * Error Route
 */
app.get(
    '/auth/error',
    (req, res) => {
        res.write('<h1>Authentication Failed</h1>');
        res.write('<a href="/auth/google">Try Again</a>');
        res.end();
    }
);

/**
 * Success Route
 */
app.get(
    '/auth/success',
    (req, res) => {
        res.write('<h1>Successfully Authenticated</h1>');
        res.end();
    }
)

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Auth Service Running on Port ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to Start Auth Service with Error: ", error);
    }
}

start().then(res => {}).catch(error => {});
