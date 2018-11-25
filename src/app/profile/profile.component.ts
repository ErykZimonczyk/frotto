import { Component, OnInit, Inject } from '@angular/core';
import { BetStoreService } from '../bet-store.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	public currentUser: any;
	constructor(
		@Inject(BetStoreService) private betStoreService: BetStoreService
	) {
		this.currentUser = this.betStoreService.getCurrentUser();
	}

	ngOnInit() {}
}
