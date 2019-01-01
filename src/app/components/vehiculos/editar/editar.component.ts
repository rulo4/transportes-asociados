import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Vehiculo } from '../inicio/Vehiculo';
import { VehiculosService } from '../../../vehiculos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  vehiculo: any = {};
  ngForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiculosService: VehiculosService,
    private formBuilder: FormBuilder) {
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

  actualizarVehiculo(vehiculo) {
    this.route.params.subscribe(params => {
      this.vehiculosService.actualizarVehiculo(vehiculo).subscribe(response => {
        this.router.navigate([ '/vehiculos' ]);
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vehiculosService.editarVehiculo(params[ 'id' ]).subscribe(response => {
        this.vehiculo = response;
        this.ngForm.get('tipo').setValue(this.vehiculo.tipo);
        this.ngForm.get('placas').setValue(this.vehiculo.placas);
        this.ngForm.get('soatfec').setValue(this.vehiculo.soatfec);
        this.ngForm.get('serviciofec').setValue(this.vehiculo.serviciofec);
      });
    });
  }

}
