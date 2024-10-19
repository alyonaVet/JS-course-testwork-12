import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchPhotos = createAsyncThunk<Photo[]>(
  'photos/fetchPhotos',
  async () => {
    const {data: photos} = await axiosApi.get<Photo[]>('/photos');
    return photos;
  }
);