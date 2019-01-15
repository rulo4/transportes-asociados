import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {
  uri = 'http://localhost:4000/conductores';
  constructor(private http: HttpClient) { }
  crearConductor(conductor) {
    return this.http.post(`${this.uri}/crear`, conductor);
  }
  listarConductors() {
    return this.http.get(`${this.uri}`);
  }
  editarConductor(id) {
    return this.http.get(`${this.uri}/editar/${id}`);
  }
  actualizarConductor(conductor) {
    return this.http.post(`${this.uri}/actualizar/${conductor.id}`, conductor);
  }
  eliminarConductor(id) {
    return this.http.get(`${this.uri}/eliminar/${id}`);
  }
}
