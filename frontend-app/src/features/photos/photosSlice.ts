import {Photo} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchPhotos} from './photosThunk';

export interface PhotosState {
  photos: Photo[];
  photosFetching: boolean;
}

const initialState: PhotosState = {
  photos: [],
  photosFetching: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.photosFetching = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, {payload: photos}) => {
        state.photosFetching = false;
        state.photos = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.photosFetching = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.photosFetching,
  }
});

export const photosReducer = photosSlice.reducer;

export const {
  selectPhotos,
  selectPhotosFetching,
} = photosSlice.selectors
