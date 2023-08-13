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
import Preloader from '../Preloader/Preloader';

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
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const [apiErrors, setApiErrors] = useState({
    login: {},
    register: {},
    profile: {},
    movies: {}
  });

  const mainApi = new MainApi({
    url: 'https://raibdev.nomoredomains.rocks',
    headers: {
      "Content-Type": 'application/json',
      "authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  const handleRegisterUser = (regData) => { // Регистрация пользователя
    auth.registrateUser(regData.name, regData.email, regData.password)
      .then(data => {
        console.log(data);
        handleLogin(regData);
      })
      .catch(err => {
        console.log(err);
        setIsCompleted(false);
        setApiErrors({ ...apiErrors, register: err });
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
        setApiErrors({...apiErrors, login: err});
        setIsCompleted(false);
      })
  };

  const handleSignOut = () => {  // Выход из аккаунта
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  };

  const handleSaveMovies = (movie, isLiked, id) => {  // Сохранить фильм
    if(!isLiked) {
      mainApi.likeSavedMovies(movie)
      .then(newMovie => {
        console.log(newMovie);
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      handleDeleteMovies(id);
    }
  };

  const handleUpdateUserData = (data) => {  // Меняем информацию о пользователе
    mainApi.updateUserData(data)
      .then(newData => {
        console.log(newData);
        setCurrentUser({
          ...currentUser,
          name: data.name,
          email: data.email,
        });
        setIsCompleted(true);
      })
      .catch(err => {
        console.log(err);
        setIsCompleted(false);
        setApiErrors({ ...apiErrors, profile: err });
      })
  };

  const handleDeleteMovies = (id) => {  // Удалить фильм из сохраненных
    const findedSavedMovies = JSON.parse(localStorage.getItem('findedSavedMovies'));

    mainApi.deleteMovie(id)
      .then((responce) => {
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
  };

  // const handleGetMovies = () => {
  //   setIsLoadingMovies(true);

  //   moviesApi.getAllMovies().then((dataMovies) => {
  //       console.log(dataMovies)
  //       // setMovies(dataMovies);
  //       setIsLoadingMovies(false);
  //       localStorage.setItem('movies', JSON.stringify(dataMovies));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   if (localStorage.getItem('movies')) {
  //     setMovies(JSON.parse(localStorage.getItem('movies')));
  //   }
  // }, []);

  useEffect(() => {  // Очистка ошибок при переходе на другой роут
    setApiErrors({
      login: {},
      register: {},
      profile: {}
    });
  }, [location]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if(!jwt) {
      setIsLoading(false); // Чтобы загрузка не крутилась бесконечно, если нет токена
    } else {
      auth.checkToken(jwt).then(responce => {
        if(responce) {
          setLoggedIn(true);
          setIsLoading(false);
          navigate(location.pathname);
        }
      })
      .catch(err => { // При не совпадении токена с локалсторейлдж - удаляем
        console.log(err);
        if(err.status === 401) {
          localStorage.removeItem('jwt');
          setIsLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {  // Загружаем инфо пользователя и сохраненные фильмы

    loggedIn && Promise.all([
      mainApi.getUserData(),
      mainApi.getSavedMovies(),
    ])
    .then(([user, savedMovies]) => {
      console.log('user --->', user);
      console.log('savedMovies --->', savedMovies);
      setCurrentUser(user);
      setSavedMovies(savedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    })
    .catch(err => {
      console.log('Произошла ошибка: ', err);
      setIsLoadMoviesError(true);
      setIsMoviesError(true);
    });
  }, [loggedIn]);

  useEffect(() => { // Сохраняем новую версию в случае изменения
    loggedIn && localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [loggedIn, savedMovies]);

  useEffect(() => {
    // if (loggedIn) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        moviesApi
          .getAllMovies()
          .then((moviesData) => {
            localStorage.setItem('movies', JSON.stringify(moviesData));
            setMovies(moviesData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    // }
  }, [loggedIn]);

  return (
    <div className="App">
      { isLoading ? <Preloader /> : (
        <CurrentUserContext.Provider value={{ currentUser }}>
          { headerPaths.includes(location.pathname) ? <Header /> : '' }
          <Routes>
            <Route path='/' element={<Main loggedIn={ loggedIn } />} />
            <Route path='/signup' element={
              <Register 
                loggedIn={ loggedIn } 
                onRegister={ handleRegisterUser } 
                apiErrors={ apiErrors }
              />
              } 
            />
            <Route path='/signin' element={
              <Login 
                loggedIn={ loggedIn } 
                onLogin={ handleLogin } 
                apiErrors={ apiErrors }
              />
              } 
            />
            <Route path='/profile' element={
              <ProtectedRouteElement 
                element={ Profile } 
                loggedIn={ loggedIn } 
                onUpdate={ handleUpdateUserData } 
                onExit={ handleSignOut } 
                isCompleted={ isCompleted }
                apiErrors={ apiErrors }
                />
              } 
            />
            <Route path='/movies' element={
              <ProtectedRouteElement 
              element={ Movies } 
              loggedIn={ loggedIn }
              savedMovies={ savedMovies }
              onLike={ handleSaveMovies }
              apiErrors={ apiErrors }
              movies={ movies }
              // onRequest={ handleGetMovies }
              />
              } 
            />
            <Route path='/saved-movies' element={
              <ProtectedRouteElement 
              element={ SavedMovies }
              loggedIn={ loggedIn }
              savedMovies={ savedMovies }
              onDelete={ handleDeleteMovies } 
              />
              } 
            />
            <Route path='*' element={<NotFound />}/>
          </Routes>
          { footerPaths.includes(location.pathname) ? <Footer /> : '' }  
        </CurrentUserContext.Provider>  
      )}  
    </div>
  );
}

export default App;
