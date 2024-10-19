import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../types';
import React, {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/usersThunk';
import {apiURL} from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const avatar = user.avatar?.includes('https') ? user.avatar : `${apiURL}/${user.avatar || ''}`;

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={avatar}
        sx={{backgroundColor: '#fff', color: '#8e44ad', mr: 1}}
      >
        {!user.avatar && <PersonIcon/>}
      </Avatar>
      <Button onClick={handleClick} color="inherit" sx={{textTransform: 'none'}}>
        {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} keepMounted onClose={handleClose}>
        <MenuItem component={Link} to="/photos/add-photo">Add photo</MenuItem>
        <MenuItem component={Link} to="/photos/my-photos">My photos</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;