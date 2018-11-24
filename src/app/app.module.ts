import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { BetsHistoryComponent } from './bets-history/bets-history.component';
import { BetsCurrentComponent } from './bets-current/bets-current.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BetBuyComponent } from './bet-buy/bet-buy.component';
import { HttpClientModule } from '@angular/common/http';
import { BetConfirmationComponent } from './bet-confirmation/bet-confirmation.component';

@NgModule({
	declarations: [
		AppComponent,
		SplashComponent,
		MapComponent,
		MenuComponent,
		ProfileComponent,
		BetsHistoryComponent,
		BetsCurrentComponent,
		BetBuyComponent,
		BetConfirmationComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgxMapboxGLModule.withConfig({
			accessToken:
				'pk.eyJ1Ijoia2FtaWw2NjYiLCJhIjoiY2pvdmZlcWx1MWlrMzNvczBndzZvdXlmYiJ9.B0Vkyr5JnArEy0fyHTqVsg',
		}),
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [
		SplashComponent,
		MapComponent,
		MenuComponent,
		ProfileComponent,
		BetsHistoryComponent,
		BetsCurrentComponent,
		BetBuyComponent,
	],
})
export class AppModule {}

enableProdMode();
