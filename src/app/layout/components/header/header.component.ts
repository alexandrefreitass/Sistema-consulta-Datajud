// src/app/layout/components/header/header.component.ts
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
