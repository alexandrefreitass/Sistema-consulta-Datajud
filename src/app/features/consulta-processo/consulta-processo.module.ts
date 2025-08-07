// src/app/features/consulta-processo/consulta-processo.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ProcessoConsultaComponent } from './components/processo-consulta/processo-consulta.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ProcessoConsultaComponent
  ],
  exports: [
    ProcessoConsultaComponent
  ]
})
export class ConsultaProcessoModule { }
