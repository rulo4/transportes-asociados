import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiculosService } from '../../../vehiculos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  ngForm: FormGroup;

  constructor(private vehiculoService: VehiculosService, private formBuilder: FormBuilder) {
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

  crearVehiculo(vehiculo) {
    this.vehiculoService.crearVehiculo(vehiculo);
  }

  ngOnInit() {
  }

}
