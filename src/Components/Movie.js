import { useEffect, useState } from 'react';

const Movie = ({ id, poster, title }) => {
	const [thisResult, setThisResult] = useState({
		imdbID: '',
		Runtime: '',
		imdbRating: '',
		Plot: '',
	});
	// console.log(
	// 	'🚀 ~ file: Movie.js ~ line 5 ~ Movie ~ thisResult',
	// 	JSON.stringify(thisResult)
	// );
	//fetch the rest of the data from the api in each movie instance: runtime, rating,descrption etc...
	useEffect(() => {
		async function fetchMoreData(id) {
			const res = await fetch(
				`https://www.omdbapi.com/?apikey=3f3c26a6&i=${id}&type=movie`
			);
			const moreData = await res.json();
			// const { imdbID, Runtime, imdbRating, Plot } = moreData;
			setThisResult(moreData);
		}
		fetchMoreData(id);
	}, [id]);
	return (
		<div className="movie-card" id={id}>
			<img src={poster} alt={title} />
			<div className="card-info">
				<h3>{thisResult.Title}</h3>
				<h3>{thisResult.Runtime}</h3>
				<h3>{thisResult.imdbID}</h3>
			</div>
		</div>
	);
};
export default Movie;
