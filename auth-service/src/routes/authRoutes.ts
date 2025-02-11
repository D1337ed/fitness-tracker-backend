import {Router} from 'express';
import passport from 'passport';
//TODO: implementation
import {generateJWT} from '../utils/jwt';

const router = Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        const token = generateJWT(req.user);
        res.redirect(`/auth/success?token=${token}`);
    });

export default router;