// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../layout';
import { ProcessoConsultaComponent } from '../../features';

@Component({
    selector: 'app-home',
    imports: [
        HeaderComponent,
        NgOptimizedImage,
        ProcessoConsultaComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
