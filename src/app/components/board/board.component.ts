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
        classes: {},
        define: true,
        name: 'test 0',
        neighbors: 0
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
            classes: {},
            define: false,
            neighbors: 0
          };
        }
      }
    }
    this.setClasses();
    console.log(this.boardData);
  }

  private setClasses(): void {
    for (let rowIndex = this.minRowIndex; rowIndex < this.maxRowIndex + 1; rowIndex++) {
      for (let columnIndex = this.minColumnIndex; columnIndex < this.maxColumnIndex + 1; columnIndex++) {
        this.boardData[rowIndex][columnIndex].classes = {};
        this.setNeighbors(rowIndex, columnIndex);
        if (this.boardData[rowIndex][columnIndex].classes.inner) {
          this.setInnerClasses(rowIndex, columnIndex);
        }
        if (this.boardData[rowIndex][columnIndex].classes.outer) {
          this.setOuterClass(rowIndex, columnIndex);
        }
      }
    }
  }

  private setNeighbors(rowIndex: number, columnIndex: number): void {
    const tile = this.boardData[rowIndex][columnIndex];
    tile.neighbors = 0;
    if (this.boardData[rowIndex - 1] && this.isDefined(rowIndex - 1, columnIndex)) {
      tile.neighbors++;
    }
    if (this.isDefined(rowIndex, columnIndex - 1)) {
      tile.neighbors++;
    }
    if (this.isDefined(rowIndex, columnIndex + 1)) {
      tile.neighbors++;
    }
    if (this.boardData[rowIndex + 1] && this.isDefined(rowIndex + 1, columnIndex)) {
      tile.neighbors++;
    }
    if (tile.neighbors > 1) {
      tile.classes.inner = true;
      tile.classes.outer = false;
    } else {
      tile.classes.inner = false;
      tile.classes.outer = true;
    }
  }

  private setInnerClasses(rowIndex: number, columnIndex: number): void {
    const tile = this.boardData[rowIndex][columnIndex];
    if (!this.boardData[rowIndex - 1] || !this.isDefined(rowIndex - 1, columnIndex)) {
      tile.classes.top = true;
    }
    if (!this.isDefined(rowIndex, columnIndex - 1)) {
      tile.classes.left = true;
    }
    if (!this.isDefined(rowIndex, columnIndex + 1)) {
      tile.classes.right = true;
    }
    if (!this.boardData[rowIndex + 1] || !this.isDefined(rowIndex + 1, columnIndex)) {
      tile.classes.bottom = true;
    }
  }

  private setOuterClass(rowIndex: number, columnIndex: number): void {
    const tile = this.boardData[rowIndex][columnIndex];
    if (!this.boardData[rowIndex - 1] || !this.boardData[rowIndex - 1][columnIndex]) {
      tile.classes.top = true;
    }
    if (!this.boardData[rowIndex][columnIndex - 1]) {
      tile.classes.left = true;
    }
    if (!this.boardData[rowIndex][columnIndex + 1]) {
      tile.classes.right = true;
    }
    if (!this.boardData[rowIndex + 1] || !this.boardData[rowIndex + 1][columnIndex]) {
      tile.classes.bottom = true;
    }
  }

  private addTile(rowIndex: number, columnIndex: number): void {
    if (this.isAvailable(rowIndex, columnIndex)) {
      this.tileIndex++;
      this.boardData[rowIndex][columnIndex] = {
        classes: {},
        define: true,
        name: `test ${this.tileIndex}`,
        neighbors: 0
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

  private isDefined(rowIndex: number, columnIndex: number): boolean {
    return this.boardData[rowIndex][columnIndex] && this.boardData[rowIndex][columnIndex].define;
  }

  private isAvailable(rowIndex: number, columnIndex: number): boolean {
    return this.boardData[rowIndex][columnIndex].neighbors;
  }

  private moveViewVertical(): void { }

  private moveViewHorizontal(): void { }

  private resetView(): void { }

  private zoomIn(): void { }

  private zoomOut(): void { }
}
