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
  listarVehiculos() {
    return this.http.get(`${this.uri}`);
  }
  editarVehiculo(id) {
    return this.http.get(`${this.uri}/editar/${id}`);
  }
  actualizarVehiculo(vehiculo) {
    return this.http.post(`${this.uri}/actualizar/${vehiculo.id}`, vehiculo);
  }
  eliminarVehiculo(id) {
    return this.http.get(`${this.uri}/eliminar/${id}`);
  }
}
