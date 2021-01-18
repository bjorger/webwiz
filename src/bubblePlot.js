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

var clicked = false;
var old_data = [];
/**
 *
 * @param {Pokemon[]} data
 */
export const drawBubbleplot = (data, gen) => {
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

	const update = (data) => {
		d3.select('#bubblePlot').selectAll('svg').remove();
		const legendary_pokemon = data.filter((Pokemon) => Pokemon.legendary === 1);
		// set the dimensions and margins of the graph
		var margin = { top: 10, right: 20, bottom: 30, left: 50 };
		var width = 500 - margin.left - margin.right;
		var height = 420 - margin.top - margin.bottom;

		// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip

		var showTooltip = function (d) {
			if (clicked) {
				tooltip.transition().duration(50).style('opacity', 0);
			} else {
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
			}
			clicked = !clicked;
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
		var x = d3.scaleLinear().domain([30, 220]).range([0, width]);
		var xAxis = svg
			.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x).tickSize(0))
			.attr('class', 'axisWhite')
			.selectAll('text')
			.attr('fill', 'white');

		// Add Y axis
		// Highest def val = 200
		// Lowest defense val = 20
		var y = d3.scaleLinear().domain([0, 220]).range([height, 0]);
		var yAxis = svg
			.append('g')
			.call(d3.axisLeft(y).tickSize(0))
			.attr('class', 'axisWhite')
			.selectAll('text')
			.attr('fill', 'white');

		// Add a clipPath: everything out of this area won't be drawn.
		svg.append('defs')
			.append('SVG:clipPath')
			.attr('id', 'clip')
			.append('SVG:rect')
			.attr('width', width)
			.attr('height', height)
			.attr('x', 0)
			.attr('y', 0);

		// Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
		var zoom = d3
			.zoom()
			.scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
			.translateExtent([
				[0, 0],
				[width + margin.left + margin.right, Infinity],
			])
			.extent([
				[0, 0],
				[width + margin.left + margin.right, height + margin.top + margin.bottom],
			])
			.on('zoom', updateChart);
		// Create the scatter variable: where both the circles and the brush take place
		var scatter = svg.append('g').attr('clip-path', 'url(#clip)').call(zoom);

		// Add a scale for bubble size
		var z = d3.scaleLinear().domain([0, 150]).range([4, 20]);

		// Add dots
		scatter
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
			.attr('r', function (d, i) {
				return z(0);
			})
			.style('fill', function (d) {
				return type_color_scheme[d.type_1];
			})
			.style('opacity', '0.7')
			.attr('stroke', 'white')
			.style('stroke-width', '2px')
			.on('click', showTooltip)
			.transition()
			.attr('r', (d) => z(d.hp))
			.duration(1200);

		// -1- Create a tooltip div that is hidden by default:
		var tooltip = d3.select('#bubblePlot').append('div').style('opacity', 0).attr('class', 'tooltip');

		// A function that updates the chart when the user zoom and thus new boundaries are available
		function updateChart() {
			// recover the new scale
			var newX = d3.event.transform.rescaleX(x);
			var newY = d3.event.transform.rescaleY(y);

			console.log('updateChart');

			xAxis.remove();
			yAxis.remove();

			xAxis = svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(d3.axisBottom(newX).tickSize(0))
				.attr('class', 'axisWhite')
				.selectAll('text')
				.attr('fill', 'white');
			yAxis = svg
				.append('g')
				.call(d3.axisLeft(newY).tickSize(0))
				.attr('class', 'axisWhite')
				.selectAll('text')
				.attr('fill', 'white');

			// update circle position
			scatter
				.selectAll('circle')
				.attr('cx', function (d) {
					return newX(d.attack);
				})
				.attr('cy', function (d) {
					return newY(d.defense);
				});
		}
	};

	if (gen !== undefined) {
		update(data.filter((Pokemon) => Pokemon.generation === gen));
	} else {
		if (data.length !== old_data.length) update(data);
		old_data = data;
	}
};

/*

			.on('mouseover', showTooltip)
			.on('mousemove', moveTooltip)
			.on('mouseleave', hideTooltip)
*/
