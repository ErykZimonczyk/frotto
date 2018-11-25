import { Component } from '@angular/core';
import { routerTransition } from './app-routing.module';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	animations: [routerTransition],
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'geo Lotto';
	getState(outlet) {
		return outlet.activatedRouteData.state;
	}
}
