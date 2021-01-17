import './App.css';
import { useEffect } from 'react';
import * as d3 from 'd3';
import data from './Pokemon.csv';
import { drawBarplot } from './barplot'
import { drawDonutChart } from './donutChart'
/**
 * Normal Type: A8A77A 0
Fire Type:  EE8130 1 
Water Type:  6390F0 2
Electric Type:  F7D02C 3
Grass Type:  7AC74C 4
Ice Type:  96D9D6 5 
Fighting Type:  C22E28 6
Poison Type:  A33EA1 7 
Ground Type:  E2BF65 8
Flying Type:  A98FF3 9
Psychic Type:  F95587 10
Bug Type:  A6B91A 11 
Rock Type:  B6A136 12
Ghost Type:  735797 13
Dragon Type:  6F35FC 14
Dark Type:  705746 15
Steel Type:  B7B7CE 16
Fairy Type:  D685AD 17
 */

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
		console.log(unique);
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
			console.log(data);
			drawDonutChart(data);
			drawBarplot(data);
		});
	}, []);

	return (
		<div className="App">
			<div id="barChart"></div>
			<div id="pieChart"></div>
		</div>
	);
};
