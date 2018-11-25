import { Component, OnInit, Inject } from '@angular/core';
import { BetStoreService } from '../bet-store.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	public currentUser: any;
	public totalWinAmount: any = 0;
	public balance: any = 0;
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

		userData.userWins.forEach(bet => {
			this.totalWinAmount += bet.prize;
		});

		this.balance = userData.user.balance;
	}
}
