import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './shared';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NotificationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'apitribunal';
}
