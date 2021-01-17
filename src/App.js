import './App.css';
import { useEffect } from 'react';
import * as d3 from 'd3';
import data from './Pokemon.csv';
import { drawBarplot } from './barplot';
import { drawDonutChart } from './donutChart';
import { drawChordDiagram } from './chordDiagram';
import { drawBubbleplot } from './drawBubblePlot';

export const App = () => {
	/**
	 * @typedef {Object} Pokemon
	 * @property {String} name
	 * @property {Number} type_1
	 * @property {Number} type_2
	 * @property {Number} total
	 * @property {Number} generation
	 * @property {Number} legendary
	 * @property {Number} defense
	 * @property {Number} attack
	 * @property {Number} hp
	 */

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
			drawBubbleplot(data);
		});
	}, []);

	return (
		<div className="App">
			<div id="barChart"></div>
			<div className="mid">
				<div id="pieChart"></div>
				<div id="bubblePlot"></div>
			</div>

			<div id="chordDiagram"></div>
		</div>
	);
};
