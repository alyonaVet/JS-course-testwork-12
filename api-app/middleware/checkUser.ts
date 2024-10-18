import {NextFunction, Response} from 'express';
import User from '../models/User';
import {RequestWithUser} from './auth';


const checkUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    req.user = undefined;

    return next();
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    req.user = undefined;

    return next();
  }

  const user = await User.findOne({token});

  if (!user) {
    req.user = undefined;

    return next();
  }
  req.user = user;

  return next();
};

export default checkUser;