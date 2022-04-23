import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Badge from '@mui/material/Badge';

const Header = ({
	handleSearch,
	showingWatchlist,
	toggleWatchlist,
	currentWatchlist,
}) => {
	const watchlistLength =
		localStorage.getItem('watchlist')?.split(',').length - 1;

	return (
		<header>
			<div className="flex">
				<h1 id="heading-top">
					{!showingWatchlist ? 'Find your film' : 'Your Watchlist'}
				</h1>
				<Badge
					badgeContent={watchlistLength > 0 && watchlistLength}
					color="secondary"
				>
					<Button
						style={{ color: 'whitesmoke' }}
						id="nav-link"
						onClick={toggleWatchlist}
					>
						{showingWatchlist ? 'Find a film' : 'My Watchlist'}
					</Button>
				</Badge>
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
