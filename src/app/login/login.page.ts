import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string = ''; 
  contrasena: string = ''; 
  password: string = '';
  authenticated: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    
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
  }
  goToInicio() {
    this.router.navigate(['/inicio']);
  }
}