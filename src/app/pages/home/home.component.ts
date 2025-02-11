import { Component } from '@angular/core';
import { CounterComponent } from '../../components/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
