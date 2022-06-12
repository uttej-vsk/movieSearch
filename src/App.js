import { useEffect, useState } from 'react';
import React from 'react';
import MovieCard from './MovieCard';
import '../src/App.css';
import SearchIcon from '../src/search.svg';

//4401664d

const API_URL = 'http://www.omdbapi.com?apikey=4401664d';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies(searchTerm);
	});

	return (
		<div className='app'>
			<h1>MovieLand</h1>
			<div className='search'>
				<input
					placeholder='Search for movies'
					type='text'
					name=''
					id=''
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<img
					src={SearchIcon}
					alt='search'
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className='container'>
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))}
				</div>
			) : (
				<div className='empty'>
					<h2>No Movies found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
