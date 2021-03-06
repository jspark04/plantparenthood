import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DevicesPage } from '../pages/devices/devices'
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { PopOverAlert } from '../pages/popoveralert/popoveralert';
import { PlantsPage } from '../pages/plants/plants';
import { SettingsPage } from '../pages/settings/settings';
import {PlantDetailPage} from "../pages/plantdetail/plantdetail";
import { PlantDetailModalPage } from "../pages/plant-detail-modal-page/plant-detail-modal-page";

import { Api } from '../providers/api';
import { ProgressBar } from '../components/progress-bar/progress-bar';
import { MainHeader } from '../components/main-header/main-header';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  HomePage,
  ListPage,
  TabsPage,
  PopOverAlert,
  PlantsPage,
  DevicesPage,
  PlantDetailPage,
  ProgressBar,
  MainHeader,
  PlantDetailModalPage,
  SettingsPage
];

export function providers() {
  return [
    StatusBar,
    SplashScreen,
    Api,
    // { provide: Settings, useFactory: provideSettings, deps: [ Storage ] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
