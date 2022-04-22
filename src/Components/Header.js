import SearchIcon from '@mui/icons-material/Search';
const Header = ({ handleSearch, showingWatchlist, toggleWatchlist }) => {
	return (
		<header>
			<div className="flex">
				<h1 id="heading-top">
					{!showingWatchlist ? 'Find your film' : 'Your Watchlist'}
				</h1>
				<button id="nav-link" onClick={toggleWatchlist}>
					{showingWatchlist ? 'Find a film' : 'My Watchlist'}
				</button>
			</div>
			{!showingWatchlist && (
				<div className="search-container" id="search-form">
					<div className="icon-container">
						<SearchIcon />{' '}
					</div>
					<input
						type="text"
						className="search-input"
						name="search"
						placeholder="Find a film..."
						onChange={handleSearch}
					/>
					<button className="search-btn">Search</button>
				</div>
			)}
		</header>
	);
};
export default Header;
