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
	//fetch the rest of the data from the api in each movie instance using given id prop: runtime, rating,descrption etc...
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
