import React from 'react';
import { NominatedMovieInfo } from '../styles'

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	return (
		<>
			{props.movies.map((movie, movieData, index) => (
				<div className='d-flex'>
					<div className='image-container d-flex justify-content-start m-3'>
						<img src={movie.Poster} alt='movie' width="100px"></img>
						<div
							onClick={() => props.handleFavouritesClick(movie)}
							className='overlay d-flex align-items-center justify-content-center'
							>
							<FavouriteComponent />
						</div>
						<NominatedMovieInfo>{movie.Title} ({movie.Year})</NominatedMovieInfo>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
