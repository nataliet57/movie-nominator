import React from 'react';
import styled from "styled-components";
import AddFavourite from './AddFavourite';

const Year = styled.p`
  color: #004c3f;
  display: inline-block;
  height: 50%;
  margin: 0px 3px 4px 5px;
  font-size: 12px;
  padding-left: 60px;
`;

const Card = styled.div`
  display: flex;
`

const Title = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-size: 24px;
  justify-content: centre;
`

const AddButton = styled.button`
  height: 25px;
  color: #fff;
  background-color: #004c3f;
  border: none;
  border-radius: 25px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
const ResultCard = ({ movie, handleFavouritesClick, watchList, props }) => {

  let storedMovie = watchList.find(o => o.imdbID === movie.imdbID)
  const watchListDisabled = storedMovie ? true : false;

	return (
		<>
      <div>
        <Card>
          <AddButton
            onClick={() => handleFavouritesClick(movie)}
            disabled={watchListDisabled}
          >
            <AddFavourite />
          </AddButton>
          <Title>
          {movie.Title}
          </Title>
        </Card>
        <Year>{movie.Year}</Year>
        <p>{movie.Rated}</p>
      </div>
		</>
	);
};

export default ResultCard;
