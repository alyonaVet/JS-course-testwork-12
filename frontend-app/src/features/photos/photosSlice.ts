import {Photo} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addPhoto, deletePhoto, fetchOneUserPhotos, fetchPhotos} from './photosThunk';

export interface PhotosState {
  photos: Photo[];
  photosFetching: boolean;
  photoCreating: boolean;
  oneUserPhotos: Photo[],
  isFetching: boolean,
  photoIsDeleting: boolean;
}

const initialState: PhotosState = {
  photos: [],
  photosFetching: false,
  photoCreating: false,
  oneUserPhotos: [],
  isFetching: false,
  photoIsDeleting: false,
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
    builder
      .addCase(fetchOneUserPhotos.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchOneUserPhotos.fulfilled, (state, {payload: photos}) => {
        state.isFetching = false;
        state.oneUserPhotos = photos;
      })
      .addCase(fetchOneUserPhotos.rejected, (state) => {
        state.isFetching = false;
      });
    builder
      .addCase(deletePhoto.pending, (state, action) => {
        state.photoIsDeleting = true;
        state.photos = state.photos.filter(photo => photo._id !== action.meta.arg);
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.photoIsDeleting = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.photoIsDeleting = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.photosFetching,
    selectPhotoCreating: (state) => state.photoCreating,
    selectOneUserPhotos: (state) => state.oneUserPhotos,
    selectIsFetching: (state) => state.isFetching,
    selectIsDeleting: (state) => state.photoIsDeleting,
  }
});

export const photosReducer = photosSlice.reducer;

export const {
  selectPhotos,
  selectPhotosFetching,
  selectPhotoCreating,
  selectOneUserPhotos,
  selectIsFetching,
  selectIsDeleting
} = photosSlice.selectors;
