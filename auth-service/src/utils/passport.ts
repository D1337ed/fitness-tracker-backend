import passport from 'passport';
import {Profile, Strategy as GoogleStrategy, VerifyCallback} from 'passport-google-oauth20';
import dotenv from 'dotenv';
import {findOrCreateUser} from "../models/User";

dotenv.config({
    path: './config/.env'
});

// TODO: maybe move to env validation as well
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('CLIENT_ID or CLIENT_SECRET not found');
}

passport.use(
    <passport.Strategy>new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            passReqToCallback: true
        },
        // TODO: Check for proper types
        async function (request,
                        accessToken: string,
                        refreshToken: string,
                        profile: Profile,
                        done: VerifyCallback) {
            try {
                const name = profile.displayName;
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error('Email not found'), profile);
                }

                /**
                 * Find the User in the Database or Create it if it doesn't exist
                 */
                try {
                    await findOrCreateUser(name, email);
                } catch (error) {
                    console.error(`Unexpected error ${error} occurred`);
                    return done(error, profile);
                }
                return done(null, profile);
            } catch (error) {
                console.error(`Unexpected ${error} in Google Strategy occurred`);
                return done(error, profile)
            }
        }
    )
);

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});