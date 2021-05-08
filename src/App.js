
import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFavourite from './components/AddFavourite';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import RemoveFavourites from './components/RemoveFavourites';
import SearchBox from './components/SearchBox';
import ResultCard from './components/ResultCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=15d60055`;
    const dataUrl = `http://www.omdbapi.com/?t=${searchValue}&apikey=15d60055`
    const responseData = await fetch(dataUrl)
		const response = await fetch(url);

    const responseDataJson = await responseData.json()
		const responseJson = await response.json();

    console.log(responseDataJson);
    console.log(responseJson);

    if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
  };

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('movie-app')
    );
    setFavourites(movieFavourites)
  }, []);

  const saveToLocalStorage = (items) => {
    // Saving past nominations as a JSON string
    localStorage.setItem('movie-app', JSON.stringify(items))
  };

  const addNominatedMovie = (movie) => {
    if (favourites.length < 5){
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList)
      setIsSubmitting(true)
    }
  };

  const removeNominatedMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  };

  return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='The Shoppies!' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
			<div>
        {movies.map((movie) => (
          <ResultCard
            movie={movie}
            watchList={favourites}
            handleFavouritesClick={addNominatedMovie}
            favouriteComponent={AddFavourite}
          />
        ))}
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Nominations' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeNominatedMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
