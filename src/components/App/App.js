import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profile from '../User/Profile/Profile';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../User/Register/Register';
import Login from '../User/Login/Login';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Main isLoggedIn={false}/>}/>
      <Route path = '/movies' element = {<Movies isLoggedIn={true}/>}/>
      <Route path = '/saved-movies' element = {<SavedMovies isLoggedIn={true}/>}/>
      <Route path = '/profile' element = {<Profile/>}/>
      <Route path = '/signup' element = {<Register/>}/>
      <Route path = '/signin' element = {<Login/>}/>
      <Route path = '*' element = {<NotFound/>}/>
    </Routes>
  );
}

export default App;
