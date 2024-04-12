import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-estacionamientos',
  templateUrl: './estacionamientos.page.html',
  styleUrls: ['./estacionamientos.page.scss'],
})
export class EstacionamientosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTest(){
    this.router.navigate(['/test']);
  }
}
