import { Component, Input, HostListener, ViewChildren, QueryList } from '@angular/core';
import { TileComponent } from './tile/tile.component';
import { HeroComponent } from './tile/hero/hero.component';
import { WallComponent } from './tile/wall/wall.component';
import { TeleporterComponent } from './tile/teleporter/teleporter.component';

@Component({
  selector: 'board-component',
  template: `
    <ng-container *ngIf="board">
      <div class="row" *ngFor="let row of board; let rowIndex = index;">
        <ng-container *ngFor="let column of row; let columnIndex = index;">
          <tile [data]="column" [coords]="{ rowIndex: rowIndex, columnIndex: columnIndex }"></tile>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
      margin: 0 auto;
    }
    .row {
      display:flex;
      flex-direction: row;
    }
  `]
})
export class BoardComponent {
  @Input() board;

  private _hero: HeroComponent;
  private _walls: Array<WallComponent>;
  private _teleporters: Array<TeleporterComponent>;
  private operators = {
    '-': (a, b) => {
      return  a - b;
    },
    '+': function(a, b) {
      return a + b;
    },
    '': function(a, b) {
      return a;
    }
  };

  @ViewChildren(TileComponent)
  set tiles(tiles: QueryList<TileComponent>) {
    this.getHero(tiles);
    this.getWalls(tiles);
    this.getTeleporters(tiles);
  }

  private getHero(tiles: QueryList<TileComponent>) {
    tiles
      .filter(tile => tile.heroComponent !== undefined)
      .map(tile => this._hero = tile.heroComponent);
  }

  private getWalls(tiles: QueryList<TileComponent>) {
    this._walls = tiles
      .filter(tile => tile.wallComponent !== undefined)
      .map(tile => tile.wallComponent);
  }

  private getTeleporters(tiles: QueryList<TileComponent>) {
    this._teleporters = tiles
      .filter(tile => tile.teleporterComponent !== undefined)
      .map(tile => tile.teleporterComponent);
  }

  @HostListener('document:keydown', ['$event.key', '$event'])
  keyPressListener(key, event) {
    event.preventDefault();
    this.arrowKeyPressHandler(key);
  }

  private arrowKeyPressHandler(key: string) {
    switch (key) {
      case 'ArrowUp':
        this.updateHeroPosition('-');
        break;
      case 'ArrowDown':
        this.updateHeroPosition('+');
        break;
      case 'ArrowLeft':
        this.updateHeroPosition('', '-');
        break;
      case 'ArrowRight':
        this.updateHeroPosition('', '+');
        break;
    }
  }

  private updateHeroPosition(rowIndexModifier = '', columnIndexModifier = '') {
    let heroPositionIsUpadted = false;
    const curentHeroPosition = { ...this._hero.position };
    const updatedRowIndex = this.operators[rowIndexModifier](curentHeroPosition.rowIndex, 1);
    const updatedColumnIndex = this.operators[columnIndexModifier](curentHeroPosition.columnIndex, 1);

    heroPositionIsUpadted = this.updateBoardForHeroPosition(updatedRowIndex, updatedColumnIndex);

    if (heroPositionIsUpadted) {
        this.updateBoard(curentHeroPosition.rowIndex, curentHeroPosition.columnIndex, '-');
    }
  }

  private updateBoardForHeroPosition(rowIndex, columnIndex): boolean {
    if (this.hasWall(rowIndex, columnIndex)) {
      return false;
    }
    /**
     * @TODO: logic will work only if the teleporter has wall above or below, needs to be extended
     */
    if (this.isTeleporter(rowIndex, columnIndex)) {
      const teleportTo = this._teleporters
        .filter(teleporter => teleporter.position.rowIndex !== rowIndex && teleporter.position.columnIndex !== columnIndex)[0].position;

      if (this.hasWall(teleportTo.rowIndex + 1, teleportTo.columnIndex)) {
        this.updateBoard(teleportTo.rowIndex - 1, teleportTo.columnIndex, 'h');
      } else {
        this.updateBoard(teleportTo.rowIndex + 1, teleportTo.columnIndex, 'h');
      }

      this.updateViewRange(this._teleporters[0].position.rowIndex + 1, this._teleporters[0].position.columnIndex);
      return true;
    }

    this.updateBoard(rowIndex, columnIndex, 'h');
    this.updateViewRange(rowIndex, columnIndex);
    return true;
  }

  private updateBoard(rowIndex, colIndex, symbol) {
    const boardClone = this.board.slice();

    for (let rowIndx = 0; rowIndx < boardClone.length; rowIndx++) {
      for (let colIndx = 0; colIndx < boardClone[rowIndx].length; colIndx++) {
        if (this.rowsMatch(rowIndx, rowIndex) && this.columnsMatch(colIndx, colIndex)) {
          boardClone[rowIndex][colIndex] = symbol;
          return;
        }
      }
    }

    this.board = boardClone;
  }

  private rowsMatch(boardRowIndex, givenRowIndex) {
    return boardRowIndex === givenRowIndex;
  }

  private columnsMatch(boardColIndex, givenColIndex) {
    return boardColIndex === givenColIndex;
  }

  private hasWall(rowIndex, colIndex) {
    return !!this._walls
      .find(wall => wall.position.rowIndex === rowIndex && wall.position.columnIndex === colIndex);
  }

  private isTeleporter(rowIndex, colIndex) {
    return !!this._teleporters
      .find(teleporter => teleporter.position.rowIndex === rowIndex && teleporter.position.columnIndex === colIndex);
  }

  private updateViewRange(rowIndex, colIndex) {
    this.unhideElements(rowIndex + 1, colIndex + 1);
    this.unhideElements(rowIndex - 1, colIndex - 1);
    this.unhideElements(rowIndex + 1, colIndex - 1);
    this.unhideElements(rowIndex - 1, colIndex + 1);
    this.unhideElements(rowIndex + 1, colIndex);
    this.unhideElements(rowIndex - 1, colIndex);
    this.unhideElements(rowIndex, colIndex + 1);
    this.unhideElements(rowIndex, colIndex - 1);
  }

  private unhideElements(rowIndex, colIndex) {
    if (this.hasWall(rowIndex, colIndex)) {
      this.updateBoard(rowIndex, colIndex, 'b');
      return;
    }
    if (this.isTeleporter(rowIndex, colIndex)) {
      this.updateBoard(rowIndex, colIndex, 't');
      return;
    }
    this.updateBoard(rowIndex, colIndex, '-');
  }
}
