import SearchIcon from '@mui/icons-material/Search';
const Header = ({ handleSearch }) => {
	return (
		<header>
			<div className="flex">
				<h1 id="heading-top">Find your film</h1>
				<button id="nav-link">My Watchlist</button>
			</div>
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
		</header>
	);
};
export default Header;
