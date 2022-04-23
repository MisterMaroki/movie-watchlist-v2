import { useEffect, useState } from 'react';
import './css/App.css';
import Header from './Components/Header';
import Movie from './Components/Movie';
function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [currentWatchlist, setCurrentWatchlist] = useState([
		localStorage.getItem('watchlist'),
	]);
	const [showingWatchlist, setShowingWatchlist] = useState(false);
	console.log(currentWatchlist);
	const toggleWatchlist = () => setShowingWatchlist(!showingWatchlist);

	useEffect(() => {
		const updateStoredWatchlist = () => {
			currentWatchlist?.length >= 0 &&
				localStorage.setItem('watchlist', [currentWatchlist]);
		};
		updateStoredWatchlist();
	}, [currentWatchlist]);

	const addToWatchlist = (id) => {
		setCurrentWatchlist(currentWatchlist.concat([id]));
	};

	const removeFromWatchlist = async (id) => {
		setCurrentWatchlist((prevState) => {
			return prevState.filter((movie) => movie !== id);
		});
	};

	const isMovieInWatchlist = (id) => {
		return currentWatchlist?.includes(id);
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
	const showWatchlist = currentWatchlist?.map((item) => (
		<Movie
			key={item}
			id={item}
			addToWatchlist={addToWatchlist}
			removeFromWatchlist={removeFromWatchlist}
			isMovieInWatchlist={isMovieInWatchlist}
			currentWatchlist={currentWatchlist}
		/>
	));
	// const showWatchlist = localStorage.getItem('watchlist');
	// console.log(
	// 	'🚀 ~ file: App.js ~ line 77 ~ App ~ showWatchlist',
	// 	showWatchlist.split(',')
	// );
	return (
		<div className="App">
			<Header
				handleSearch={handleSearch}
				showingWatchlist={showingWatchlist}
				toggleWatchlist={toggleWatchlist}
			/>
			<div className="movies-div">
				{showingWatchlist
					? showWatchlist
					: searchResults?.length >= 1 && showResults}
			</div>
		</div>
	);
}

export default App;
