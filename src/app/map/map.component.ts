import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	map: Map

	center = [21.003, 52.291];
	bounds = [
		[14.166667, 49.0], // Southwest coordinates
		[24.15, 54.83555569], // Northeast coordinates
	];
	zoom = 12;

	betsUrl = 'https://srotto.herokuapp.com/bets';

	progress;
	geoBets:FeatureCollection = {
		type: 'FeatureCollection',
		features: []
	}

	constructor(
		private http: HttpClient
	) {}
	/* tslint:disable:name */
	async ngOnInit() {
		const data:any = await this.http.get(this.betsUrl).toPromise();
		this.geoBets.features = data.bets.map(bet => {
			const { lat, lon } = bet.position;
			return {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [lon, lat],
				rangeFactor: bet.rangeFactor
			}

		}})
		this.progress = data.progress;
		console.log(data, this.geoBets)
	}

	makeBet() {
		if (this.map){
			console.log(this.map.getCenter())
		}
	}

	onMapLoad($event) {
		this.map = $event;
		console.log(this.map);
		this.map.addSource('bets',
		{
			type: 'geojson',
			data: this.geoBets,
			cluster: true,
			clusterMaxZoom: 12
		});

		this.map.addLayer({
			id: "clusters",
			type: "circle",
			source: "bets",
			filter: ["has", "point_count"],
			paint: {
				"circle-color": [
					"step",
					["get", "point_count"],
					"#51bbd6",
					100,
					"#f1f075",
					750,
					"#f28cb1"
				],
				"circle-radius": [
					"step",
					["get", "point_count"],
					20,
					100,
					30,
					750,
					40
				]
			}
		});

		this.map.addLayer({
			id: "cluster-count",
			type: "symbol",
			source: "bets",
			filter: ["has", "point_count"],
			layout: {
				"text-field": "{point_count_abbreviated}",
				"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
				"text-size": 12
			}
		});

		this.map.addLayer({
			id: "unclustered-point",
			type: "circle",
			source: "bets",
			filter: ["!", ["has", "point_count"]],
			paint: {
				"circle-color": "#11b4da",
				"circle-radius": 4,
				"circle-stroke-width": 1,
				"circle-stroke-color": "#fff"
			}
		});
	}
}