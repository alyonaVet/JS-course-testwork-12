import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import {imagesUpload} from '../multer';

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    return res.send(user);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({error: 'Email and password are required!'});
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'Email or password is wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Email or password is wrong!'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);

  } catch (error) {
    return next(error);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'User ID is not valid'});
    }

    const user = await User.findById(req.params.id);

    if (user === null) {
      return res.status(404).send({error: 'User not found'});
    }

    return res.send(user);

  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Goggle login error!'});
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;

    if (!email || !displayName) {
      return res.status(400).send({error: 'Not enough user data to continue!'});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      const newPassword = crypto.randomUUID();
      user = new User({
        email: email,
        password: newPassword,
        googleID: id,
        displayName: displayName,
        avatar: avatar,
      });
    }

    user.generateToken();
    await user.save();
    return res.send(user);

  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({token});

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();

  } catch (error) {
    return next(error);
  }
});

export default usersRouter;