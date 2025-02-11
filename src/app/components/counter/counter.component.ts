import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counterValue = signal(0);
  increment() {
    // update value using set
    this.counterValue.set(this.counterValue() + 1);
  }
  decrement() {
    // update value using update
    this.counterValue.update((val) => val - 1);
  }
  reset() {
    this.counterValue.set(0);
  }
}
