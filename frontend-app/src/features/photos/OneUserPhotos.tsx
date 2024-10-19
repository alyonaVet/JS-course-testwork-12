import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectIsDeleting, selectIsFetching, selectOneUserPhotos} from './photosSlice';
import PhotoCard from './components/PhotoCard';
import {useEffect} from 'react';
import {deletePhoto, fetchOneUserPhotos} from './photosThunk';
import {selectUser} from '../users/usersSlice';

const OneUserPhotos = () => {
  const dispatch = useAppDispatch();
  const oneUserPhotos = useAppSelector(selectOneUserPhotos);
  const user = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectIsFetching);
  const photoDeleting = useAppSelector(selectIsDeleting);

  useEffect(() => {
    dispatch(fetchOneUserPhotos());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
    await dispatch(fetchOneUserPhotos());
  };

  return (
    <Box sx={{m: 4}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        My Photos
      </Typography>

      {isFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {oneUserPhotos.map((photo) => (
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

export default OneUserPhotos;