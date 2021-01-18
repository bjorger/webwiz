import './App.css';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from './Pokemon.csv';
import { drawBarplot } from './barplot';
import { drawDonutChart } from './donutChart';
import { drawChordDiagram } from './chordDiagram';
import { drawBubbleplot } from './bubblePlot';
import logo from './pokemon.png';
import charizard from './charizard.png';

export const App = () => {
	const [gen, setGen] = useState();
	const [primaryType, setPrimaryType] = useState();

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
			drawDonutChart(data, setGen, gen, primaryType);
			drawBarplot(data, gen, primaryType);
			drawChordDiagram(data, gen, setPrimaryType, primaryType);
			drawBubbleplot(data, gen);
		});
	}, [gen, setGen, primaryType, setPrimaryType]);

	return (
		<div className="App">
			<div className="header">
				<img src={logo} style={{ width: '250px', padding: '10px' }} alt="pokemonLogo" />
			</div>
			<div className="mid">
				<div className="dashboardCard">
					<div className="dashboardCardTitle">Distribution of Pokemon by Type</div>
					<div id="barChart"></div>
				</div>
				<div className="dashboardCard">
					<div className="dashboardCardTitle">Distribution of Pokemon added in each Generation</div>
					<div id="pieChart" style={{ paddingTop: '20px' }}></div>
				</div>
			</div>
			<div className="mid">
				<div className="dashboardCard" style={{ padding: '0 40px' }}>
					<div className="dashboardCardTitle">Strength of Legendary Pokemon rated by HP, Atk, Def</div>
					<div id="bubblePlot" style={{ paddingTop: '40px' }}></div>
				</div>
				<div className="dashboardCard" style={{ width: '850px' }}>
					<div className="dashboardCardTitle">Link between Primary and Secondary Type</div>
					<div id="chordDiagram"></div>
				</div>
			</div>
			<div className="charizard">
				<img src={charizard} alt="charizard" />
			</div>
		</div>
	);
};
