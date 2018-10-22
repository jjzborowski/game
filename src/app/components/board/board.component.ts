import {
  Component,
  OnInit
} from '@angular/core';
import { BoardService } from '@services';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public boardData = {
    0: {
      0: {
        define: true,
        name: 'test 0'
      }
    }
  };
  private maxColumnIndex = 1;
  private maxRowIndex = 1;
  private minColumnIndex = -1;
  private minRowIndex = -1;
  private tileIndex = 0;
  private viewPositionX = 0;
  private viewPositionY = 0;
  private zoom = 0;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.fillBoardData();
  }

  private fillBoardData(): void {
    for (let rowIndex = this.minRowIndex; rowIndex < this.maxRowIndex + 1; rowIndex++) {
      if (!this.boardData[rowIndex]) {
        this.boardData[rowIndex] = {};
      }
      for (let columnIndex = this.minColumnIndex; columnIndex < this.maxColumnIndex + 1; columnIndex++) {
        if (!this.boardData[rowIndex][columnIndex]) {
          this.boardData[rowIndex][columnIndex] = {
            define: false
          };
        }
      }
    }
    console.log(this.boardData);
  }

  private defineNextTiles(rowIndex: number, columnIndex: number): void {
    if (this.boardData[rowIndex - 1][columnIndex - 1]) {

    }
    if (this.boardData[rowIndex - 1][columnIndex]) {

    }
    if (this.boardData[rowIndex - 1][columnIndex + 1]) {

    }
    if (this.boardData[rowIndex][columnIndex - 1]) {

    }
    if (this.boardData[rowIndex][columnIndex + 1]) {

    }
    if (this.boardData[rowIndex + 1][columnIndex - 1]) {

    }
    if (this.boardData[rowIndex + 1][columnIndex]) {

    }
    if (this.boardData[rowIndex + 1][columnIndex + 1]) {

    }
  }

  private addTile(rowIndex: number, columnIndex: number): void {
    if (!this.boardData[rowIndex][columnIndex].define) {
      this.tileIndex++;
      this.boardData[rowIndex][columnIndex] = {
        define: true,
        name: `test ${this.tileIndex}`
      };
      if (rowIndex === this.minRowIndex) {
        this.minRowIndex--;
      } else if (rowIndex === this.maxRowIndex) {
        this.maxRowIndex++;
      }
      if (columnIndex === this.minColumnIndex) {
        this.minColumnIndex--;
      } else if (columnIndex === this.maxColumnIndex) {
        this.maxColumnIndex++;
      }
      this.fillBoardData();
    }
  }

  private moveViewVertical(): void { }

  private moveViewHorizontal(): void { }

  private resetView(): void { }

  private zoomIn(): void { }

  private zoomOut(): void { }
}
