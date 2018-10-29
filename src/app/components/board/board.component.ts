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
  public boardData = [
    [
      {
        available: true,
        classes: {
          topLeft: false,
          top: false,
          topRight: false,
          right: false,
          left: false,
          bottomLeft: false,
          bottom: false,
          bottomRight: false
        },
        define: true,
        name: 'test 0',
        neighbors: 0
      }
    ]
  ];
  private tileIndex = 0;
  private viewPositionX = 0;
  private viewPositionY = 0;
  private zoom = 0;

  constructor(private boardService: BoardService) { }

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
    this.boardData.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.classes = {
          topLeft: false,
          top: false,
          topRight: false,
          right: false,
          left: false,
          bottomLeft: false,
          bottom: false,
          bottomRight: false
        };
        tile.neighbors = 0;
        if (this.boardData[rowIndex - 1]) {
          if (this.isDefined(rowIndex - 1, columnIndex - 1)) {
            tile.classes.topLeft = true;
            tile.neighbors++;
          }
          if (this.isDefined(rowIndex - 1, columnIndex)) {
            tile.classes.top = true;
            tile.neighbors++;
          }
          if (this.isDefined(rowIndex - 1, columnIndex + 1)) {
            tile.classes.topRight = true;
            tile.neighbors++;
          }
        }
        if (this.isDefined(rowIndex, columnIndex - 1)) {
          tile.classes.left = true;
          tile.neighbors++;
        }
        if (this.isDefined(rowIndex, columnIndex + 1)) {
          tile.classes.right = true;
          tile.neighbors++;
        }
        if (this.boardData[rowIndex + 1]) {
          if (this.isDefined(rowIndex + 1, columnIndex - 1)) {
            tile.classes.bottomLeft = true;
            tile.neighbors++;
          }
          if (this.isDefined(rowIndex + 1, columnIndex)) {
            tile.classes.bottom = true;
            tile.neighbors++;
          }
          if (this.isDefined(rowIndex + 1, columnIndex + 1)) {
            tile.classes.bottomRight = true;
            tile.neighbors++;
          }
        }
        if (!tile.define) {
          tile.available = tile.neighbors > 0;
        }
      });
    });
  }

  private addLeadingRow(): void {
    this.boardData.unshift([]);
    this.populateRow(0);
  }

  private addTrailingRow(): void {
    this.boardData.push([]);
    this.populateRow(this.boardData.length - 1);
  }

  private populateRow(rowIndex): void {
    for (let columnIndex = 0; columnIndex < this.boardData[1].length; columnIndex++) {
      this.boardData[rowIndex].push({
        available: false,
        classes: {
          topLeft: false,
          top: false,
          topRight: false,
          right: false,
          left: false,
          bottomLeft: false,
          bottom: false,
          bottomRight: false
        },
        define: false,
        name: '',
        neighbors: 0
      });
    }
  }

  private addLeadingColumn(): void {
    this.boardData.forEach(row => {
      row.unshift({
        available: false,
        classes: {
          topLeft: false,
          top: false,
          topRight: false,
          right: false,
          left: false,
          bottomLeft: false,
          bottom: false,
          bottomRight: false
        },
        define: false,
        name: '',
        neighbors: 0
      });
    });
  }

  private addTrailingColumn(): void {
    this.boardData.forEach(row => {
      row.push({
        available: false,
        classes: {
          topLeft: false,
          top: false,
          topRight: false,
          right: false,
          left: false,
          bottomLeft: false,
          bottom: false,
          bottomRight: false
        },
        define: false,
        name: '',
        neighbors: 0
      });
    });
  }

  private isDefined(rowIndex: number, columnIndex: number): boolean {
    if (this.boardData[rowIndex]) {
      const tile = this.boardData[rowIndex][columnIndex];
      return tile && tile.define;
    } else {
      return false;
    }
  }

  private isAvailable(rowIndex: number, columnIndex: number): boolean {
    if (this.boardData[rowIndex]) {
      const tile = this.boardData[rowIndex][columnIndex];
      return tile && tile.available;
    } else {
      return false;
    }
  }

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
