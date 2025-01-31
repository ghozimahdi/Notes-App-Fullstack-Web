import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import {appConfig} from './env';
import {container} from './injector';
import passport from "passport";
import {Handler} from "express";
import {GetUserByIdUseCase} from "../domain/usecase/get-user-by-id.use-case";
import {RedisDatasource} from "../data/datasource/redis.datasource";

const configureJwtStrategy = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.jwtSecret,
    // optional, remove req on the below strategy "async (req...."
    passReqToCallback: true,
  };

  return new JwtStrategy(opts, async (req, jwtPayload, done) => {
    try {
      const getUserByIdUseCase = container.get(GetUserByIdUseCase);
      const redisDataSource = container.get(RedisDatasource);

      // this is purpose for more secure so, this is force user one device one token
      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const data = await redisDataSource.getTokenData(jwtPayload.id);

      if (!data || data.accessToken !== accessToken) {
        return done(null, false);
      }

      const user = await getUserByIdUseCase.execute(jwtPayload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  });
};

export function passportStrategyInitialize(): Handler {
  return passport
    .use(configureJwtStrategy())
    .initialize();
}