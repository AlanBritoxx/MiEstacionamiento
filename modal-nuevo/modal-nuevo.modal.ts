import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-nuevo',
  templateUrl: './modal-nuevo.modal.html',
  styleUrls: ['./modal-nuevo.modal.scss'],
})
export class ModalNuevoModal  implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {}


  goToInicio() {
    this.router.navigate(['/inicio']);
    this.modalCtrl.dismiss();
  }

  goToEstacionamiento(){
    this.router.navigate(['/estacionamientos']);
    this.modalCtrl.dismiss();
  }
}
