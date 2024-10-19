import {Photo} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addPhoto, fetchPhotos} from './photosThunk';

export interface PhotosState {
  photos: Photo[];
  photosFetching: boolean;
  photoCreating: boolean;
}

const initialState: PhotosState = {
  photos: [],
  photosFetching: false,
  photoCreating: false,
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
    builder
      .addCase(addPhoto.pending, (state) => {
        state.photoCreating = true;
      })
      .addCase(addPhoto.fulfilled, (state) => {
        state.photoCreating = false;
      })
      .addCase(addPhoto.rejected, (state) => {
        state.photoCreating = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.photosFetching,
    selectPhotoCreating: (state) => state.photoCreating,
  }
});

export const photosReducer = photosSlice.reducer;

export const {
  selectPhotos,
  selectPhotosFetching,
  selectPhotoCreating
} = photosSlice.selectors
