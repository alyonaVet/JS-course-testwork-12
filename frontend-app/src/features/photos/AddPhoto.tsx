import {Box, Typography} from '@mui/material';
import AddPhotoForm from './components/AddPhotoForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSlice';
import {useNavigate} from 'react-router-dom';
import {PhotoFields} from '../../types';
import {addPhoto, fetchPhotos} from './photosThunk';
import {selectPhotoCreating} from './photosSlice';

const AddPhoto = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const photoCreating = useAppSelector(selectPhotoCreating);

  if (!user) {
    return;
  }

  const submitHandler = async (photoData: PhotoFields) => {
    await dispatch(addPhoto(photoData));
    await dispatch(fetchPhotos());
    navigate('/');
  };
  return (
    <Box sx={{m: 3}}>
      <Typography variant="h4">Add new photo</Typography>
      <AddPhotoForm onSubmit={submitHandler} isLoading={photoCreating} user={user}/>
    </Box>
  );
};

export default AddPhoto;