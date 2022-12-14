/*
* Module implementing the controller.
*/

import Utils from '../utils';
import Model from '../model/model';

class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public getNetworkInterfaceControllers = async () => {
    this.model.scanNetworkInterfaceControllers();
    return Object.keys(this.model.networkInterfaceControllers);
  }

  public getAccessPoints = async () => {
    await this.model.stopScanningAccessPoints();
    return Object.keys(this.model.accessPoints);
  }

  public getClients = async () => {
    await this.model.usedAccessPoint.stopScanning();
    return Object.keys(this.model.usedAccessPoint.clients);
  }

  public setInterfaceSelection = (_event: Event, iface: string) => {
    if (this.model.usedNetworkInterfaceController) {
      this.model.usedNetworkInterfaceController.setManagedMode();
    }
    this.model.usedNetworkInterfaceController = this.model.networkInterfaceControllers[iface];
    this.model.usedNetworkInterfaceController.setMonitorMode();
  }

  public setInterfaceMac = (_event: Event, randomized: boolean) => {
    this.model.macRandomized = randomized;
    if (this.model.macRandomized) {
      if (this.model.usedNetworkInterfaceController.changedMac) {
        return;
      }
      const randomMac = Utils.getRandomMac();
      this.model.usedNetworkInterfaceController.changeMac(randomMac);
    } else {
      this.model.usedNetworkInterfaceController.resetMac();
    }
  }

  public setBandSelection = (_event: Event, bandValues: string[]) => {
    this.model.bandFlags = bandValues;
  }

  public setAccessPointSelection = (_event: Event, accessPoint: string) => {
    this.model.usedAccessPoint = this.model.accessPoints[accessPoint];
  }

  public setTargetSelection = (_event: Event, targets: string[]) => {
    this.model.usedAccessPoint.setTargetSelection(targets);
  }
}

export default Controller;
