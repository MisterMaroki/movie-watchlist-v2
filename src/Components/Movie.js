import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import fmov from '../fmov.png';
const Movie = ({ id, poster, title }) => {
	const [thisResult, setThisResult] = useState({
		imdbID: '',
		Title: '',
		Runtime: '',
		imdbRating: '',
		Plot: '',
		Genre: '',
	});
	function isWatchlist(e) {
		console.log(e);
	}
	console.log(thisResult);
	//fetch the rest of the data from the api in each movie instance: runtime, rating,descrption etc...
	useEffect(() => {
		async function fetchMoreData(id) {
			try {
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=3f3c26a6&i=${id}&type=movie`
				);
				const moreData = await res.json();
				// const { imdbID, Runtime, imdbRating, Plot } = moreData;
				setThisResult(moreData);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoreData(id);
	}, [id]);
	return (
		//filter bad results
		thisResult.Plot.length >= 10 &&
		thisResult.imdbRating !== 'N/A' && (
			<div className="movie-card" id={id}>
				<div className="img-container">
					<img src={poster} alt={title} />
				</div>
				<div className="card-info">
					<div className="card-title">
						<h3>{thisResult.Title}</h3>
						<p className="rating">
							<StarIcon style={{ color: 'gold' }} />
							{thisResult.imdbRating}
						</p>
					</div>
					<div className="meta-container">
						<p>{thisResult.Runtime}</p>
						<p>{thisResult.Genre}</p>
						<button className="watchlist-btn" id={id}>
							{isWatchlist ? (
								<IndeterminateCheckBoxIcon />
							) : (
								<AddBoxIcon style={{ color: 'green' }} />
							)}
							{/* <IndeterminateCheckBoxIcon /> */}
							Watchlist
						</button>
					</div>
					<p className="desc">{thisResult.Plot}</p>
					<button className="fmovies-btn">
						<a
							href={`https://fmoviesto.cc/search/${title.split(' ').join('-')}`}
							target="_blank"
							rel="noreferrer"
						>
							<img src={fmov} alt="" />
						</a>
					</button>
				</div>
			</div>
		)
	);
};
export default Movie;

// <div id="img-container" class=${JSON.stringify(
// 		obj.title
// 	)} style="background-image: url('${obj.imageURL}')"></div>
// 	<div id="info-container">
// 		<div id="title-container">
// 			<h3 id="movie-title">${obj.title}</h3>
// 			<i class="fa-solid fa-star"></i>
// 			<p id="movie-rating">${obj.rated}1</p>
// 		</div>
// 		<div id="meta-container">
// 			<p id="movie-runtime">${obj.runtime}</p>
// 			<p id="movie-genres">${obj.genre}</p>
// 			<button id="add-to-watchlist-btn-${i}" onClick="editWatchlistInSearch(${i})" style='${
// 		localStorage.getItem(obj.id)
// 			? 'background-color: #ffffff16'
// 			: 'background-color: #ffffff00'
// 	}'>
// 			<i id="plus-btn-${i}" class='${
// 		localStorage.getItem(obj.id)
// 			? 'fa-solid fa-circle-minus'
// 			: 'fa-solid fa-circle-plus'
// 	}'></i>

// 				<p>Watchlist</p>
// 			</button>
// 		</div>
// 		<div id="description-container">
// 	<p>${obj.desc}</p>
// 		</div>
// 	</div>
