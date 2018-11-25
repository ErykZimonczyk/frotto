import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-bet-confirmation',
	templateUrl: './bet-confirmation.component.html',
	styleUrls: ['./bet-confirmation.component.scss'],
})
export class BetConfirmationComponent implements OnInit {
	public refId: string;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.refId = params['refId'];
		});
	}

	public copy() {
		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = `http://${window.location.host}/?refId=${this.refId}`;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	public back(): void {
		this.router.navigate([''], {
			queryParams: {
				back: true,
			},
		});
	}
}
