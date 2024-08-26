import passport from '../../Infrastructure/Config/Passport';

export const authenticateJwt = passport.authenticate('jwt', { session: false });