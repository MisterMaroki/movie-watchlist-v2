import React, { useState } from 'react';

const Header = ({ handleSearch }) => {
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
				<button className="search-btn">Search</button>
			</form>
		</nav>
	);
};
export default Header;
