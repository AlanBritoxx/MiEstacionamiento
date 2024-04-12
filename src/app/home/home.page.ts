import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  slideAnimationActive: boolean = false;
  NombreForm: FormGroup;
  usuario: string = '';
  password: string = '';
  CContrasena: string = '';
  telefono: number = 0;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private storage: Storage) {
    this.NombreForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      
    });
    
  }
  initializeDatabase() {
    this.storage.create();
  }
  

  goToLogin() {
    this.router.navigate(['/inicio']);
  }

  ngOnInit() {
    this.initializeDatabase();
  }


  

  register() {

  
    const userData = {
      usuario: this.usuario,
      password: this.password,

    };
    console.log('Datos a guardar:', userData);
  
    this.storage.set('userData', userData).then(() => {
      console.log('Datos guardados en Ionic Storage');
      this.router.navigate(['/test']);
    });
  }
  
}