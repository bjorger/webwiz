import * as d3 from 'd3';
import { type_names, type_name_color_scheme } from './types';

/**
 * @typedef {Object} Pokemon
 * @property {String} name
 * @property {Number} type_1
 * @property {Number} type_2
 * @property {Number} total
 * @property {Number} generation
 * @property {Number} legendary
 */

/**
 * @param {Pokemon[]} data
 */
export const drawBarplot = (data, gen, primaryType, setPrimaryType) => {
	var margin = { top: 30, right: 30, bottom: 70, left: 60 };
	var width = 800 - margin.left - margin.right;
	var height = 350 - margin.top - margin.bottom;

	var div = d3.select('#barChart').append('div').attr('class', 'tooltip').style('opacity', 0);

	const update = (data) => {
		d3.select('#barChart').selectAll('svg').remove();

		var normal = [];
		var fire = [];
		var water = [];
		var electric = [];
		var grass = [];
		var ice = [];
		var fighting = [];
		var poison = [];
		var ground = [];
		var flying = [];
		var psychic = [];
		var bug = [];
		var rock = [];
		var ghost = [];
		var dragon = [];
		var dark = [];
		var steel = [];
		var fairy = [];

		if (primaryType !== undefined) {
			normal = data.filter((Pokemon) => Pokemon.type_2 === 0);
			fire = data.filter((Pokemon) => Pokemon.type_2 === 1);
			water = data.filter((Pokemon) => Pokemon.type_2 === 2);
			electric = data.filter((Pokemon) => Pokemon.type_2 === 3);
			grass = data.filter((Pokemon) => Pokemon.type_2 === 4);
			ice = data.filter((Pokemon) => Pokemon.type_2 === 5);
			fighting = data.filter((Pokemon) => Pokemon.type_2 === 6);
			poison = data.filter((Pokemon) => Pokemon.type_2 === 7);
			ground = data.filter((Pokemon) => Pokemon.type_2 === 8);
			flying = data.filter((Pokemon) => Pokemon.type_2 === 9);
			psychic = data.filter((Pokemon) => Pokemon.type_2 === 10);
			bug = data.filter((Pokemon) => Pokemon.type_2 === 11);
			rock = data.filter((Pokemon) => Pokemon.type_2 === 12);
			ghost = data.filter((Pokemon) => Pokemon.type_2 === 13);
			dragon = data.filter((Pokemon) => Pokemon.type_2 === 14);
			dark = data.filter((Pokemon) => Pokemon.type_2 === 15);
			steel = data.filter((Pokemon) => Pokemon.type_2 === 16);
			fairy = data.filter((Pokemon) => Pokemon.type_2 === 17);
		} else {
			normal = data.filter((Pokemon) => Pokemon.type_1 === 0);
			fire = data.filter((Pokemon) => Pokemon.type_1 === 1);
			water = data.filter((Pokemon) => Pokemon.type_1 === 2);
			electric = data.filter((Pokemon) => Pokemon.type_1 === 3);
			grass = data.filter((Pokemon) => Pokemon.type_1 === 4);
			ice = data.filter((Pokemon) => Pokemon.type_1 === 5);
			fighting = data.filter((Pokemon) => Pokemon.type_1 === 6);
			poison = data.filter((Pokemon) => Pokemon.type_1 === 7);
			ground = data.filter((Pokemon) => Pokemon.type_1 === 8);
			flying = data.filter((Pokemon) => Pokemon.type_1 === 9);
			psychic = data.filter((Pokemon) => Pokemon.type_1 === 10);
			bug = data.filter((Pokemon) => Pokemon.type_1 === 11);
			rock = data.filter((Pokemon) => Pokemon.type_1 === 12);
			ghost = data.filter((Pokemon) => Pokemon.type_1 === 13);
			dragon = data.filter((Pokemon) => Pokemon.type_1 === 14);
			dark = data.filter((Pokemon) => Pokemon.type_1 === 15);
			steel = data.filter((Pokemon) => Pokemon.type_1 === 16);
			fairy = data.filter((Pokemon) => Pokemon.type_1 === 17);
		}

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

		var svg = d3
			.select('#barChart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
			.on('mouseout', () => div.transition().duration(50).style('opacity', 0));

		// sort data
		type_distribution.sort(function (b, a) {
			return a.amount - b.amount;
		});

		// append the svg object to the body of the page
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
			.attr('class', 'axisWhite')
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('fill', 'white')
			.attr('font-size', '12px')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		var y = d3.scaleLinear().domain([0, type_distribution[0].amount]).range([height, 0]);
		svg.append('g')
			.attr('class', 'axisWhite barplotAxis')
			.call(d3.axisLeft(y))
			.selectAll('text')
			.attr('font-size', '12px')
			.attr('fill', 'white');

		// Bars
		svg.selectAll('mybar')
			.data(type_distribution)
			.enter()
			.append('rect')
			.attr('x', function (d) {
				return x(d.type);
			})
			.attr('y', function (d) {
				return y(0);
			})
			.attr('width', x.bandwidth())
			.attr('height', function (d) {
				return height - y(0);
			})
			.attr('fill', (d) => type_name_color_scheme[d.type])
			.on('mouseover', (d) => {
				// add tooltip
				div.transition().duration(200).style('opacity', 1);
				div.html(`${d.amount} Pokemon`)
					.style('left', () => {
						return d3.event.pageX - 40 + 'px';
					})
					.style('top', d3.event.pageY - 40 + 'px');
			})
			.on('mouseleave', () => div.transition().duration(200).style('opacity', 0))
			.on('click', (d, i) => {
				console.log(i);
				type_names.forEach((type, i) => type === d.type && setPrimaryType(i));
				div.transition().duration(200).style('opacity', 0);
			});

		svg.selectAll('rect')
			.transition()
			.duration(800)
			.attr('y', (d) => y(d.amount))
			.attr('height', (d) => height - y(d.amount))
			.delay((d, i) => i * 100);
	};

	if (primaryType !== undefined || gen !== undefined) {
		var dataToDisplay = data;
		if (primaryType !== undefined) {
			dataToDisplay = dataToDisplay.filter((Pokemon) => Pokemon.type_1 === primaryType);
		}
		if (gen !== undefined) {
			dataToDisplay = dataToDisplay.filter((Pokemon) => Pokemon.generation === gen);
		}
		update(dataToDisplay);
	} else {
		update(data);
	}
};
