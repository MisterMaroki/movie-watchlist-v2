import React, { useState } from 'react';

const Header = () => {
	const [searchInput, setSearchInput] = useState('');

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
		console.log(data);
	};

	return (
		<nav>
			<div className="blur"></div>
			<div className="flex">
				<h1 id="heading-top">Find your film</h1>
				<button id="nav-link">My Watchlist</button>
			</div>
			<form
				onSubmit={handleSearch}
				className="search-container"
				id="search-form"
			>
				<div className="icon-container">
					<i className="fa-solid fa-magnifying-glass"></i>
				</div>
				<input
					type="text"
					className="search-input"
					name="search"
					id="search-input"
					placeholder="Find a film..."
					onChange={handleSearch}
				/>
				<button type="submit" className="search-btn" id="search-btn">
					Search
				</button>
			</form>
		</nav>
	);
};
export default Header;
