import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../../utils/auth';
import { moviesApi } from '../../utils/moviesApi';
import { MainApi } from '../../utils/mainApi.js';

// import { BEATFILM_MOVIES_URL } from '../../utils/constants';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  let location = useLocation();
  const navigate = useNavigate();

  const headerPaths = ['/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  const [serverResponceError, setServerResponceError] = useState({});
  const [ifLoadMoviesError, setIsLoadMoviesError] = useState(false);

  const mainApi = new MainApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${ localStorage.getItem('jwt') }`,
    },
  });

  const handleRegisterUser = (regData) => { // Регистрация пользователя
    auth.registerData(regData.name, regData.email, regData.password)
      .then(data => {
        if(data) {
          navigate('/signin');
        }
      })
      .catch(err => {
        console.log(err);
        setServerResponceError(err);
      })
  };

  const handleLogin = (loginData) => {  // Авторизация
    auth.login(loginData.email, loginData.password)
      .then(data => {
        if(data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
        }
      })
      .catch(err => {
        console.log(err);
        setServerResponceError(err);
      })
  };

  const handleCheckToken = () => {
    const jwt = localStorage.getItem('jwt');

    if(jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if(res) {
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  const handleSignOut = () => {  // Выход из аккаунта
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  };

  const handleSaveMovies = (movie, isLiked, id) => {  // Сохранить фильм
    if(isLiked) {
      handleDeleteMovies(id);
    } else {
      mainApi.likeSavedMovies(movie)
        .then(newMovie => {
          setSavedMovies([...savedMovies, newMovie]);
        })
        .catch(err => {
          console.log(err);
          setServerResponceError(err);
        })
    }
  };

  const handleUpdateUserData = (data) => {  // Меняем информацию о пользователе
    mainApi.updateUserData(data)
      .then(newData => {
        console.log(newData);
        setCurrentUser(newData);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleDeleteMovies = (id) => {  // Удалить фильм из сохраненных
    const findedSavedMovies = JSON.parse(localStorage.getItem('findedSavedMovies'));

    mainApi.deleteMovie(id)
      .then(() => {
        const addedSavedMovies = savedMovies.filter((movie) => id !== movie._id);

        setSavedMovies(addedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(addedSavedMovies));

        if(findedSavedMovies) {
          const updateFindedSavedMovies = findedSavedMovies.filter((movie) => movie._id !== id);

          localStorage.setItem('findedSavedMovies', JSON.stringify(updateFindedSavedMovies));
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {  // Загружаем инфо пользователя и сохраненные фильмы
    loggedIn && Promise.all([
      mainApi.getUserData(),
      mainApi.getSavedMovies(),
    ])
    .then(([user, savedMovies]) => {
      setCurrentUser(user);
      setSavedMovies(savedMovies);
      setIsLoadMoviesError(false);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setIsMoviesError(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoadMoviesError(true);
      setIsMoviesError(true);
    });
  }, [loggedIn]);

  useEffect(() => {
    handleCheckToken();
  }, [loggedIn]);

  useEffect(() => {
    loggedIn && localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [loggedIn, savedMovies]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="App">
        { headerPaths.includes(location.pathname) ? <Header /> : '' }
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={
            <Register loggedIn={ loggedIn } onRegister={ handleLogin } responceError={ serverResponceError } />
            } 
          />
          <Route path='/signin' element={
            <Login loggedIn={ loggedIn } onLogin={ handleRegisterUser } responceError={ serverResponceError } />
            } 
          />
          <Route path='/profile' element={
            <ProtectedRouteElement 
              element={ Profile } 
              loggedIn={ loggedIn } 
              onUpdate={ handleUpdateUserData } 
              onExit={ handleSignOut } 
              isCompleted={ isCompleted }
              />
            } 
          />
          <Route path='/movies' element={
            <ProtectedRouteElement 
            element={ Movies } 
            loggedIn={ loggedIn }
            savedMovies={ savedMovies }
            movieError={ setIsMoviesError }
            onLike={ handleSaveMovies }
            onDelete={ handleDeleteMovies }
            />
            } 
          />
          <Route path='/saved-movies' element={
            <ProtectedRouteElement 
            element={ SavedMovies }
            currentUser={ currentUser }
            loggedIn={ loggedIn }
            movies={ savedMovies }
            savedMovies={ savedMovies }
            onDelete={ handleDeleteMovies } 
            />
            } 
          />
          <Route path='*' element={<NotFound />}/>
        </Routes>
        { footerPaths.includes(location.pathname) ? <Footer /> : '' }      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
