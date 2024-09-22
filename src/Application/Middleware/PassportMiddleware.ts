import passport from '../../Infrastructure/Config/Passport.js';

export const authenticateJwt = passport.authenticate('jwt', { session: false });