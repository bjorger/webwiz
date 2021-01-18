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
 * @param {Pokemon[]} data
 */
export const drawDonutChart = (data, setGen, gen) => {
	const gen1 = data.filter((pokemon) => pokemon.generation === 0);
	const gen2 = data.filter((pokemon) => pokemon.generation === 1);
	const gen3 = data.filter((pokemon) => pokemon.generation === 2);
	const gen4 = data.filter((pokemon) => pokemon.generation === 3);
	const gen5 = data.filter((pokemon) => pokemon.generation === 4);
	const gen6 = data.filter((pokemon) => pokemon.generation === 5);

	const donut_color_scheme = ['#6390F0', '#A8A77A', '#7AC74C', '#F7D02C', '#A6B91A', '#735797'];

	const generations = {
		'Gen 1': gen1.length,
		'Gen 2': gen2.length,
		'Gen 3': gen3.length,
		'Gen 4': gen4.length,
		'Gen 5': gen5.length,
		'Gen 6': gen6.length,
	};

	var width = 450;
	var height = 350;
	var margin = 40;

	// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
	var radius = Math.min(width, 450) / 2 - margin;

	const update = () => {
		d3.select('#pieChart').selectAll('svg').remove();

		var svg = d3
			.select('#pieChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// set the color scale
		var color = d3.scaleOrdinal().domain(generations).range(donut_color_scheme);

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
		var arc = d3
			.arc()
			.innerRadius(radius * 0.4)
			.outerRadius(radius * 0.8);
		var outerArc = d3
			.arc()
			.innerRadius(radius * 0.9)
			.outerRadius(radius * 0.9);

		// Add the polylines between chart and labels:
		svg.selectAll('allPolylines')
			.data(data_ready)
			.enter()
			.append('polyline')
			.attr('stroke', (d, index) => donut_color_scheme[index])
			.style('opacity', 1)
			.style('fill', 'none')
			.attr('stroke-width', 1)
			.attr('points', function (d) {
				var posA = arc.centroid(d); // line insertion in the slice
				var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
				var posC = outerArc.centroid(d); // Label position = almost the same as posB
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
				posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
				return [posA, posB, posC];
			});

		// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
		svg.selectAll('mySlices')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function (d) {
				return color(d.data.key);
			})
			.style('opacity', 1)
			.on('click', (d) => {
				let currentGen = +d.data.key.replace(/^\D+/g, '') - 1;
				// -1 because we take the string values -> Gen 1 is 0 etc..
				if (gen === currentGen) {
					setGen(undefined);
				} else {
					setGen(currentGen);
				}
				return;
			});

		// Now add the annotation. Use the centroid method to get the best coordinates
		svg.selectAll('mySlices')
			.data(data_ready)
			.enter()
			.append('text')
			.text(function (d) {
				return d.data.value;
			})
			.attr('transform', function (d) {
				return 'translate(' + arc.centroid(d) + ')';
			})
			.style('text-anchor', 'middle')
			.style('font-size', 17)
			.style('font-weight', 'bold')
			.attr('fill', 'white');

		svg.selectAll('allLabels')
			.data(data_ready)
			.enter()
			.append('text')
			.text((d) => d.data.key)
			.attr('transform', function (d) {
				var pos = outerArc.centroid(d);
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
				return 'translate(' + pos + ')';
			})
			.style('text-anchor', function (d) {
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
				return midangle < Math.PI ? 'start' : 'end';
			})
			.attr('font-weight', 'bold')
			.attr('fill', 'white');
	};
	update();
};
