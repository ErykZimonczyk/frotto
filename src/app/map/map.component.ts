import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Map } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import { BetStoreService } from '../bet-store.service';
import { Bet } from '../bet.entity';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	public back: boolean;

	map: Map;

	center = [21.003, 52.291];
	bounds = [
		[14.166667, 49.0], // Southwest coordinates
		[24.15, 54.83555569], // Northeast coordinates
	];
	zoom = 10;

	betsUrl = 'https://srotto.herokuapp.com/bets';

	progress;
	geoBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
	};
	bet: Bet;

	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		@Inject(BetStoreService) private betStoreService: BetStoreService

	) {}
	/* tslint:disable:name */
	ngOnInit() {
		this.getData = this.getData.bind(this);
		this.updateData = this.updateData.bind(this);
		this.activatedRoute.queryParams.subscribe(params => {
			this.back = params['back'];
		});
		this.bet = this.betStoreService.getCurrentBet() || new Bet(
			this.center[0],
			this.center[1],
			1,
			0,
			0);
		this.getData();
		setInterval(this.updateData, 1000);

	}

	makeBet() {
		if (this.map) {
			this.bet.position = this.map.getCenter();
			this.betStoreService.setCurrentBet(this.bet);
			this.router.navigate(['/bet']);
		}
	}

	async getData(){
		const data: any = await this.http.get(this.betsUrl).toPromise();
		this.geoBets.features = data.bets.map(bet => {
			const { lat, lon } = bet.position;
			return {
			type: 'Feature',
			geometry: {
				type: 'circle',
				coordinates: [lon, lat],
			},
			properties: {
				rangeFactor: bet.rangeFactor
			}

		}})
		this.progress = data.progress;
	}

	updateData(){
		if (this.map) {
			this.getData();
			this.map.getSource('bets').setData(this.geoBets);
		}
	}

	onMapLoad($event) {
		this.map = $event;
		this.map.addSource('bets', {
			type: 'geojson',
			data: this.geoBets,
			cluster: true,
			clusterMaxZoom: 12,
		});

		this.map.addLayer({
			id: 'clusters',
			type: 'circle',
			source: 'bets',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': [
					'step',
					['get', 'point_count'],
					'#f7c162',
					100,
					'#D13B42',
					750,
					'#483694',
				],
				'circle-radius': [
					'step',
					['get', 'point_count'],
					20,
					100,
					30,
					750,
					40,
				],
			},
		});

		this.map.addLayer({
			id: 'cluster-count',
			type: 'symbol',
			source: 'bets',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12,
			},
		});

		this.map.addLayer({
			id: 'unclustered-point',
			type: 'circle',
			source: 'bets',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#f7c162',
				'circle-radius': ['get', 'rangeFactor'],
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff',
				'circle-opacity': 0.5,
			},
		});
	}
}
