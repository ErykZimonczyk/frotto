import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Map, GeoJSONSource } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import { getDistance } from 'geolib';
import { BetStoreService } from '../bet-store.service';
import { Bet } from '../bet.entity';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
	public back: boolean;
	public refId: string;
	public interval: any;
	public interval_factor: any;
	public interval_location: any;

	map: Map;
	distanceFactor: number = 100;
	center = [21.003, 52.291];
	bounds = [
		[14.166667, 49.0], // Southwest coordinates
		[24.15, 54.83555569], // Northeast coordinates
	];
	zoom = 10;

	betsUrl = 'https://lotto-geo.herokuapp.com/bets';

	progress;
	geoBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
	};
	userBets: FeatureCollection = {
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
	async ngOnInit() {
		this.getData = this.getData.bind(this);
		this.updateData = this.updateData.bind(this);
		this.activatedRoute.queryParams.subscribe(params => {
			this.back = params['back'];
			this.refId = params['refId'];
		});
		this.bet =
			this.betStoreService.getCurrentBet() ||
			new Bet(this.center[0], this.center[1], 1, 0, 0);

		if (this.refId) {
			this.bet.friendBetId = this.refId;
		}
		this.getData();
		this.interval = setInterval(this.updateData, 10000);
	}

	notifyMe(prize) {
		if (Notification.permission === 'granted') {
			new Notification('GeoLotto', {
				icon:
					'http://geo-lotto.s3-website-eu-west-1.amazonaws.com/assets/apple-icon-57x57.png',
				body: `Wygrałeś w jednym z Twoich zakładów: ${prize} zł`,
			});
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function(permission) {
				if (permission === 'granted') {
					new Notification('GeoLotto', {
						icon:
							'http://geo-lotto.s3-website-eu-west-1.amazonaws.com/assets/apple-icon-57x57.png',
						body: `Wygrałeś w jednym z Twoich zakładów: ${prize} zł`,
					});
				}
			});
		}
	}

	clickCenterMap() {
		this.map.flyTo({
			center: [21.003, 52.291],
			zoom: 10,
		});
	}

	makeBet() {
		if (this.map) {
			this.bet.position = this.map.getCenter();
			this.betStoreService.setCurrentBet(this.bet);
			this.router.navigate(['/bet']);
		}
	}

	async getData() {
		const data: any = await this.http.get(this.betsUrl).toPromise();
		const userPoints = [];
		const geoPoints = [];

		//get results
		const lastResult = localStorage.getItem('lastResult');
		if (data.results.length && data.results[data.results.length - 1]) {
			const result = data.results[data.results.length - 1];
			if (result.id !== lastResult) {
				let wins = 0;
				result.winners.forEach(winner => {
					if (winner.userId === this.betStoreService.getUserId()) {
						wins = wins + winner.prize;
					}
					localStorage.setItem('lastResult', result.id);
				});
        if (wins) {
          this.notifyMe(wins);
        }
			}
		}

		data.bets.forEach(bet => {
			const { lat, lon } = bet.position;
			const point = {
				type: 'Feature',
				geometry: {
					type: 'circle',
					coordinates: [lon, lat],
				},
				properties: {
					rangeFactor: bet.rangeFactor,
				},
			};
			if (bet.userId === 1) {
				userPoints.push(point);
			} else {
				geoPoints.push(point);
			}
		});
		this.geoBets.features = geoPoints;
		this.userBets.features = userPoints;
		this.progress = data.progress;
	}
	getChosenClass(area) {
		return this.bet.area === area ? 'chosen' : '';
	}

	chooseArea(area) {
		this.bet.area = area;
	}

	getStyle(area) {
		return { height: '50%' };
	}

	updateData() {
		if (this.map) {
			this.getData();

			(this.map.getSource('bets') as GeoJSONSource).setData(this.geoBets);
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

		this.map.addSource('userBets', {
			type: 'geojson',
			data: this.userBets,
			cluster: true,
			clusterMaxZoom: 12,
		});

		this.map.addSource('current', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'Point',
							coordinates: [21.003, 52.291],
						},
					},
				],
			},
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

		this.map.addLayer({
			id: 'user-points',
			type: 'circle',
			source: 'userBets',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#27ae60',
				'circle-radius': ['get', 'rangeFactor'],
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff',
				'circle-opacity': 0.5,
			},
		});

		this.map.addLayer({
			id: 'current-point',
			type: 'circle',
			source: 'current',
			paint: {
				'circle-color': '#27ae60',
				'circle-radius': ['get', 'rangeFactor'],
				'circle-stroke-width': 1,
				'circle-stroke-color': '#2ecc71',
				'circle-opacity': 0.8,
			},
		});

		let radius = [6, 7, 8, 9, 10, 11, 10, 9, 8, 7];
		let radCount = 0;
		this.interval_location = setInterval(() => {
			this.map.setPaintProperty(
				'current-point',
				'circle-radius',
				radius[radCount]
			);
			radCount = ++radCount % radius.length;
		}, 70);

		this.interval_factor = setInterval(() => {
			const position = this.map.getCenter();
			const distance = getDistance(
				{ latitude: position.lat, longitude: position.lng },
				{ latitude: 52.291, longitude: 21.003 }
			);
			const modifier = Math.round(((300 - distance / 1000) / 300) * 100);
			this.distanceFactor = modifier < 0 ? 0 : modifier;
			this.bet.distanceFactor = this.distanceFactor;
		}, 150);
	}

	ngOnDestroy() {
		clearInterval(this.interval);
		clearInterval(this.interval_factor);
		clearInterval(this.interval_location);
	}
}
