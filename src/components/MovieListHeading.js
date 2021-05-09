import React from 'react';
import styled from "styled-components";

export const SiteTitle = styled.div`
	padding: 20px 50px;
	font-size: 48px;
	color: ${props => props.color ? props.color : "black"};
`
const MovieListHeading = (props) => {
	return (
			<SiteTitle color={props.color}>{props.heading}</SiteTitle>
	);
};

export default MovieListHeading;
