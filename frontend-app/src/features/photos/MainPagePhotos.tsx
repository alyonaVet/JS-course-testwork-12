import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectIsDeleting, selectPhotos, selectPhotosFetching} from './photosSlice';
import PhotoCard from './components/PhotoCard';
import {useEffect} from 'react';
import {deletePhoto, fetchPhotos} from './photosThunk';
import {selectGettingUser, selectUser} from '../users/usersSlice';
import {useParams} from 'react-router-dom';
import {getUser} from '../users/usersThunk';

const MainPagePhotos = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const photos = useAppSelector(selectPhotos);
  const photosFetching = useAppSelector(selectPhotosFetching);
  const photoDeleting = useAppSelector(selectIsDeleting);
  const authorUser = useAppSelector(selectGettingUser);

  const {authorId} = useParams();

  useEffect(() => {
    dispatch(fetchPhotos(authorId));
    dispatch(getUser(authorId));
  }, [dispatch, authorId]);

  const handleDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
  };

  return (
    <Box sx={{m: 4}}>
      {!authorId ? (
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          All User Photos
        </Typography>
      ) : (
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          {authorUser?.displayName}'s gallery
        </Typography>
      )}
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
              photoAuthorId={photo.user._id}
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