import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import * as d3 from 'd3';

export const App = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				var dataSet;
				const { data } = await axios.post('http://localhost:8000/api/dashboard');
				dataSet = data;
				draw_a_fucking_circle_brother(dataSet);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const draw_a_fucking_circle_brother = (dataSet) => {
		console.log(dataSet);
		const unemployed_to_employed_ratio = {
			employed: dataSet.unemployed.filter((has_job) => has_job === 1).length,
			unemployed: dataSet.unemployed.filter((has_job) => has_job === 0).length,
		};
		var width = 450;
		var height = 450;
		var margin = 40;

		// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
		var radius = Math.min(width, height) / 2 - margin;
		// append the svg object to the div called 'my_dataviz'
		var svg = d3
			.select('#my_dataviz')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// set the color scale
		var color = d3.scaleOrdinal().domain(unemployed_to_employed_ratio).range(['#98abc5', '#8a89a6']);

		// Compute the position of each group on the pie:
		var pie = d3.pie().value(function (d) {
			return d.value;
		});
		var data_ready = pie(d3.entries(unemployed_to_employed_ratio));

		var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

		// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
		svg.selectAll('whatever')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', d3.arc().innerRadius(0).outerRadius(radius))
			.attr('fill', function (d) {
				return color(d.data.key);
			})
			.attr('stroke', 'black')
			.style('stroke-width', '2px')
			.style('opacity', 0.7);
		svg.selectAll('whatever')
			.data(data_ready)
			.enter()
			.append('text')
			.text(function (d) {
				return d.data.key;
			})
			.attr('transform', function (d) {
				return 'translate(' + arcGenerator.centroid(d) + ')';
			})
			.style('text-anchor', 'middle')
			.style('font-size', 17);
	};

	return (
		<div className="App">
			<div id="my_dataviz"></div>
		</div>
	);
};
