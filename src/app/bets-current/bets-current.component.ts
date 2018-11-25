import { Component, OnInit, Inject } from '@angular/core';
import { BetStoreService } from '../bet-store.service';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../bet.entity';

@Component({
	selector: 'app-bets-current',
	templateUrl: './bets-current.component.html',
	styleUrls: ['./bets-current.component.scss'],
})
export class BetsCurrentComponent implements OnInit {
	public maxPrize = {
		0: 5000,
		1: 200000,
	};
	public bets: Array<Bet> = [];
	public currentUser: any;
	public betTypes = {
		0: 'Geo',
		1: 'Geo+',
	};

	public betsUrl = 'https://lotto-geo.herokuapp.com/account';

	constructor(
		@Inject(BetStoreService) private betStoreService: BetStoreService,
		private http: HttpClient
	) {
		this.currentUser = this.betStoreService.getCurrentUser();
	}

	async ngOnInit() {
		const userData: any = await this.http
			.get(this.betsUrl, { params: { userId: this.currentUser.id } })
			.toPromise();

		userData.userCurrentBets.forEach(bet => {
			this.bets.push(
				new Bet(
					bet.position.lat,
					bet.position.lon,
					bet.distanceFactor,
					bet.area,
					0
				)
			);
		});
	}
}
