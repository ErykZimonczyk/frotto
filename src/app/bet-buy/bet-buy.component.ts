import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BetStoreService } from '../bet-store.service';
import { Bet } from '../bet.entity';
import { HttpClient } from '@angular/common/http';

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
		0: 50,
		1: 2000,
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
		private router: Router,
		private http: HttpClient
	) {}

	ngOnInit() {
		this.bet = this.betStoreService.getCurrentBet();

		if (!this.bet) {
			this.router.navigate(['']);
		}
	}

	public back(): void {
		this.router.navigate([''], {
			queryParams: {
				back: true,
			},
		});
	}

	public async pay() {
		this.paid = true;

		const data: any = await this.http
			.post(
				'https://lotto-geo.herokuapp.com/bet',
				this.bet.mapToApi(this.betStoreService.getUserId())
			)
			.toPromise();

		setTimeout(() => {
			this.router.navigate(['bet/confirm'], {
				queryParams: {
					refId: data.bet.id,
				},
			});
		}, 1500);

		this.betStoreService.clearBet();
	}
}
