import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-informacion',
  templateUrl: './modal-informacion.component.html',
  styleUrls: ['./modal-informacion.component.scss'],
})
export class ModalInformacionComponent {

  @Input() markerId: any;
  @Input() map: any;
  @Input() borrarCallback!: Function;
  constructor(private modalCtrl: ModalController) { }

  confirmar() {
    // Realiza las acciones que necesitas al confirmar
    this.modalCtrl.dismiss();
    this.borrarCallback();
  }
}