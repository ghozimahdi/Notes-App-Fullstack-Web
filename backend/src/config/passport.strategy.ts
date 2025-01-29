import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import {appConfig} from './env';
import {container} from './inversify.config';
import passport from "passport";
import {Handler} from "express";
import {GetUserByIdUseCase} from "../domain/usecase/get-user-by-id.use-case";

const configureJwtStrategy = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.jwtSecret,
  };

  return new JwtStrategy(opts, async (jwtPayload, done) => {
    const getUserByIdUseCase = container.get(GetUserByIdUseCase);

    try {
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