import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  uri = 'http://localhost:4000/vehiculos';
  constructor(private http: HttpClient) { }
  crearVehiculo(vehiculo) {
    this.http.post(`${this.uri}/crear`, vehiculo)
      .subscribe(response => {
        console.log('Vehículo creado');
      });
  }
}
