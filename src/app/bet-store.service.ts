import { Injectable } from '@angular/core';
import { Bet } from './bet.entity';

@Injectable({
	providedIn: 'root',
})
export class BetStoreService {
	public currentBet: Bet;
	public userId: string;

	constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.userId = urlParams.get('userId') || '1';
  }

	public setCurrentBet(bet: Bet) {
		this.currentBet = bet;
	}

	public getCurrentBet(): Bet {
		return this.currentBet;
	}

  public getUserId(): string {
    return this.userId;
  }

	public clearBet(): void {
		this.currentBet = null;
	}
}
