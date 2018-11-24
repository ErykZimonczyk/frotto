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
	public paid: boolean;
	public loading: boolean = true;
	public betTypes = {
		0: 'Geo',
		1: 'Geo+',
	};
	public maxPrize = {
		0: 2000,
		1: 200000,
	};
	public cost = {
		0: 2,
		1: 4,
	};

	public paymentOption = 0;

	public paymentOptionText = {
		0: 'karta płatnicza',
		1: 'Blik',
		2: 'PayPal',
		3: 'witrualny portfel',
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

	public pay() {
		this.paid = true;

		setTimeout(() => {
			this.loading = false;
		}, 1500);

		this.betStoreService.clearBet();
	}
}
