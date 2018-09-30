import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'hero',
  template: ``,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class HeroComponent {
  @HostBinding('class.hero') heroClass = true;
  @Input() position: { rowIndex: number, columnIndex: number };
}
