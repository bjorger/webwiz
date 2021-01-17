import * as d3 from 'd3';

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
export const drawChordDiagram = (data) => {
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

	/**
	 * N * N chord matrix
	 * Fire - Water - Electric ...
	 */
	const type_matrix = createChordMatrix(data);
	console.log(type_matrix);
	var margin = { left: 90, top: 90, right: 90, bottom: 90 };
	var width = 1000 - margin.left - margin.right; // more flexibility: Math.min(window.innerWidth, 1000)
	var height = 700 - margin.top - margin.bottom; // same: Math.min(window.innerWidth, 1000)
	var innerRadius = Math.max(width, height) * 0.3;
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
		.on('mouseout', fade());

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
		.data(type_names)
		.enter()
		.append('circle')
		.attr('cx', 320)
		.attr('cy', function (d, i) {
			return -230 + i * 25;
		}) // 100 is where the first dot appears. 25 is the distance between dots
		.attr('r', 7)
		.style('fill', function (d, index) {
			return type_color_scheme[index];
		})
		.on('mouseover', fade())
		.on('mouseout', fade());

	// Add one dot in the legend for each name.
	svg.selectAll('mylabels')
		.data(type_names)
		.enter()
		.append('text')
		.attr('x', 340)
		.attr('y', function (d, i) {
			return -230 + i * 25;
		}) // 100 is where the first dot appears. 25 is the distance between dots
		.style('fill', function (d, index) {
			return type_color_scheme[index];
		})
		.text(function (d) {
			return d;
		})
		.attr('text-anchor', 'left')
		.style('alignment-baseline', 'middle')
		.on('mouseover', fade())
		.on('mouseout', fade());

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
};