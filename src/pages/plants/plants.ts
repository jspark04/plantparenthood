import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

import { PlantDetailPage } from '../../pages/plantdetail/plantdetail';

/**
 * Generated class for the Plants page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plants',
  templateUrl: 'plants.html',
})
export class PlantsPage {

  sensordata: SensorModel[];
  plantdata: PlantModel[];

  monitoringPlants: PlantModel[] = [];
  notmonitoringPlants: PlantModel[] = [];
  onPage: boolean;
  filteredSensorData: SensorModel[] = [];
  mostRecentSensorData: SensorModel;

  constructor(public app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {
    //this.monitoringPlants = null;
    //this.notmonitoringPlants = null;

    this.onPage = true;
    this.realTimeDataProcess();
  }

  ionViewDidEnter() {
    this.onPage = true;
    this.refreshList();
  }

  ionViewDidLeave() {
    this.onPage = false;
  }

  /*presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }*/
  realTimeDataProcess() {
    setTimeout(() => {
      console.log("RUNNING BACKGROUND ASYNC PROCESS");
      this.api.getSensorDataAsync().then((res) => {
        this.sensordata = res;
        this.refreshList();
        this.checkIfStillOnPage();
      });
    }, 10000);
  };
  checkIfStillOnPage() {
    console.log("run second delayer");
    if (this.onPage) {
      this.realTimeDataProcess();
    }
  }

  refreshList() {
    this.monitoringPlants = [];
    this.notmonitoringPlants = [];
    for (let plant of this.api.plantdata) {
      if (plant.Current && plant.Owned) {
        this.monitoringPlants.push(plant)
      } else if (!plant.Current && plant.Owned) {
        this.notmonitoringPlants.push(plant)
      }
    }
  }

  viewPlantDetails(id){
    this.navCtrl.push(PlantDetailPage, {
      careID: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Plants');
  }



}
