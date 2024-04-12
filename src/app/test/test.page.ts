import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { GoogleMap, Circle, Marker } from '@capacitor/google-maps';
import { Geolocation, Position, PermissionStatus } from '@capacitor/geolocation';
import { ModalController, AnimationController } from '@ionic/angular';
import { ModalInformacionComponent } from '../modal-informacion/modal-informacion.component';
import { ModalOfrecerComponent } from '../modal-ofrecer/modal-ofrecer.component';
import { ModalNuevoModal } from '../modal-nuevo/modal-nuevo.modal';

const apiKey = 'AIzaSyCqGnMP0X13WuMfZda1mTc8ukYYF8CzHoM';
@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements AfterViewInit{

  @ViewChild('map', { read: ElementRef }) mapRef!: ElementRef;

  map: GoogleMap | undefined;
  circles: Circle[] = [];
  markerId: string | undefined;
  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    if (this.mapRef) {
      const currentPosition = await this.getCurrentPosition();

      this.map = await GoogleMap.create({
        id: 'my-map',
        element: this.mapRef.nativeElement,
        apiKey: apiKey,
        config: {
          center: {
            lat: currentPosition.coords.latitude,
            lng: currentPosition.coords.longitude,
          },
          zoom: 15,
          androidLiteMode: false,
          disableDefaultUI: true,
        },
        
        
      });


      const circleOptions: Circle = {
        center: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },
        radius: 1000, // Puedes ajustar el radio según tus necesidades
        fillColor: '#7ED957',
        fillOpacity: 0.5,
        strokeColor: '#7ED957',
        strokeWeight: 2,
        clickable: true,
      };

      // Agregar el círculo al mapa
      this.circles.push(circleOptions);
      await this.map.addCircles(this.circles);

      // Agregar un marcador en el centro del mapa
      const markerId = await this.map.addMarker({
        coordinate: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },
        iconUrl: 'https://icones.pro/wp-content/uploads/2021/02/icone-de-broche-de-localisation-verte.png',
        iconSize: { width: 30, height: 30 }, // Ajusta el tamaño del ícono según sea necesario
        iconOrigin: { x: 0, y: 0 },
        iconAnchor: { x: 15, y: 30 },

      });
      
      
    } else {
      console.error('mapRef is not defined');
    }
  }

  async generarMarcadores() {
    if (this.map) {
      const circleOptions = this.circles[0];

      if (circleOptions && circleOptions.center) {
        const currentPosition = await this.getCurrentPosition();
        const circleCenterLat = circleOptions.center.lat as number;
        const circleCenterLng = circleOptions.center.lng as number;

        // Generar 4 ubicaciones no aleatorias dentro del círculo
        const marcadores = this.generarMarcadoresNoAleatorios(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
          circleCenterLat,
          circleCenterLng,
          circleOptions.radius || 0,
          4
        );

        // Crear marcadores
        for (const marcador of marcadores) {
          const markerId = await this.map?.addMarker({
            coordinate: marcador,
            title: 'Título del marcador',
            iconUrl: 'assets/icon/estacionamiento.png',
            snippet: `Latitud: ${marcador.lat}, Longitud: ${marcador.lng}`,
            // Otros parámetros según tus necesidades
          });
  
         this.map.setOnMarkerClickListener(async (markerId) => {

          const modal = await this.modalCtrl.create({
            component: ModalInformacionComponent,
            componentProps:{
              markerId,
            },
            breakpoints: [0, 0.78],
            initialBreakpoint: 0.78,

            
          });
          modal.present();
        });
         
          
        
        }
      }
    }
  }

  generarMarcadoresNoAleatorios(
    currentLat: number,
    currentLng: number,
    circleCenterLat: number,
    circleCenterLng: number,
    circleRadius: number,
    count: number
  ): { lat: number; lng: number }[] {
    const marcadores: { lat: number; lng: number }[] = [];
    const angleIncrement = (2 * Math.PI) / count;
    const rangoKilometros = 0.5; // Define el rango en kilómetros
  
    for (let i = 0; i < count; i++) {
      const angle = angleIncrement * i;
  
      // Calcula las nuevas coordenadas dentro del rango
      const lat = circleCenterLat + (rangoKilometros / 111.32) * Math.sin(angle);
      const lng = circleCenterLng + (rangoKilometros / (111.32 * Math.cos(lat / 180 * Math.PI))) * Math.cos(angle);
  
      // Agrega un pequeño desplazamiento aleatorio
      const desplazamientoAleatorio = (Math.random() - 0.5) * (rangoKilometros / 111.32) / 2;
      const latDesordenada = lat + desplazamientoAleatorio;
      const lngDesordenada = lng + desplazamientoAleatorio;
  
      marcadores.push({ lat: latDesordenada, lng: lngDesordenada });
    }
    
    return marcadores;

  }

 
  async getCurrentPosition(): Promise<Position> {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

  async checkLocationPermission(): Promise<PermissionStatus> {
    const status = await Geolocation.checkPermissions();
    return status;
  }

  async requestLocationPermission(): Promise<PermissionStatus> {
    const permissions = await Geolocation.requestPermissions();
    return permissions;
  }



  async mostrarInformacionModal(ubicacion: { lat: number; lng: number }) {
    const modal = await this.modalCtrl.create({
      component: ModalInformacionComponent, // Asegúrate de crear este componente modal
      cssClass: 'modal-custom', // Agrega una clase CSS personalizada para personalizar el diseño del modal
      componentProps: {
        markerId: this.markerId || '',
        ubicacion: ubicacion,
        map: this.map,
        borrarCallback: () => this.borrarMarcador()
      }
    });
    modal.onDidDismiss().then((data) => {
      // No es necesario verificar si hay datos, ya que siempre estamos llamando a la función
      // borrarCallback incluso si el usuario no confirma
      this.borrarMarcador();
    });
    
    await modal.present();
  }
  async borrarMarcador() {
    if (this.markerId && this.map) {
      await this.map.removeMarker(this.markerId);
    }
  }

  async modalOfrecer(){
    const modal = await this.modalCtrl.create({
      component: ModalOfrecerComponent,
      
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,

      
    });
    modal.present();
  }



  async abrirNuevoModal() {
    const modal2 = await this.modalCtrl.create({
      component: ModalNuevoModal,
      
      breakpoints: [0, 1],
      initialBreakpoint: 1,

      
    });
    modal2.present();
  }


}
