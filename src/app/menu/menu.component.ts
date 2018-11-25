import { Component, OnInit, Inject } from '@angular/core';
import {
	ActivatedRoute,
	Router,
	ActivationEnd,
	NavigationStart,
} from '@angular/router';
import { BetStoreService } from '../bet-store.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	public disableMenu: boolean;
	public currentUser: any;
	public open: boolean = false;
	public overlayClose: boolean = true;

	constructor(
		private activatedRouter: ActivatedRoute,
		private router: Router,
		@Inject(BetStoreService) private betStoreService: BetStoreService
	) {
		this.currentUser = this.betStoreService.getCurrentUser();
	}

	ngOnInit() {
		this.router.events.subscribe(data => {
			if (data instanceof ActivationEnd) {
				this.disableMenu = data.snapshot.data.disableMenu;
			}
		});
	}

	toggle() {
		this.open = !this.open;

		if (!this.overlayClose) {
			setTimeout(() => {
				this.overlayClose = !this.overlayClose;
			}, 500);
		} else {
			this.overlayClose = !this.overlayClose;
		}
	}
}
