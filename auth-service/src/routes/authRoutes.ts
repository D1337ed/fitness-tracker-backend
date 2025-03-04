import {Router} from 'express';
import passport from 'passport';
import {generateJWT} from '../utils/generateJWT';

const router = Router();

/**
 * Login Route
 */
router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
})

/**
 * Callback Route
 */
router.get(
    '/google',
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

router.get(
    '/google/callback',
    passport.authenticate('google', {
        accessType: 'offline',
        scope: ['profile', 'email'],
        // TODO: create proper error route
        failureRedirect: '/auth/error'
    }),
    (req, res) => {
        if (!req.user) {
            res.status(400).json({error: "Authentication Failed"});
        }
        res.status(200).json(req.user);
        res.send('<h1>Successfully Authenticated</h1>');
    }
);

export default router;