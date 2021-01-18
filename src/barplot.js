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
export const drawBarplot = (data, gen) => {
	const type_color_scheme = {
		Normal: '#A8A77A',
		Fire: '#EE8130',
		Water: '#6390F0',
		Electric: '#F7D02C',
		Grass: '#7AC74C',
		Ice: '#96D9D6',
		Fighting: '#C22E28',
		Poison: '#A33EA1',
		Ground: '#E2BF65',
		Flying: '#A98FF3',
		Psychic: '#F95587',
		Bug: '#A6B91A',
		Rock: '#B6A136',
		Ghost: '#735797',
		Dragon: '#6F35FC',
		Dark: '#705746',
		Steel: '#B7B7CE',
		Fairy: '#D685AD',
	};

	var margin = { top: 30, right: 30, bottom: 70, left: 60 };
	var width = 920 - margin.left - margin.right;
	var height = 400 - margin.top - margin.bottom;

	var div = d3.select('#barChart').append('div').attr('class', 'tooltip').style('opacity', 0);

	const update = (data) => {
		d3.select('#barChart').selectAll('svg').remove();

		const normal = data.filter((Pokemon) => Pokemon.type_1 === 0);
		const fire = data.filter((Pokemon) => Pokemon.type_1 === 1);
		const water = data.filter((Pokemon) => Pokemon.type_1 === 2);
		const electric = data.filter((Pokemon) => Pokemon.type_1 === 3);
		const grass = data.filter((Pokemon) => Pokemon.type_1 === 4);
		const ice = data.filter((Pokemon) => Pokemon.type_1 === 5);
		const fighting = data.filter((Pokemon) => Pokemon.type_1 === 6);
		const poison = data.filter((Pokemon) => Pokemon.type_1 === 7);
		const ground = data.filter((Pokemon) => Pokemon.type_1 === 8);
		const flying = data.filter((Pokemon) => Pokemon.type_1 === 9);
		const psychic = data.filter((Pokemon) => Pokemon.type_1 === 10);
		const bug = data.filter((Pokemon) => Pokemon.type_1 === 11);
		const rock = data.filter((Pokemon) => Pokemon.type_1 === 12);
		const ghost = data.filter((Pokemon) => Pokemon.type_1 === 13);
		const dragon = data.filter((Pokemon) => Pokemon.type_1 === 14);
		const dark = data.filter((Pokemon) => Pokemon.type_1 === 15);
		const steel = data.filter((Pokemon) => Pokemon.type_1 === 16);
		const fairy = data.filter((Pokemon) => Pokemon.type_1 === 17);

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

		svg
			.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'axisWhite')
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('fill', 'white')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		var y = d3
			.scaleLinear()
			.domain([0, type_distribution[0].amount + 5])
			.range([height, 0]);
		svg
			.append('g')
			.attr('class', 'axisWhite barplotAxis')
			.call(d3.axisLeft(y))
			.selectAll('text')
			.attr('fill', 'white');

		// Bars
		svg
			.selectAll('mybar')
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
			.attr('fill', (d) => type_color_scheme[d.type])
			.on('mouseover', (d) => {
				// add tooltip
				div.transition().duration(200).style('opacity', 1);
				div.html(`${d.amount} Pokemon`)
					.style('left', () => {
						return d3.event.pageX - 40 + 'px';
					})
					.style('top', d3.event.pageY - 40 + 'px');
			});

		svg.selectAll('rect')
			.transition()
			.duration(800)
			.attr('y', (d) => y(d.amount))
			.attr('height', (d) => height - y(d.amount))
			.delay((d, i) => i * 100);
	};
	if (gen !== undefined) {
		update(data.filter((Pokemon) => Pokemon.generation === gen));
	} else {
		update(data);
	}
};
