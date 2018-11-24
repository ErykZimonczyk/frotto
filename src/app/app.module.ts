import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { BetsHistoryComponent } from './bets-history/bets-history.component';
import { BetsCurrentComponent } from './bets-current/bets-current.component';
import { BetComponent } from './bet/bet.component';

@NgModule({
	declarations: [
		AppComponent,
		SplashComponent,
		MapComponent,
		MenuComponent,
		ProfileComponent,
		BetsHistoryComponent,
		BetsCurrentComponent,
		BetComponent,
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
	exports: [
		SplashComponent,
		MapComponent,
		MenuComponent,
		ProfileComponent,
		BetsHistoryComponent,
		BetsCurrentComponent,
		BetComponent,
	],
})
export class AppModule {}
