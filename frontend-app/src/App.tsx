import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';

const App = () => {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default App;
