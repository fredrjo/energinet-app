import { Injectable } from '@angular/core';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  initialAmount: Number = 0;
  buildings = [];

  constructor() {}
  setAlarms(amount) {
      this.initialAmount = amount;
  }
  setSpesificAlarms(building) {
      let wasFound = false;
      for (let i = 0; i < this.buildings.length; i++) {
          if (building.link === this.buildings[i].link) {
              this.buildings[i].cardinality = building.cardinality;
              this.buildings[i].pending = building.pending;
              wasFound = true;
          }
      }
      if (!wasFound) {
          this.buildings.push(building);
      }
  }
  getBuildingsAlarms(buildingLink) {
      for (let i = 0; i < this.buildings.length; i++) {
          if (buildingLink === this.buildings[i].link) {
              return this.buildings[i];
          }
      }
      return null;
  }
  getAllBuildings() {
      return this.buildings;
  }
  getAlarms() {
      if (this.buildings.length < 1) {
          return this.initialAmount;
      } else {
          let currentAmount = 0;
          for (let i = 0; i < this.buildings.length; i++) {
              currentAmount = Number(currentAmount) + Number(this.buildings[i].cardinality);
          }
          return currentAmount;
      }
  }
}
