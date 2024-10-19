import express from 'express';
import mongoose from 'mongoose';
import Photo from '../models/Photo';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import {PhotoFields} from '../types';
import permit from '../middleware/permit';
import checkUser from '../middleware/checkUser';

const photosRouter = express.Router();

photosRouter.get('/',  async(req, res, next) => {
  try {
    const photos = await Photo.find().populate('user', 'displayName' );
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

photosRouter.get('/my-photos', checkUser, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }
    const userPhotos = await Photo.find({ user: req.user._id }).populate('user', 'displayName' );

    return res.send(userPhotos);
  } catch (error) {
    return next(error);
  }
});

photosRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Photo ID is not valid'});
    }
    const photo = await Photo.findById(req.params.id);

    if (photo === null) {
      return res.status(404).send({error: 'Photo not found'});
    }

    return res.send(photo);

  } catch (error) {
    return next(error);
  }
});

photosRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Photo ID is not valid' });
    }

    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).send({ error: 'Photo not found' });
    }

    if (req.user.role !== 'admin' && photo.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ error: 'You can not delete this photo' });
    }

    await Photo.findByIdAndDelete(req.params.id);

    return res.send({ message: 'Photo was deleted successfully.' });
  } catch (error) {
    return next(error);
  }
});


export default photosRouter;
