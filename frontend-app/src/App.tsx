import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import MainPagePhotos from './features/photos/MainPagePhotos';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import AddPhoto from './features/photos/AddPhoto';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Routes>
        <Route path="/" element={<MainPagePhotos/>}/>
        <Route path="/photos/add-photo" element={
          <ProtectedRoute isAllowed={!!user}>
            <AddPhoto/>
          </ProtectedRoute>
        }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default App;
