import React, {useState} from 'react';
import {PhotoFields, User} from '../../../types';
import {Box, Stack, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

interface Props {
  user: User;
  onSubmit: (photo: PhotoFields) => void;
  isLoading: boolean;
}

const AddPhotoForm: React.FC<Props> = ({user, onSubmit, isLoading}) => {
  const [photoData, setPhotoData] = useState<PhotoFields>({
    user: user._id,
    title: '',
    image: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPhotoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setPhotoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!photoData.title || !photoData.image) {
      setErrorMessage('All fields should be filled.');
      return;
    }
    onSubmit({...photoData});
    setPhotoData({
      user: user._id,
      title: '',
      image: '',
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      direction="column"
      alignItems="start"
      gap={2}
      mt={3}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter cocktail title"
          id="title"
          name="title"
          value={photoData.title}
          onChange={inputChangeHandler}
          error={!!errorMessage && !photoData.title}
          helperText={!!errorMessage && !photoData.title ? 'Title is required' : ''}
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Image:</Typography>
        </Box>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
          error={!!errorMessage && !photoData.image}
          helperText={!!errorMessage && !photoData.image ? 'Image is required' : ''}
        />
      </Stack>

      <Stack direction="row" alignItems="center" mt={5}>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>create photo</span>
        </LoadingButton>
      </Stack>

    </Stack>
  );
};

export default AddPhotoForm;