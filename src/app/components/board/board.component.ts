import {
  Component,
  OnInit,
} from '@angular/core';
import { BoardService } from '@services';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public boardData = [
    [
      {
        available: true,
        classes: {
          inner: false,
          outer: false,
          top: false,
          right: false,
          bottom: false,
          left: false,
        },
        define: true,
        name: 'test 0',
        neighbors: {
          diagonal: 0,
          diameter: 0,
        },
      },
    ],
  ];
  private tileIndex = 0;
  private viewPositionX = 0;
  private viewPositionY = 0;
  private zoom = 0;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.initBoardData();
  }

  private initBoardData(): void {
    this.addLeadingRow();
    this.addTrailingRow();
    this.addLeadingColumn();
    this.addTrailingColumn();
    this.setBoardData();
  }

  private setBoardData(): void {
    this.setTilesNeighbors();
    this.setTilesClasses();
    console.log(this.boardData);
  }

  private setTilesNeighbors(): void {
    this.boardData.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.neighbors = {
          diagonal: 0,
          diameter: 0,
        };
        if (this.boardData[rowIndex - 1]) {
          if (this.isDefined(rowIndex - 1, columnIndex - 1)) {
            tile.neighbors.diagonal++;
          }
          if (this.isDefined(rowIndex - 1, columnIndex)) {
            tile.neighbors.diameter++;
          }
          if (this.isDefined(rowIndex - 1, columnIndex + 1)) {
            tile.neighbors.diagonal++;
          }
        }
        if (this.isDefined(rowIndex, columnIndex - 1)) {
          tile.neighbors.diameter++;
        }
        if (this.isDefined(rowIndex, columnIndex + 1)) {
          tile.neighbors.diameter++;
        }
        if (this.boardData[rowIndex + 1]) {
          if (this.isDefined(rowIndex + 1, columnIndex - 1)) {
            tile.neighbors.diagonal++;
          }
          if (this.isDefined(rowIndex + 1, columnIndex)) {
            tile.neighbors.diameter++;
          }
          if (this.isDefined(rowIndex + 1, columnIndex + 1)) {
            tile.neighbors.diagonal++;
          }
        }
        if (tile.neighbors.diameter > 1) {
          tile.classes.inner = true;
          tile.classes.outer = false;
        } else {
          tile.classes.inner = false;
          tile.classes.outer = true;
        }
        if (!tile.define) {
          this.setTileAvailable(tile);
        }
      });
    });
  }

  private setTileAvailable(tile): void {
    tile.available = tile.neighbors.diagonal + tile.neighbors.diameter > 0;
  }

  private setTilesClasses(): void {
    this.boardData.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        if (tile.neighbors.diameter && tile.classes.inner) {
          this.setTileClasses(tile, rowIndex, columnIndex, this.isDefined);
        }
        if (tile.available && tile.classes.outer) {
          this.setTileClasses(tile, rowIndex, columnIndex, this.isAvailable);
        }
      });
    });
  }

  private setTileClasses(tile, rowIndex: number, columnIndex: number, checkFunction: Function): void {
    tile.classes.top = !this.boardData[rowIndex - 1] || !checkFunction(rowIndex - 1, columnIndex);
    tile.classes.right = !checkFunction(rowIndex, columnIndex + 1);
    tile.classes.bottom = !this.boardData[rowIndex + 1] || !checkFunction(rowIndex + 1, columnIndex);
    tile.classes.left = !checkFunction(rowIndex, columnIndex - 1);
  }

  private addLeadingRow(): void {
    this.boardData.unshift([]);
    this.populateRow(0);
  }

  private addTrailingRow(): void {
    this.boardData.push([]);
    this.populateRow(this.boardData.length - 1);
  }

  private addLeadingColumn(): void {
    this.boardData.forEach(row => {
      row.unshift({
        available: false,
        classes: {
          inner: false,
          outer: false,
          top: false,
          right: false,
          bottom: false,
          left: false,
        },
        define: false,
        name: '',
        neighbors: {
          diagonal: 0,
          diameter: 0,
        },
      });
    });
  }

  private addTrailingColumn(): void {
    this.boardData.forEach(row => {
      row.push({
        available: false,
        classes: {
          inner: false,
          outer: false,
          top: false,
          right: false,
          bottom: false,
          left: false,
        },
        define: false,
        name: '',
        neighbors: {
          diagonal: 0,
          diameter: 0,
        },
      });
    });
  }

  private populateRow(rowIndex): void {
    for (let columnIndex = 0; columnIndex < this.boardData[1].length; columnIndex++) {
      this.boardData[rowIndex].push({
        available: false,
        classes: {
          inner: false,
          outer: false,
          top: false,
          right: false,
          bottom: false,
          left: false,
        },
        define: false,
        name: '',
        neighbors: {
          diagonal: 0,
          diameter: 0,
        },
      });
    }
  }

  private isDefined = (rowIndex: number, columnIndex: number): boolean => {
    if (this.boardData[rowIndex]) {
      const tile = this.boardData[rowIndex][columnIndex];
      return tile && tile.define;
    } else {
      return false;
    }
  };

  private isAvailable = (rowIndex: number, columnIndex: number): boolean => {
    if (this.boardData[rowIndex]) {
      const tile = this.boardData[rowIndex][columnIndex];
      return tile && tile.available;
    } else {
      return false;
    }
  };

  private addTile(rowIndex: number, columnIndex: number): void {
    if (!this.isDefined(rowIndex, columnIndex) && this.isAvailable(rowIndex, columnIndex)) {
      this.tileIndex++;
      this.boardData[rowIndex][columnIndex].define = true;
      this.boardData[rowIndex][columnIndex].name = `test ${this.tileIndex}`;
      if (rowIndex === 0) {
        this.addLeadingRow();
      } else if (rowIndex === this.boardData.length - 1) {
        this.addTrailingRow();
      }
      if (columnIndex === 0) {
        this.addLeadingColumn();
      } else if (columnIndex === this.boardData[rowIndex].length - 1) {
        this.addTrailingColumn();
      }
      this.setBoardData();
    }
  }

  private moveViewVertical(): void {
  }

  private moveViewHorizontal(): void {
  }

  private resetView(): void {
  }

  private zoomIn(): void {
  }

  private zoomOut(): void {
  }
}
