import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'teleporter',
  template: ``,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class TeleporterComponent {
  @HostBinding('class.teleporter') teleporterClass = true;
  @Input() position: { rowIndex: number, columnIndex: number };
}
