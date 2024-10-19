import express from 'express';
import mongoose from 'mongoose';
import Photo from '../models/Photo';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import {PhotoFields} from '../types';

const photosRouter = express.Router();

photosRouter.get('/',  async(req, res, next) => {
  try {
    const photos = await Photo.find();
    return res.send(photos);
  } catch (error) {
    return next(error);
  }
});

photosRouter.post('', auth, imagesUpload.single('image'),  async(req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({error: 'User not found'});
      }

      if (!req.body.title || !req.file) {
        return res.status(400).send({ error: 'All fields are required' });
      }

      const photoData: PhotoFields = {
        user: req.user._id.toString(),
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      }

      const photo = new Photo(photoData);
      await photo.save();
      return res.send(photo);

    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
});

export default photosRouter;
