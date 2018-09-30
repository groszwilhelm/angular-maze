import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'wall',
  template: ``,
  styles: [`
    :host {
      display: block;
      height: 100%
    }
  `]
})
export class WallComponent {
  @HostBinding('class.wall') wallClass = true;
  @Input() position: { rowIndex: number, columnIndex: number };
}
