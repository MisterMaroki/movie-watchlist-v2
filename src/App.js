import { useEffect, useState } from 'react';
import './css/App.css';
import Header from './Components/Header';
import Movie from './Components/Movie';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';

function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [currentWatchlist, setCurrentWatchlist] = useState(
		localStorage.getItem('watchlist')?.split(',') || ''
	);
	const [showingWatchlist, setShowingWatchlist] = useState(false);
	const toggleWatchlist = () => setShowingWatchlist(!showingWatchlist);

	try {
		useEffect(() => {
			localStorage.getItem('watchlist')?.split(',').length <= 0 &&
				localStorage.clear();
			const updateStoredWatchlist = () => {
				// const hi = currentWatchlist?.toString().replace('undefined', '');
				localStorage.setItem('watchlist', currentWatchlist);
			};
			updateStoredWatchlist();
		}, [currentWatchlist]);

		const editWatchlist = (id) => {
			currentWatchlist?.includes(id)
				? setCurrentWatchlist((prevState) => {
						return prevState.filter((movie) => movie !== id);
				  })
				: setCurrentWatchlist(currentWatchlist?.concat(id));
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
						editWatchlist={editWatchlist}
						currentWatchlist={currentWatchlist}
					/>
				)
		);
		const showWatchlist =
			currentWatchlist.type !== 'String' &&
			localStorage.getItem('watchlist') &&
			currentWatchlist?.map((item) => {
				//avoid having the first item in localstorage being undefined. this reloads the page to make sure the watchlist is updated to be either empty or not empty
				item.toString() === 'undefined' && window.location.reload(false);

				const hi = currentWatchlist?.toString().replace('undefined', '');
				localStorage.setItem('watchlist', hi);
				return (
					item && (
						<Movie
							key={item}
							id={item}
							editWatchlist={editWatchlist}
							currentWatchlist={currentWatchlist}
						/>
					)
				);
			});

		const showSearchPrompt = (
			<div style={{ paddingTop: '30vh' }}>
				<SearchIcon />
				Start Exploring
			</div>
		);
		const showEmptyWatchlistPrompt = (
			<div style={{ paddingTop: '30vh' }}>
				<LiveTvIcon style={{ display: 'block' }} />
				Find some movies and save them here
				<button style={{ display: 'block' }} onClick={toggleWatchlist}>
					Search
				</button>
			</div>
		);

		return (
			<div className="App">
				<Header
					handleSearch={handleSearch}
					showingWatchlist={showingWatchlist}
					toggleWatchlist={toggleWatchlist}
					currentWatchlist={currentWatchlist}
				/>
				<div className="movies-div">
					{showingWatchlist
						? localStorage.getItem('watchlist') !== 'undefined' &&
						  localStorage.getItem('watchlist') !== ''
							? showWatchlist
							: showEmptyWatchlistPrompt
						: searchResults?.length >= 1
						? showResults
						: showSearchPrompt}
				</div>
			</div>
		);
	} catch (err) {
		console.error(err);
		window.location.reload(false);
	}
}

export default App;
