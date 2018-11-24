import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	public back: boolean;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	/* tslint:disable:name */
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.back = params['back'];
		});
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

	public buy() {
		this.router.navigate(['/bet']);
	}
}
