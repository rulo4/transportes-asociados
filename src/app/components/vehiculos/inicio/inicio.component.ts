import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from './Vehiculo';
import { VehiculosService } from '../../../vehiculos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  vehiculos: Vehiculo[] = [];

  constructor(private router: Router, private vehiculosService: VehiculosService) { }

  ngOnInit() {
    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculosService.listarVehiculos().subscribe((vehiculos: Vehiculo[]) => {
      this.vehiculos = vehiculos['vehiculos'];
    });
  }

  eliminarVehiculo(id) {
    this.vehiculosService.eliminarVehiculo(id).subscribe(response => {
      this.listarVehiculos();
    });
  }
}
