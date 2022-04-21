const ResultsPanel = ({ results }) => {
	console.log(
		'🚀 ~ file: ResultsPanel.js ~ line 2 ~ ResultsPanel ~ results',
		results
	);

	const showResults = (results) => {
		return results.map((result) => <div className="movie-card">result</div>);
		console.log(results.length);
	};

	return <div className="movies-div">{showResults(results)}</div>;
};
export default ResultsPanel;
