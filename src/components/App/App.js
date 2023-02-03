import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profile from '../User/Profile/Profile';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path = '/profile' element = {<Profile/>}/>
      <Route path = '/' element = {<Main/>}/>
      <Route path = '*' element = {<NotFound/>}/>
    </Routes>  
  );
}

export default App;
