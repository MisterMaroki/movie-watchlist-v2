import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Movie from './Components/Movie';

function App() {
	const [searchInput, setSearchInput] = useState('');

	const [searchResults, setSearchResults] = useState([]);

	function handleSearch(event) {
		event.preventDefault();
		console.log(event.target.value);

		setSearchInput(event?.target?.value);
		fetchInitialSearchResults();
	}

	const fetchInitialSearchResults = async () => {
		if (searchInput !== undefined) {
			const res = await fetch(
				`https://www.omdbapi.com/?apikey=3f3c26a6&s=${searchInput}&type=movie&page=1`
			);
			const data = await res.json();
			setSearchResults(data.Search);
		}
	};

	const showResults = searchResults?.map(
		({ Poster, Title, imdbID }) =>
			//filter bad results
			Poster !== 'N/A' && (
				<Movie key={imdbID} id={imdbID} poster={Poster} title={Title}></Movie>
			)
	);

	return (
		<div className="App">
			<Header handleSearch={handleSearch} />
			<div className="movies-div">
				{searchResults?.length >= 1 && showResults}
			</div>
		</div>
	);
}

export default App;
