import { useEffect, useState } from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ savedMovies, onDelete }) => {

  const reqMovies = localStorage.getItem('requestedSavedMovies');
  const request = localStorage.getItem('requestedResponceSavedMovies');
  const [sortedMovies, setSortedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState({});

  const handleClearInput = () => {
    localStorage.removeItem('requestedSavedMovies');
    localStorage.removeItem('requestedResponceSavedMovies');
    setSearchRequest({});
    setSortedMovies(savedMovies);
  };

  const handleSortedMovies = (req) => {
    localStorage.setItem('requestedResponceSavedMovies', JSON.stringify(req));
    let sorted = [];

  if(req.isShort) {
    sorted = savedMovies.filter(el => {
      return (
        el.duration <= 40 &&
        el.nameRU.toLowerCase().trim().includes(req.searchText.toLowerCase())
      );
    });
    localStorage.setItem('requestedSavedMovies', JSON.stringify(sorted));
    setSortedMovies(sorted);
  } else if(!req.isShort) {
    sorted = savedMovies.filter(el => {
      return el.nameRU.toLowerCase().trim().includes(req.searchText.toLowerCase());
    });
    localStorage.setItem('requestedSavedMovies', JSON.stringify(sorted));
    setSortedMovies(sorted);
  }
  };

  useEffect(() => {
    if(!request) {
    setSearchRequest({ ...request, searchText: '' });
    } else {
      setSearchRequest(JSON.parse(request));
    }
  }, [savedMovies, request]);

  useEffect(() => {
    if(!reqMovies) {
      setSortedMovies(savedMovies);
    } else {
      setSortedMovies(JSON.parse(reqMovies));
    }
  }, [savedMovies, reqMovies, searchRequest]);

  return (
    <main>
      <SearchForm onClear={ handleClearInput } onFilter={ handleSortedMovies } searchRequest={ searchRequest }/>
      { sortedMovies.length ? 
        (<MoviesCardList movies={ sortedMovies } onDelete={ onDelete }/>) : 
        (<p className='movies__not-found'>По вашему запросу ничего не найдено</p>) }
      <div className='hidden-box'></div>
    </main>
  );
};

export default SavedMovies;
