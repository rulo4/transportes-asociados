import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './Vehiculo';
import { VehiculosService } from '../../../vehiculos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  vehiculos: Vehiculo[];

  constructor(private vehiculosService: VehiculosService) { }

  ngOnInit() {
    this.vehiculosService.listarVehiculos().subscribe((vehiculos: Vehiculo[]) => {
      this.vehiculos = vehiculos.vehiculos;
    });
  }

}
