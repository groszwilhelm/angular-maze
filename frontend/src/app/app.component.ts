import { Component } from '@angular/core';

import BoardConfig from './board/board.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public selectedBoard = null;

  constructor() {
    this.setBoard(new BoardConfig());
  }

  private setBoard(boardConfig) {
    this.selectedBoard = boardConfig.boards[0];
  }
}
