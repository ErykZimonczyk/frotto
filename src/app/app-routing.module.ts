import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { BetBuyComponent } from './bet-buy/bet-buy.component';

const routes: Routes = [
	{
		path: '',
		component: MapComponent,
	},
	{
		path: 'bet',
		component: BetBuyComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
