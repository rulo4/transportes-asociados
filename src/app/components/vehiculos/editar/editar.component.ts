import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';

import { Vehiculo } from '../inicio/Vehiculo';
import { VehiculosService } from '../../../vehiculos.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  soatfec: NgbDateStruct;
  serviciofec: NgbDateStruct;
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

  llenarCampos(vehiculo) {
    this.route.params.subscribe(params => {
      this.vehiculosService.editarVehiculo(params[ 'id' ]).subscribe(response => {
        this.vehiculo = response;
        this.ngForm.get('tipo').setValue(this.vehiculo.tipo);
        this.ngForm.get('placas').setValue(this.vehiculo.placas);
        this.ngForm.get('soatfec').setValue(this.aNgbDate(this.vehiculo.soatfec));
        this.ngForm.get('serviciofec').setValue(this.aNgbDate(this.vehiculo.serviciofec));
      });
    });
  }

  actualizarVehiculo() {
    this.soatfec = this.ngForm.get('soatfec').value;
    this.serviciofec = this.ngForm.get('serviciofec').value;
    this.soatfec.month--;
    this.serviciofec.month--;
    const vehiculo = {
      id: null,
      tipo: this.ngForm.get('tipo').value,
      placas: this.ngForm.get('placas').value,
      soatfec: moment(this.soatfec),
      serviciofec: moment(this.serviciofec)
    };
    this.route.params.subscribe(params => {
      vehiculo.id = params.id;
      this.vehiculosService.actualizarVehiculo(vehiculo).subscribe(response => {
        this.router.navigate([ '/vehiculos' ]);
      });
    });
  }

  ngOnInit() {
    this.llenarCampos(this.vehiculo);
  }

  aNgbDate(fecha: String) {
    const momentfec = moment.utc(fecha);
    return NgbDate.from(JSON.parse(momentfec.format('{["year"]: YYYY, ["month"]: M, ["day"]: D}')));
  }

}
