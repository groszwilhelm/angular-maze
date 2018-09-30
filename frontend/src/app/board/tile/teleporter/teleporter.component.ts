import { Component, Input } from '@angular/core';

@Component({
  selector: 'teleporter',
  template: `
    T
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class TeleporterComponent {
  @Input() position: { rowIndex: number, columnIndex: number };
}
