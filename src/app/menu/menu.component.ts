import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	public currentUser = {
		img: '/assets/eryk.jpg',
		name: 'Eryk Zimończyk',
	};
	public disableMenu: boolean;
	public open: boolean = false;
	public overlayClose: boolean = true;

	constructor(
		private activatedRouter: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.router.events.subscribe(data => {
			if (data instanceof ActivationEnd) {
				console.log(data);
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
