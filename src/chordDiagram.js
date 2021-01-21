import * as d3 from 'd3';
import { type_names, type_color_scheme } from './types';

/**
 * @param {Pokemon[]} data
 */
const createChordMatrix = (data) => {
	const typeRelations = [];
	const typeArray = [...Array(18).keys()];
	typeArray.forEach((type) => {
		typeRelations.push(data.filter((Pokemon) => Pokemon.type_1 === type));
	});

	const chordMatrix = Array(18)
		.fill()
		.map(() => Array(18).fill(0));
	typeRelations.forEach((typeRelation, index) => {
		typeRelation.forEach((typeR) => {
			if (typeR.type_2) {
				chordMatrix[index][typeR.type_2] += 1;
			}
		});
	});
	return chordMatrix;
};

/**
 * @param {Pokemon[]} data
 */
export const drawChordDiagram = (data, gen, setPrimaryType, primaryType) => {
	/**
	 * N * N chord matrix
	 * Fire - Water - Electric ...
	 */
	const update = (data) => {
		d3.select('#chordDiagram').selectAll('svg').remove();

		const type_matrix = createChordMatrix(data);
		var margin = { left: 90, top: 90, right: 90, bottom: 90 };
		var width = 700 - margin.left - margin.right; // more flexibility: Math.min(window.innerWidth, 1000)
		var height = 350 - margin.top - margin.bottom; // same: Math.min(window.innerWidth, 1000)
		var innerRadius = 450 * 0.35;
		var outerRadius = innerRadius * 1.1;
		var clicked = false;

		var arc = d3
			.arc()
			.innerRadius(innerRadius * 1.01)
			.outerRadius(outerRadius);

		var svg = d3
			.select('#chordDiagram')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');

		// give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
		var res = d3.chord().sortSubgroups(d3.descending)(type_matrix);

		// add the groups on the outer part of the circle
		svg.datum(res)
			.append('g')
			.selectAll('g')
			.data(function (d) {
				return d.groups;
			})
			.enter()
			.append('g')
			.append('path')
			.style('fill', function (d, i) {
				return type_color_scheme[i];
			})
			.style('stroke', 'black')
			.attr('d', arc);

		// Add the links between groups
		svg.datum(res)
			.append('g')
			.selectAll('path')
			.data(function (d) {
				return d;
			})
			.enter()
			.append('path')
			.attr('class', 'chord')
			.attr('d', d3.ribbon().radius(innerRadius))
			.style('fill', function (d) {
				return type_color_scheme[d.source.index];
			}) // colors depend on the source group. Change to target otherwise.
			.style('stroke', 'black');

		var outerArcs = svg
			.selectAll('g.group')
			.data(function (chords) {
				return chords.groups;
			})
			.enter()
			.append('g')
			.attr('class', 'group')
			.on('mouseover', fade())
			.on('mouseout', fade())
			.on('click', (d, i) => {
				if (primaryType === i) {
					setPrimaryType(undefined);
				} else {
					setPrimaryType(i);
				}
			});

		outerArcs
			.append('path')
			.style('fill', function (d) {
				return type_color_scheme[d.index];
			})
			.attr('id', function (d, i) {
				return 'group' + d.index;
			})
			.attr('d', arc);

		// Legend
		// Add one dot in the legend for each name.
		svg.selectAll('mydots')
			.data(type_names.filter((type, i) => i >= 9))
			.enter()
			.append('circle')
			.attr('id', (d, i) => i)
			.attr('cx', 220)
			.attr('cy', function (d, index) {
				return -110 + index * 25;
			}) // 100 is where the first dot appears. 25 is the distance between dots
			.attr('r', 7)
			.style('fill', function (d, index) {
				return type_color_scheme[index + 9];
			})
			.on('mouseover', fadeSecond())
			.on('mouseout', fadeSecond())
			.on('click', (d, i) => {
				if (primaryType === i) {
					setPrimaryType(undefined);
				} else {
					setPrimaryType(i + 9);
				}
			});

		// Add one dot in the legend for each name.
		svg.selectAll('mylabels')
			.data(type_names.filter((type, i) => i >= 9))
			.enter()
			.append('text')
			.attr('class', 'chordLabelText')
			.attr('x', 240)
			.attr('y', function (d, i) {
				return -110 + i * 25;
			}) // 100 is where the first dot appears. 25 is the distance between dots
			.style('fill', function (d, index) {
				return type_color_scheme[index + 9];
			})
			.text(function (d, index) {
				return d;
			})
			.attr('text-anchor', 'left')
			.style('alignment-baseline', 'middle')
			.on('mouseover', fadeSecond())
			.on('mouseout', fadeSecond())
			.on('click', (d, i) => {
				if (primaryType === i) {
					setPrimaryType(undefined);
				} else {
					setPrimaryType(i + 9);
				}
			});

		// Legend
		// Add one dot in the legend for each name.
		svg.selectAll('mydots')
			.data(type_names.filter((type, i) => i < 9))
			.enter()
			.append('circle')
			.attr('id', (d, i) => i)
			.attr('cx', -300)
			.attr('cy', function (d, index) {
				return -110 + index * 25;
			}) // 100 is where the first dot appears. 25 is the distance between dots
			.attr('r', 7)
			.style('fill', function (d, index) {
				return type_color_scheme[index];
			})
			.on('mouseover', fade())
			.on('mouseout', fade())
			.on('click', (d, i) => {
				if (primaryType === i) {
					setPrimaryType(undefined);
				} else {
					setPrimaryType(i);
				}
			});

		// Add one dot in the legend for each name.
		svg.selectAll('mylabels')
			.data(type_names.filter((type, i) => i < 9))
			.enter()
			.append('text')
			.attr('class', 'chordLabelText')
			.attr('x', -280)
			.attr('y', function (d, i) {
				return -110 + i * 25;
			}) // 100 is where the first dot appears. 25 is the distance between dots
			.style('fill', function (d, index) {
				return type_color_scheme[index];
			})
			.text(function (d, index) {
				return d;
			})
			.attr('text-anchor', 'left')
			.style('alignment-baseline', 'middle')
			.on('mouseover', fade())
			.on('mouseout', fade())
			.on('click', (d, i) => {
				if (primaryType === i) {
					setPrimaryType(undefined);
				} else {
					setPrimaryType(i);
				}
			});

		//Returns an event handler for fading a given chord group.
		function fade() {
			return function (d, i) {
				svg.selectAll('path.chord')
					.filter(function (d) {
						return d.source.index !== i && d.target.index !== i;
					})
					.transition(50)
					.style('opacity', clicked ? 1 : 0.1);
				clicked = !clicked;
			};
		} //fade

		//Returns an event handler for fading a given chord group.
		function fadeSecond() {
			return function (d, i) {
				svg.selectAll('path.chord')
					.filter(function (d) {
						return d.source.index !== i+9 && d.target.index !== i+9;
					})
					.transition(50)
					.style('opacity', clicked ? 1 : 0.1);
				clicked = !clicked;
			};
		} //fade
	};
	if (gen !== undefined) {
		update(data.filter((Pokemon) => Pokemon.generation === gen));
	} else {
		update(data);
	}
};
