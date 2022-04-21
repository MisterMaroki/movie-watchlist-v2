import { useState } from 'react';
import './App.css';
import Header from './Header';
import ResultsPanel from './ResultsPanel';

function App() {
	const [searchInput, setSearchInput] = useState('');

	const [searchResults, setSearchResults] = useState([]);

	function handleSearch(event) {
		event.preventDefault();
		setSearchInput(event.target.value);
		fetchInitialSearchResults();
	}

	const fetchInitialSearchResults = async () => {
		const res = await fetch(
			`https://www.omdbapi.com/?apikey=3f3c26a6&s=${searchInput}&type=movie&page=1`
		);
		const data = await res.json();
		setSearchResults(data.Search);
	};

	return (
		<div className="App">
			<Header handleSearch={handleSearch} />
			<ResultsPanel results={searchResults} />
		</div>
	);
}

export default App;
