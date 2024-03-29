import * as d3 from 'd3';
import { generation_colors } from './types';
/**
 * @typedef {Object} Pokemon
 * @property {String} name
 * @property {Number} type_1
 * @property {Number} type_2
 * @property {Number} total
 * @property {Number} generation
 * @property {Number} legendary
 */

var old_data = [];

/**
 * @param {Pokemon[]} data
 */
export const drawDonutChart = (data, setGen, gen, primaryType) => {
	const update = (data) => {
		d3.select('#pieChart').selectAll('svg').remove();
		const gen1 = data.filter((pokemon) => pokemon.generation === 0);
		const gen2 = data.filter((pokemon) => pokemon.generation === 1);
		const gen3 = data.filter((pokemon) => pokemon.generation === 2);
		const gen4 = data.filter((pokemon) => pokemon.generation === 3);
		const gen5 = data.filter((pokemon) => pokemon.generation === 4);
		const gen6 = data.filter((pokemon) => pokemon.generation === 5);

		let generations = {
			'Gen 1': gen1.length,
			'Gen 2': gen2.length,
			'Gen 3': gen3.length,
			'Gen 4': gen4.length,
			'Gen 5': gen5.length,
			'Gen 6': gen6.length,
		};

		Object.keys(generations).forEach((key) => {
			if (generations[key] === 0) {
				delete generations[key];
			}
		});

		var width = 400;
		var height = 300;
		var margin = 40;

		// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
		var radius = 400 / 2 - margin;
		var svg = d3
			.select('#pieChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// set the color scale
		var color = d3.scaleOrdinal().domain(generations).range(generation_colors);

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

		var arcOver = d3
			.arc()
			.innerRadius(radius * 0.4)
			.outerRadius(radius * 0.85);

		// Add the polylines between chart and labels:
		svg.selectAll('allPolylines')
			.data(data_ready)
			.enter()
			.append('polyline')
			.attr('stroke', (d, index) => generation_colors[index])
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
			.attr('class', 'donutArc')
			.attr('fill', function (d) {
				return color(d.data.key);
			})
			.on('click', (d) => {
				let currentGen = +d.data.key.replace(/^\D+/g, '') - 1;
				// -1 because we take the string values -> Gen 1 is 0 etc..
				if (gen === currentGen) {
					setGen(undefined);
				} else {
					setGen(currentGen);
				}
			})
			.transition()
			.delay(function (d, i) {
				return i;
			})
			.duration(800)
			.attrTween('d', function (d, index) {
				var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
				return function (t) {
					d.endAngle = i(t);
					if (gen !== undefined) {
						if (gen === index) {
							return arcOver(d);
						}
					}
					return arc(d);
				};
			})
			.style('opacity', 1)
			.on('end', function (d, i) {
				d3.select(this).on('mouseover', function (d) {
					d3.select(this).transition().duration(800).attr('d', arcOver);
				});
				d3.select(this).on('mouseleave', function (d) {
					if (gen !== d.index) {
						d3.select(this).transition().duration(800).attr('d', arc);
					}
				});
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
			.on('click', (d) => {
				let currentGen = +d.data.key.replace(/^\D+/g, '') - 1;
				// -1 because we take the string values -> Gen 1 is 0 etc..
				if (gen === currentGen) {
					setGen(undefined);
				} else {
					setGen(currentGen);
				}
				return;
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
	if (primaryType !== undefined) {
		var new_data = data.filter((Pokemon) => Pokemon.type_1 === primaryType);
		if (new_data.length !== data.length) {
			update(new_data);
		}
	} else {
		if (data.length !== old_data.length || primaryType === undefined) {
			update(data);
		}
		old_data = data;
	}
};
