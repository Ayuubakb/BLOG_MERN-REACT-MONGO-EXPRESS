import Nav from './components/Nav';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import Board from './pages/Board';
import Artcle from './pages/Artcle';
import UserP from './pages/UserP';
import Create from './pages/Create';
import Authors from './pages/Authors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='signup' element={<SignUpPage />}></Route>
          <Route path='/' element={<Home/>}>
              <Route index element={<Board/>}></Route>
              <Route path='article/:id' element={<Artcle/>}></Route>
              <Route path='user' element={<UserP/>}></Route>
              <Route path='create' element={<Create/>}></Route>
              <Route path='authors' element={<Authors/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
