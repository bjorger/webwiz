import * as d3 from 'd3';

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
 *
 * @param {Pokemon[]} data
 */
export const drawBubbleplot = (data) => {
	const type_color_scheme = [
		'#A8A77A',
		'#EE8130',
		'#6390F0',
		'#F7D02C',
		'#7AC74C',
		'#96D9D6',
		'#C22E28',
		'#A33EA1',
		'#E2BF65',
		'#A98FF3',
		'#F95587',
		'#A6B91A',
		'#B6A136',
		'#735797',
		'#6F35FC',
		'#705746',
		'#B7B7CE',
		'#D685AD',
	];

	const type_names = [
		'Normal',
		'Fire',
		'Water',
		'Electric',
		'Grass',
		'Ice',
		'Fighting',
		'Poison',
		'Ground',
		'Flying',
		'Psychic',
		'Bug',
		'Rock',
		'Ghost',
		'Dragon',
		'Dark',
		'Steel',
		'Fairy',
	];

	const legendary_pokemon = data.filter((Pokemon) => Pokemon.legendary === 1);
	console.log(legendary_pokemon);
	// set the dimensions and margins of the graph
	var margin = { top: 10, right: 20, bottom: 30, left: 50 };
	var width = 500 - margin.left - margin.right;
	var height = 420 - margin.top - margin.bottom;

	// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
	var showTooltip = function (d) {
		tooltip.transition().duration(200);
		tooltip
			.style('opacity', 1)
			.html(
				`${d.name}<br/>Health: ${d.hp} <br/>Attack: ${d.attack}<br/>Defense: ${d.defense}<br/>Type: ${
					type_names[d.type_1]
				}${type_names[d.type_2] ? '/' + type_names[d.type_2] : ''}`
			)
			.style('left', d3.mouse(this)[0] + 30 + 'px')
			.style('top', d3.mouse(this)[1] + 30 + 'px');
	};
	var moveTooltip = function (d) {
		tooltip.style('left', d3.mouse(this)[0] + 30 + 'px').style('top', d3.mouse(this)[1] + 30 + 'px');
	};
	var hideTooltip = function (d) {
		tooltip.transition().duration(200).style('opacity', 0);
	};

	// append the svg object to the body of the page
	var svg = d3
		.select('#bubblePlot')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// Defense
	// Add X axis
	// Lowest av = 50
	// Highest attack value = 190
	var x = d3.scaleLinear().domain([40, 220]).range([0, width]);
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x))
		.attr('class', 'axisWhite')
		.selectAll('text')
		.attr('fill', 'white');

	// Add Y axis
	// Highest def val = 200
	// Lowest defense val = 20
	var y = d3.scaleLinear().domain([40, 220]).range([height, 0]);
	svg.append('g').call(d3.axisLeft(y)).attr('class', 'axisWhite').selectAll('text').attr('fill', 'white');

	// Add a scale for bubble size
	var z = d3.scaleLinear().domain([0, 150]).range([4, 50]);

	// Add dots
	svg.append('g')
		.selectAll('dot')
		.data(legendary_pokemon)
		.enter()
		.append('circle')
		.attr('cx', function (d) {
			return x(d.attack);
		})
		.attr('cy', function (d) {
			return y(d.defense);
		})
		.attr('r', function (d) {
			console.log(d);

			return z(d.hp - 80);
		})
		.style('fill', function (d) {
			return type_color_scheme[d.type_1];
		})
		.style('opacity', '0.7')
		.attr('stroke', 'white')
		.style('stroke-width', '2px')
		.on('mouseover', showTooltip)
		.on('mousemove', moveTooltip)
		.on('mouseleave', hideTooltip);

	// -1- Create a tooltip div that is hidden by default:
	var tooltip = d3
		.select('#bubblePlot')
		.append('div')
		.style('opacity', 0)
		.attr('class', 'tooltip')
		.style('background-color', 'black')
		.style('border-radius', '5px')
		.style('padding', '10px')
		.style('color', 'white');
};
