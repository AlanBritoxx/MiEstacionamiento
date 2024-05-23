import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  regForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye';
  slideAnimationActive: boolean = false;

  usuario: string = '';
  password: string = '';
  CContrasena: string = '';
  telefono: number = 0;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    private alertCtrl: AlertController
  ) {}

  initializeDatabase() {
    this.storage.create();
  }

  goToLogin() {
    this.router.navigate(['/inicio']);
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("^(?=.*[A-Z0-9])(?=.*[0-9])(?=.*[A-Z]).{8,}$"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      const user = await this.authService
        .registerUser(this.regForm.value.email, this.regForm.value.password)
        .catch(async (error) => {
          console.log(error);
          await loading.dismiss();
          this.showAlert('Registration Error', error.message);
        });

      if (user) {
        await loading.dismiss();
        this.router.navigate(['/inicio']);
      }
    } else {
      await loading.dismiss();
      this.showAlert('Formulario invalido', 'Completa los campos correctamente');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
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


function errorControl() {
  throw new Error('Function not implemented.');
}
