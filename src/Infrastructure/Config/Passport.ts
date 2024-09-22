import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import axios from "axios";
import ConflictException from "../../Application/Exceptions/ConflictException.js";

const JWT_SECRET = 'your_very_secure_and_long_random_string';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        if (process.env.USERMS) {
            const response = await axios.get(`${process.env.USERMS}/users/${jwtPayload.id}`);
            if (response) {
                return done(null, response.data);
            }
            return done(null, false, { message: 'No esta autorizado' });
        }
        else
        {
            throw new ConflictException('No se especifico ninguna url para el ms de usuarios')
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;