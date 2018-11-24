import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BetStoreService } from '../bet-store.service';
import { Bet } from '../bet.entity';

@Component({
	selector: 'app-bet-buy',
	templateUrl: './bet-buy.component.html',
	styleUrls: ['./bet-buy.component.scss'],
})
export class BetBuyComponent implements OnInit {
	public bet: Bet;
	public betTypes = {
		0: 'Geo',
		1: 'GeoPlus',
	};
	public maxPrize = {
		0: 2000,
		1: 200000,
	};

	public constructor(
		@Inject(BetStoreService) private betStoreService: BetStoreService,
		private router: Router
	) {}

	ngOnInit() {
		this.bet = this.betStoreService.getCurrentBet();
	}

	public back(): void {
		this.router.navigate([''], {
			queryParams: {
				back: true,
			},
		});
	}
}
