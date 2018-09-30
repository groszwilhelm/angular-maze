import { Component, Input, ViewChild, HostBinding } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { WallComponent } from './wall/wall.component';
import { TeleporterComponent } from './teleporter/teleporter.component';

@Component({
  selector: 'tile',
  template: `
    <ng-container [ngSwitch]="data">
      <hero *ngSwitchCase="'h'" [position]="coords"></hero>
      <wall *ngSwitchCase="'b'" [position]="coords" [class.hidden]="isHidden()"></wall>
      <wall *ngSwitchCase="'bh'" [position]="coords" [class.hidden]="isHidden()"></wall>
      <teleporter *ngSwitchCase="'t'" [position]="coords" [class.hidden]="isHidden()"></teleporter>
      <teleporter *ngSwitchCase="'th'" [position]="coords" [class.hidden]="isHidden()"></teleporter>
      <empty *ngSwitchDefault [class.hidden]="isHidden()"></empty>
    </ng-container>
  `,
  styles: [`
    :host {
      height: 2.5rem;
      width: 2.5rem;
      border: 1px solid darkgray;
      margin: 1px
    }
  `]
})
export class TileComponent {
  @ViewChild(HeroComponent) heroComponent: HeroComponent;
  @ViewChild(WallComponent) wallComponent: WallComponent;
  @ViewChild(TeleporterComponent) teleporterComponent: TeleporterComponent;

  @Input() data: 'd' | 'dh' | 'h' | '-' | '-h';
  @Input() coords: { rowIndex: number, columnIndex: number };

  public isHidden() {
    return this.data.charAt(1) === 'h';
  }
}
