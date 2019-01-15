import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import 'moment/min/locales';
import { ToastrService } from 'ngx-toastr';
import { VehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  vehiculos: any[] = [];

  constructor(private router: Router, private vehiculosService: VehiculosService, private toastr: ToastrService) { }

  ngOnInit() {
    moment.locale('es');
    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculosService.listarVehiculos().subscribe({
      next: response => {
        const vehiculos = response as any[];
        if (vehiculos.length !== 0) {
          this.vehiculos = vehiculos.map((v) => {
            v.soatfec = moment(v.soatfec).format('DD [de] MMM [de] YYYY');
            v.serviciofec = moment(v.serviciofec).format('DD [de] MMM [de] YYYY');
            return v;
          });
        } else {
          this.toastr.warning('No hay vehículos para mostrar');
          this.vehiculos = [];
        }
      },
      error: response => {
        this.toastr.error(response.error.err);
      }
    });
  }

  eliminarVehiculo(id) {
    this.vehiculosService.eliminarVehiculo(id).subscribe({
      next: response => {
        this.toastr.success(response['msj']);
        this.listarVehiculos();
      },
      error: response => {
        this.toastr.error(response.error.err);
      }
    });
  }
}
