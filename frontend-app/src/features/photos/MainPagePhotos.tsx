import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectIsDeleting, selectPhotos, selectPhotosFetching} from './photosSlice';
import PhotoCard from './components/PhotoCard';
import {useEffect} from 'react';
import {deletePhoto, fetchPhotos} from './photosThunk';
import {selectUser} from '../users/usersSlice';

const MainPagePhotos = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const photos = useAppSelector(selectPhotos);
  const photosFetching = useAppSelector(selectPhotosFetching);
  const photoDeleting = useAppSelector(selectIsDeleting);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
  };

  return (
    <Box sx={{m: 4}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Users Photos
      </Typography>
      {photosFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction={'row'} alignItems={'end'} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              id={photo._id}
              authorId={photo.user._id}
              username={photo.user.displayName}
              title={photo.title}
              image={photo.image}
              user={user}
              onDelete={() => handleDelete(photo._id)}
              isDeleting={photoDeleting}
            />
          ))}
        </Stack>
      )}
    </Box>

  );
};

export default MainPagePhotos;