import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Map } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import { getDistance } from 'geolib';
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
  distanceFactor: number;
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
    @Inject(BetStoreService) private betStoreService: BetStoreService,
  ) {
  }

  /* tslint:disable:name */
  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.back = params['back'];
    });
    this.bet = this.betStoreService.getCurrentBet() || new Bet(
      this.center[0],
      this.center[1],
      1,
      0,
      0);
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
          rangeFactor: bet.rangeFactor,
        },

      };
    });
    this.progress = data.progress;
  }

  clickCenterMap() {
    this.map.flyTo({
      center: [21.003, 52.291],
    });
  }

  makeBet() {
    if (this.map) {
      this.bet.position = this.map.getCenter();
      this.betStoreService.setCurrentBet(this.bet);
      this.router.navigate(['/bet']);
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

    this.map.addSource('current', {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [21.003, 52.291],
          },
        }],
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
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1',
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
      id: 'current-point',
      type: 'circle',
      source: 'current',
      paint: {
        'circle-color': '#f7c162',
        'circle-radius': ['get', 'rangeFactor'],
        'circle-stroke-width': 1,
        'circle-stroke-color': '#4f4d4b',
        'circle-opacity': 0.8,
      },
    });

    let radius = [6, 7, 8, 9, 10, 11, 10, 9, 8, 7];
    let radCount = 0;
    setInterval(() => {
      this.map.setPaintProperty('current-point', 'circle-radius', radius[radCount]);
      radCount = ++radCount % radius.length;
    }, 70);

    setInterval(() => {
      const position = this.map.getCenter();
      const distance = getDistance(
        { latitude: position.lat, longitude: position.lng },
        { latitude: 52.291, longitude: 21.003 },
      );
      const modifier = Math.round((300 - distance / 1000) / 300 * 100);
      this.distanceFactor = modifier < 0 ? 0 : modifier;
      this.bet.distanceFactor = this.distanceFactor;
    }, 150);
  }
}
