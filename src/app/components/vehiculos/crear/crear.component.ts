import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { VehiculosService } from '../common/vehiculos.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  ngForm: FormGroup;

  constructor(private vehiculoService: VehiculosService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.crearForm();
  }

  crearForm() {
    this.ngForm = this.formBuilder.group({
      tipo: [ '', Validators.required ],
      placas: [ '', Validators.required ],
      soatfec: [ '', Validators.required ],
      serviciofec: ['', Validators.required]
    });
  }

  crearVehiculo() {
    const vehiculo = {
      tipo: this.ngForm.get('tipo').value,
      placas: this.ngForm.get('placas').value,
      soatfec: this.aMoment(this.ngForm.get('soatfec').value),
      serviciofec: this.aMoment(this.ngForm.get('serviciofec').value)
    };
    this.vehiculoService.crearVehiculo(vehiculo).subscribe({
      next: response => {
          this.toastr.success(response['msj']);
      },
      error: response => {
        this.toastr.error(response.error.err);
      }
    });
  }

  aMoment(fecha: NgbDateStruct) {
    return moment.tz({year: fecha.year, month: fecha.month - 1, day: fecha.day}, 'America/Mexico_City');
  }

  ngOnInit() {
  }

}
