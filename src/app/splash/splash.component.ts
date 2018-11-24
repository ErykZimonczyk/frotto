import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-splash',
	templateUrl: './splash.component.html',
	styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
	public hide: boolean = false;
	public remove: boolean = false;

	constructor() {}

	ngOnInit() {
		setTimeout(() => {
			this.hide = true;
		}, 2000);

		setTimeout(() => {
			this.remove = true;
		}, 2500);
	}
}
