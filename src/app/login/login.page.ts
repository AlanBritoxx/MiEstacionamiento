import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye';
  
  usuario: string = ''; 
  contrasena: string = ''; 
  password: string = '';
  authenticated: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    private alertCtrl: AlertController) {
    
  }
 

  async submit() {
    
      
          this.router.navigate(['/test']);
       
  }

  register() {
    this.router.navigate(['/test']);
  }
  recover(){
    this.router.navigate(['/recover']);
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm?.valid) {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch(async (error) => {
          console.log(error);
          await loading.dismiss();
          this.showAlert('Correo o contraseña invalida', error.message);
        });

      if (user) {
        await loading.dismiss();
        this.router.navigate(['/test']);
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
  

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  
}