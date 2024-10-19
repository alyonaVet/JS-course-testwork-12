import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, Photo, PhotoFields} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchPhotos = createAsyncThunk<Photo[]>(
  'photos/fetchPhotos',
  async () => {
    const {data: photos} = await axiosApi.get<Photo[]>('/photos');
    return photos;
  }
);

export const addPhoto = createAsyncThunk<void, PhotoFields, { rejectValue: GlobalError, state: RootState }>(
  'photos/addPhoto',
  async (photoData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('user', photoData.user);
      formData.append('title', photoData.title);

      if (photoData.image) {
        formData.append('image', photoData.image);
      }

      await axiosApi.post('/photos', formData);

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchOneUserPhotos = createAsyncThunk<Photo[]>(
  'photos/fetchOneUserPhotos',
  async () => {
    const {data: userPhotos} = await axiosApi.get<Photo[]>('photos/my-photos');
    return userPhotos;
  }
);