import './App.css';
import { useEffect } from 'react';
import * as d3 from 'd3';
import data from './Pokemon.csv';
import { drawBarplot } from './barplot';
import { drawDonutChart } from './donutChart';
import { drawChordDiagram } from './chordDiagram'

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

	/*
	const calc_median = (input) => {
		const test = [];
		input.forEach((data) => test.push(data.income));
		let unique = [...new Set(test)];
		unique.sort();
		if (unique.length % 2) {
			return unique[Math.floor(unique.length / 2)];
		} else {
			return (unique[Math.floor(unique.length / 2)] + unique[Math.floor(unique.length / 2) - 1]) / 2;
		}
	};*/
	useEffect(() => {
		d3.csv(data, (data) => {
			data.forEach((d) => {
				Object.keys(d).forEach((key) => {
					if (key !== 'name') {
						if (key === 'type_2') {
							if (d[key] !== '') {
								d[key] = +d[key];
							}
						} else {
							d[key] = +d[key];
						}
					}
				});
			});
			drawDonutChart(data);
			drawBarplot(data);
			drawChordDiagram(data);
		});
	}, []);

	return (
		<div className="App">
			<div id="barChart"></div>
			<div id="pieChart"></div>
			<div id="chordDiagram"></div>
		</div>
	);
};
