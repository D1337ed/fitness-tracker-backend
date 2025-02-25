import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './utils/passport';

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
 * Login Route
 */
app.get('/', (req, res) => {
    res.send('<a href="auth/google">Login with Google</a>');
})

/**
 * Callback Route
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

app.get(
    '/auth/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.send('<h1>Successfully Authenticated</h1>');
    }
);

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

