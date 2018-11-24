import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-payment-popup',
	templateUrl: './payment-popup.component.html',
	styleUrls: ['./payment-popup.component.scss'],
})
export class PaymentPopupComponent implements OnInit {
	@Input('show') public show: boolean;

	constructor() {}

	ngOnInit() {}
}
