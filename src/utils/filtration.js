import { SHORT_TIMING } from "./constants";

function filterShorts(movies) {
  return movies.filter(movie => movie.duration < SHORT_TIMING);
}

const filterMovies = (movies, userRequest, shortsCheckbox) => {
    const moviesByRequest = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userMovie = userRequest.toLowerCase().trim();
        return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });

    if (shortsCheckbox) {
        return filterShorts(moviesByRequest);
    } else {
        return moviesByRequest;
    }
}

export {
  filterShorts,
  filterMovies
}