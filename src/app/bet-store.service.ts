import { Injectable } from '@angular/core';
import { Bet } from './bet.entity';

@Injectable({
	providedIn: 'root',
})
export class BetStoreService {
	public currentBet: Bet;

	constructor() {}

	public setCurrentBet(bet: Bet) {
		this.currentBet = bet;
	}

	public getCurrentBet(): Bet {
		return new Bet(21.1, 40, 0.89, 1);
		// return this.currentBet;
	}

	public clearBet(): void {
		this.currentBet = null;
	}
}
