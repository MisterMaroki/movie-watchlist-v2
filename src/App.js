import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Movie from './Components/Movie';
function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [currentWatchlist, setCurrentWatchlist] = useState([]);
	const [showingWatchlist, setShowingWatchlist] = useState(false);

	const toggleWatchlist = () => setShowingWatchlist(!showingWatchlist);

	useEffect(() => {
		const updateStoredWatchlist = () => {
			localStorage.setItem('watchlist', currentWatchlist);
		};
		updateStoredWatchlist();
	}, [currentWatchlist]);

	const addToWatchlist = (id) => {
		setCurrentWatchlist(currentWatchlist.concat(id));
	};

	const removeFromWatchlist = async (id) => {
		setCurrentWatchlist((prevState) => {
			return prevState.filter((movie) => movie !== id);
		});
	};

	const isMovieInWatchlist = (id) => {
		return currentWatchlist.includes(id);
	};

	function handleSearch(event) {
		event.preventDefault();
		fetchInitialSearchResults(event.target.value);
	}
	const fetchInitialSearchResults = async (search) => {
		if (search !== undefined) {
			const res = await fetch(
				`https://www.omdbapi.com/?apikey=3f3c26a6&s=${search}&type=movie&page=1`
			);
			const data = await res.json();
			setSearchResults(data.Search);
		}
	};

	const showResults = searchResults?.map(
		({ Poster, imdbID }) =>
			//filter bad results
			Poster !== 'N/A' && (
				<Movie
					key={imdbID}
					id={imdbID}
					addToWatchlist={addToWatchlist}
					removeFromWatchlist={removeFromWatchlist}
					isMovieInWatchlist={isMovieInWatchlist}
					currentWatchlist={currentWatchlist}
				/>
			)
	);

	return (
		<div className="App">
			<Header
				handleSearch={handleSearch}
				showingWatchlist={showingWatchlist}
				toggleWatchlist={toggleWatchlist}
			/>
			<div className="movies-div">
				{searchResults?.length >= 1 && showResults}
			</div>
		</div>
	);
}

export default App;
