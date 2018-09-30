import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board.component';
import { TileComponent } from './tile/tile.component';
import { HeroComponent } from './tile/hero/hero.component';
import { WallComponent } from './tile/wall/wall.component';
import { EmptyComponent } from './tile/empty/empty.component';
import { TeleporterComponent } from './tile/teleporter/teleporter.component';

@NgModule({
  imports: [CommonModule],
  exports: [BoardComponent],
  declarations: [BoardComponent, TileComponent, HeroComponent, WallComponent, EmptyComponent, TeleporterComponent],
  providers: [],
})
export class BoardModule { }
