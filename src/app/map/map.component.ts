import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	constructor() {}
	/* tslint:disable:name */
	ngOnInit() {
		// const bounds = [
		// 	[14.166667, 49.0], // Southwest coordinates
		// 	[24.15, 54.83555569], // Northeast coordinates
		// ];
		// const map = new mapboxgl.Map({
		// 	container: 'map',
		// 	style: 'mapbox://styles/mapbox/light-v9',
		// 	center: [21.003, 52.291],
		// 	zoom: 12,
		// 	maxBounds: bounds,
		// });
		// // disable map rotation using right click + drag
		// map.dragRotate.disable();
		// // disable map rotation using touch rotation gesture
		// map.touchZoomRotate.disableRotation();
	}
}
