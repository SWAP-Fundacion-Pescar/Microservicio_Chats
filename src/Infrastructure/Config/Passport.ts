import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import axios from "axios";

const JWT_SECRET = 'your_very_secure_and_long_random_string';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try
    {
        const response = await axios.get(`http://localhost:3000/api/users/${jwtPayload.id}`);
        if (response) {
            return done(null, response.data);
        }
        return done(null, false, { message: 'No esta autorizado'});
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;