import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-modal-ofrecer',
  templateUrl: './modal-ofrecer.component.html',
  styleUrls: ['./modal-ofrecer.component.scss'],
})
export class ModalOfrecerComponent  implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {}

  goToEstacionamiento(){
    this.router.navigate(['/estacionamientos'])
    this.modalCtrl.dismiss();
  }
}
