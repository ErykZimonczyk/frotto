import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { BetBuyComponent } from './bet-buy/bet-buy.component';
import { BetConfirmationComponent } from './bet-confirmation/bet-confirmation.component';
import {
	trigger,
	animate,
	style,
	group,
	animateChild,
	query,
	stagger,
	transition,
} from '@angular/animations';

const routes: Routes = [
	{
		path: '',
		component: MapComponent,
		data: { state: 'map' },
	},
	{
		path: 'bet',
		component: BetBuyComponent,
		data: { state: 'bet' },
	},
	{
		path: 'bet/confirm',
		component: BetConfirmationComponent,
		data: { state: 'confirm' },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

export const routerTransition = trigger('routerTransition', [
	transition('* => map', [
		/* order */
		/* 1 */ query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		/* 2 */ group([
			// block executes in parallel
			query(
				':enter',
				[
					style({ transform: 'translateX(-100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(100%)' })
					),
				],
				{ optional: true }
			),
		]),
	]),
	transition('* <=> *', [
		/* order */
		/* 1 */ query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		/* 2 */ group([
			// block executes in parallel
			query(
				':enter',
				[
					style({ transform: 'translateX(100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' })
					),
				],
				{ optional: true }
			),
		]),
	]),
]);
