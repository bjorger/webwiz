import './App.css';
import { useEffect } from 'react';
import * as d3 from 'd3';
import data from './Pokemon.csv';

/**
 * Normal Type: A8A77A 0
Fire Type:  EE8130 1 
Water Type:  6390F0 2
Electric Type:  F7D02C 3
Grass Type:  7AC74C 4
Ice Type:  96D9D6 5 
Fighting Type:  C22E28 6
Poison Type:  A33EA1 7 
Ground Type:  E2BF65 8
Flying Type:  A98FF3 9
Psychic Type:  F95587 10
Bug Type:  A6B91A 11 
Rock Type:  B6A136 12
Ghost Type:  735797 13
Dragon Type:  6F35FC 14
Dark Type:  705746 15
Steel Type:  B7B7CE 16
Fairy Type:  D685AD 17
 */

export const App = () => {
	/**
	 * @typedef {Object} Pokemon
	 * @property {String} name
	 * @property {Number} type_1
	 * @property {Number} type_2
	 * @property {Number} total
	 * @property {Number} generation
	 * @property {Number} legendary
	 */

	const calc_median = (input) => {
		const test = [];
		input.forEach((data) => test.push(data.income));
		let unique = [...new Set(test)];
		unique.sort();
		console.log(unique);
		if (unique.length % 2) {
			return unique[Math.floor(unique.length / 2)];
		} else {
			return (unique[Math.floor(unique.length / 2)] + unique[Math.floor(unique.length / 2) - 1]) / 2;
		}
	};

	/**
	 * @param {Pokemon[]} data
	 */
	const drawPieChart = (data) => {
		const gen1 = data.filter((pokemon) => pokemon.generation === 0);
		const gen2 = data.filter((pokemon) => pokemon.generation === 1);
		const gen3 = data.filter((pokemon) => pokemon.generation === 2);
		const gen4 = data.filter((pokemon) => pokemon.generation === 3);
		const gen5 = data.filter((pokemon) => pokemon.generation === 4);
		const gen6 = data.filter((pokemon) => pokemon.generation === 5);

		const generations = {
			'Gen 1': gen1.length,
			'Gen 2': gen2.length,
			'Gen 3': gen3.length,
			'Gen 4': gen4.length,
			'Gen 5': gen5.length,
			'Gen 6': gen6.length,
		};

		var width = 450;
		var height = 450;
		var margin = 40;

		// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
		var radius = Math.min(width, height) / 2 - margin;

		var div = d3.select('#pieChart').append('div').attr('class', 'tooltip').style('opacity', 0);

		// append the svg object to the div called 'my_dataviz'
		var svg = d3
			.select('#pieChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// set the color scale
		var color = d3
			.scaleOrdinal()
			.domain(generations)
			.range(['#613c3c', '#894a42', '#ae5a41', '#cf6f3a', '#eb882b', '#ffa600']);

		// Compute the position of each group on the pie:
		var pie = d3
			.pie()
			.value(function (d) {
				return d.value;
			})
			.sort(null);
		var data_ready = pie(d3.entries(generations));
		// Now I know that group A goes from 0 degrees to x degrees and so on.

		// shape helper to build arcs:
		var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

		// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
		svg.selectAll('mySlices')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', arcGenerator)
			.attr('fill', function (d) {
				return color(d.data.key);
			})
			.style('opacity', 0.7)
			.on('mouseover', (d) => {
				// add tooltip
				console.log(d);
				div.transition().duration(200).style('opacity', 1);
				div.html('Pokemon added: ' + d.data.value)
					.style('left', d3.event.pageX + 'px')
					.style('top', d3.event.pageY - 28 + 'px');
			});

		// Now add the annotation. Use the centroid method to get the best coordinates
		svg.selectAll('mySlices')
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
			.style('font-size', 17)
			.style('font-weight', 'bold')
			.attr('fill', 'white');
	};

	/**
	 * @param {Pokemon[]} data
	 */
	const drawBarplot = (data) => {
		const normal = data.filter((Pokemon) => {
			return Pokemon.type_1 === 0 || Pokemon.type_2 === 0;
		});
		console.log(normal);
		const fire = data.filter((Pokemon) => Pokemon.type_1 === 1 || Pokemon.type_2 === 1);
		const water = data.filter((Pokemon) => Pokemon.type_1 === 2 || Pokemon.type_2 === 2);
		const electric = data.filter((Pokemon) => Pokemon.type_1 === 3 || Pokemon.type_2 === 3);
		const grass = data.filter((Pokemon) => Pokemon.type_1 === 4 || Pokemon.type_2 === 4);
		const ice = data.filter((Pokemon) => Pokemon.type_1 === 5 || Pokemon.type_2 === 5);
		const fighting = data.filter((Pokemon) => Pokemon.type_1 === 6 || Pokemon.type_2 === 6);
		const poison = data.filter((Pokemon) => Pokemon.type_1 === 7 || Pokemon.type_2 === 7);
		const ground = data.filter((Pokemon) => Pokemon.type_1 === 8 || Pokemon.type_2 === 8);
		const flying = data.filter((Pokemon) => Pokemon.type_1 === 9 || Pokemon.type_2 === 9);
		const psychic = data.filter((Pokemon) => Pokemon.type_1 === 10 || Pokemon.type_2 === 10);
		const bug = data.filter((Pokemon) => Pokemon.type_1 === 11 || Pokemon.type_2 === 11);
		const rock = data.filter((Pokemon) => Pokemon.type_1 === 12 || Pokemon.type_2 === 12);
		const ghost = data.filter((Pokemon) => Pokemon.type_1 === 13 || Pokemon.type_2 === 13);
		const dragon = data.filter((Pokemon) => Pokemon.type_1 === 14 || Pokemon.type_2 === 14);
		const dark = data.filter((Pokemon) => Pokemon.type_1 === 15 || Pokemon.type_2 === 15);
		const steel = data.filter((Pokemon) => Pokemon.type_1 === 16 || Pokemon.type_2 === 16);
		const fairy = data.filter((Pokemon) => Pokemon.type_1 === 17 || Pokemon.type_2 === 17);

		const type_distribution = [
			{
				type: 'Normal',
				amount: normal.length,
			},
			{
				type: 'Fire',
				amount: fire.length,
			},
			{
				type: 'Water',
				amount: water.length,
			},
			{
				type: 'Electric',
				amount: electric.length,
			},
			{
				type: 'Grass',
				amount: grass.length,
			},
			{
				type: 'Ice',
				amount: ice.length,
			},
			{
				type: 'Fighting',
				amount: fighting.length,
			},
			{
				type: 'Poison',
				amount: poison.length,
			},
			{
				type: 'Ground',
				amount: ground.length,
			},
			{
				type: 'Flying',
				amount: flying.length,
			},
			{
				type: 'Psychic',
				amount: psychic.length,
			},
			{
				type: 'Bug',
				amount: bug.length,
			},
			{
				type: 'Rock',
				amount: rock.length,
			},

			{
				type: 'Ghost',
				amount: ghost.length,
			},

			{
				type: 'Dragon',
				amount: dragon.length,
			},
			{
				type: 'Dark',
				amount: dark.length,
			},
			{
				type: 'Steel',
				amount: steel.length,
			},
			{
				type: 'Fairy',
				amount: fairy.length,
			},
		];

		console.log(type_distribution);

		var margin = { top: 30, right: 30, bottom: 70, left: 60 };
		var width = 920 - margin.left - margin.right;
		var height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3
			.select('#barChart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// sort data
		type_distribution.sort(function (b, a) {
			return a.amount - b.amount;
		});

		// X axis
		var x = d3
			.scaleBand()
			.range([0, width])
			.domain(
				type_distribution.map(function (d) {
					return d.type;
				})
			)
			.padding(0.2);
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		var y = d3.scaleLinear().domain([0, 120]).range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		// Bars
		svg.selectAll('mybar')
			.data(type_distribution)
			.enter()
			.append('rect')
			.attr('x', function (d) {
				return x(d.type);
			})
			.attr('y', function (d) {
				return y(d.amount);
			})
			.attr('width', x.bandwidth())
			.attr('height', function (d) {
				return height - y(d.amount);
			})
			.attr('fill', '#69b3a2');
	};

	useEffect(() => {
		d3.csv(data, (data) => {
			data.forEach((d) => {
				Object.keys(d).forEach((key) => {
					if (key !== 'name') {
						if (key === 'type_2') {
							if (d[key] === '') {
								d[key] = d[key];
							}
						} else {
							d[key] = +d[key];
						}
					}
				});
			});
			console.log(data);
			drawPieChart(data);
			drawBarplot(data);
		});
	}, []);

	return (
		<div className="App">
			<div id="barChart"></div>
			<div id="pieChart"></div>
		</div>
	);
};
