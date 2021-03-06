import { Injectable } from '@angular/core';
import { Bet } from './bet.entity';

@Injectable({
	providedIn: 'root',
})
export class BetStoreService {
	public currentBet: Bet;
	public userId: string;
	public currentUser: any;
	public users = {
		1: {
			img: '/assets/eryk.jpg',
			name: 'Eryk Zimończyk',
			id: 1,
		},
		2: {
			img: '/assets/maria.jpeg',
			name: 'Maria Ładowna',
			id: 2,
		},
	};

	constructor() {
		const urlParams = new URLSearchParams(window.location.search);
		this.userId = urlParams.get('userId') || '1';
		this.currentUser = this.users[this.userId];
	}

	public setCurrentBet(bet: Bet) {
		this.currentBet = bet;
	}

	public getCurrentBet(): Bet {
		return this.currentBet;
	}

	public getCurrentUser(): Bet {
		return this.currentUser;
	}

	public getUserId(): string {
		return this.userId;
	}

	public clearBet(): void {
		this.currentBet = null;
	}
}
