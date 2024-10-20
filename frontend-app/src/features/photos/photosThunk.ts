import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, Photo, PhotoFields} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchPhotos = createAsyncThunk<Photo[], string | undefined>(
  'photos/fetchPhotos',
  async (authorId) => {
    const reqUrl = authorId ? `/photos?authorId=${authorId}` : '/photos'
    const {data: photos} = await axiosApi.get<Photo[]>(reqUrl);
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

export const deletePhoto = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'photos/deletePhoto',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`photos/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);