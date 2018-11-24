import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
	{
		path: '',
		component: SplashComponent,
	},
	{
		path: 'map',
		component: MapComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
