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
	console.log(searchResults);
	const showResults = searchResults?.map(
		({ Poster, Title, Type, Year, imdbID }) =>
			//filter bad results
			Poster !== 'N/A' && (
				<div className="movie-card" key={imdbID} id={imdbID} name={Title}>
					<img src={Poster} alt={Title} />
					<div className="card-info">
						<h3>{Title}</h3>
					</div>
				</div>
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
