import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Map, GeoJSONSource } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import { Bet } from '../bet.entity';
import { BetStoreService } from '../bet-store.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  public back: boolean;
	public refId: string;
	public interval: any;
	public interval_factor: any;
	public interval_location: any;

	map: Map;
	center = [21.003, 52.291];
	bounds = [
		[14.166667, 49.0], // Southwest coordinates
		[24.15, 54.83555569], // Northeast coordinates
	];
  zoom = 10;
  area = 0;

	betsUrl = 'https://lotto-geo.herokuapp.com/bets';
	userBetsUrl = 'https://lotto-geo.herokuapp.com/account?userId=';

  userId;

	winningRegionalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
	};
	winningGlobalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
	};
	userWinningRegionalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
  };
	userWinningGlobalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
  };
  userArchiveRegionalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
  };
  userArchiveGlobalBets: FeatureCollection = {
		type: 'FeatureCollection',
		features: [],
  };

  winningBets = [this.winningRegionalBets, this.winningGlobalBets]
  userWinningBets = [this.userWinningRegionalBets, this.userWinningGlobalBets]
  userArchiveBets = [this.userArchiveRegionalBets, this.userArchiveGlobalBets]
	bet: Bet;

	constructor(
    private http: HttpClient,
		@Inject(BetStoreService) private betStoreService: BetStoreService
	) {}

	/* tslint:disable:name */
	async ngOnInit() {
    this.getData = this.getData.bind(this);
    this.userId = this.betStoreService.getUserId();
		this.getData();
	}

	async getData() {
    const data: any = await this.http.get(this.betsUrl).toPromise();
    const regional = [];
    const global = [];
    data.results.forEach(bet => {
			const { lat, lon } = bet.position;
			const point = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [lon, lat],
				}
      };
      if (bet.area === 0) {
        regional.push(point);
      } else {
        global.push(point);
      }
      this.winningRegionalBets.features = regional;
      this.winningGlobalBets.features = global;
    });
    // user data
    const userData: any = await this.http.get(this.userBetsUrl + this.userId).toPromise();
    console.log(userData)
    const userWinningRegional = [];
    const userWinningGlobal = [];
    userData.userWins.forEach(bet => {
			const { lat, lon } = bet.position;
			const point = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [lon, lat],
				}
      };
      if (bet.area === 0) {
        userWinningRegional.push(point);
      } else {
        userWinningGlobal.push(point);
      }
      this.userWinningRegionalBets.features = userWinningRegional;
      this.userWinningGlobalBets.features = userWinningGlobal;
    });
    const userArchiveRegional = [];
    const userArchiveGlobal = [];
    userData.userArchiveBets.forEach(bet => {
			const { lat, lon } = bet.position;
			const point = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [lon, lat],
				}
      };
      if (bet.area === 0) {
        userArchiveRegional.push(point);
      } else {
        userArchiveGlobal.push(point);
      }
      this.userArchiveRegionalBets.features = userArchiveRegional;
      this.userArchiveGlobalBets.features = userArchiveGlobal;
		});
  }

	getChosenClass(area) {
		return this.area === area ? 'chosen' : '';
	}

	chooseArea(area) {
    this.area = area;
    (this.map.getSource('winningBets') as GeoJSONSource).setData(this.winningBets[this.area]);
	}

	onMapLoad($event) {
    this.map = $event;
		this.map.addSource('winningBets', {
			type: 'geojson',
			data: this.winningBets[this.area]
		});

		// this.map.addSource('userBets', {
		// 	type: 'geojson',
		// 	data: this.userBets,
		// 	cluster: true,
		// 	clusterMaxZoom: 12,
		// });

		this.map.addLayer({
			id: 'unclustered-point',
			type: 'circle',
			source: 'winningBets',
			paint: {
				'circle-color': '#D13B42',
				'circle-radius': 5,
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff',
				'circle-opacity': 0.5,
			},
		});

		// this.map.addLayer({
		// 	id: 'user-points',
		// 	type: 'circle',
		// 	source: 'userBets',
		// 	filter: ['!', ['has', 'point_count']],
		// 	paint: {
		// 		'circle-color': '#27ae60',
		// 		'circle-radius': ['get', 'rangeFactor'],
		// 		'circle-stroke-width': 1,
		// 		'circle-stroke-color': '#fff',
		// 		'circle-opacity': 0.5,
		// 	},
		// });
	}
}
