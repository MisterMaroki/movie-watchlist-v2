import { useState } from 'react';
import './App.css';
import Header from './Header';

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

	const showResults = searchResults?.map((result) => (
		<div className="movie-card">{JSON.stringify(result)}</div>
	));
	// const showResults = searchResults?.map((result) => {
	// 	console.log(result);
	// 	return searchResults.map((result) => (
	// 		<div className="movie-card">{JSON.stringify(result)}</div>
	// 	));
	// });
	return (
		<div className="App">
			<Header handleSearch={handleSearch} />
			<div className="movies-div">
				{searchResults?.length >= 1 && showResults}
			</div>
			;
		</div>
	);
}

export default App;
