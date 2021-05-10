import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import ResultCard from './components/ResultCard';
import { SearchContainer, Subtitle, Results } from './styles'


const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [movieData, setMovieData] = useState([]);

	const getMovieRequest = async (searchValue) => {

    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=15d60055`;
    const dataUrl = `https://www.omdbapi.com/?t=${searchValue}&apikey=15d60055`

		const response = await fetch(url);
		const responseJson = await response.json();

		const responseData = await fetch(dataUrl)
    const responseDataJson = await responseData.json()

		if (responseJson.Search) {
			setMovies(responseJson.Search);
			setMovieData(responseDataJson)
		}
		console.log(responseDataJson)
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		if (favourites.length < 5) {
			const newFavouriteList = [...favourites, movie];
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
		}
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app flex-container'>
			<div className='page'>
				<div className='search'>
					<div className='row d-flex align-items-center mt-4'>
						<MovieListHeading heading='The Shoppies' />
						<Subtitle>Search below to nominate your top 5 favourite <br /> movies + shows! </Subtitle>
					</div>
					<SearchContainer>
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</SearchContainer>
					<Results>
						{movies.map((movie) => (
							<ResultCard
								movie={movie}
								watchList={favourites}
								handleFavouritesClick={addFavouriteMovie}
								favouriteComponent={AddFavourites}
							/>
						))}
					</Results>
			</div>
			<div class="split right">
				<div className = 'favourites'>
					<div>
						<MovieListHeading heading='Nominations' color="#fff"/>
					</div>
					<div className='movieList'>
						<MovieList
							movies={favourites}
							handleFavouritesClick={removeFavouriteMovie}
							favouriteComponent={RemoveFavourites}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
};

export default App;
