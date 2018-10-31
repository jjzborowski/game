import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { BoardSettings } from '@constants';
import {
  Tile,
  TileClasses
} from '@interfaces';
import { BoardService } from '@services';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @ViewChild('boardContainer') boardContainer: ElementRef;
  public boardData: [Tile[]];
  private tileIndex = 0;
  private viewPositionX = 0;
  private viewPositionY = 0;
  private mousePositionX: number;
  private mousePositionY: number;
  private mouseDrag = false;
  private zoom = BoardSettings.zoom.initial;

  constructor(
    private renderer: Renderer2,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.initBoardData();
  }

  private initBoardData(): void {
    this.setInitialTile();
    this.addLeadingRow();
    this.addTrailingRow();
    this.addLeadingColumn();
    this.addTrailingColumn();
    this.setBoardData();
  }

  private setInitialTile(): void {
    this.boardData = [[new Tile()]];
    this.boardData[0][0].define = true;
    this.boardData[0][0].initial = true;
  }

  private setBoardData(): void {
    this.boardData.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.classes = new TileClasses();
        tile.rowIndex = rowIndex;
        tile.columnIndex = columnIndex;
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
      this.boardData[rowIndex].push(new Tile());
    }
  }

  private addLeadingColumn(): void {
    this.boardData.forEach(row => {
      row.unshift(new Tile());
    });
  }

  private addTrailingColumn(): void {
    this.boardData.forEach(row => {
      row.push(new Tile());
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

  private addTile(tile: Tile): void {
    console.log(tile);
    this.tileIndex++;
    if (tile.rowIndex === 0) {
      this.addLeadingRow();
    } else if (tile.rowIndex === this.boardData.length - 1) {
      this.addTrailingRow();
    }
    if (tile.columnIndex === 0) {
      this.addLeadingColumn();
    } else if (tile.columnIndex === this.boardData[tile.rowIndex].length - 1) {
      this.addTrailingColumn();
    }
    this.setBoardData();
  }

  private setBoardTransform(): void {
    this.renderer.setStyle(
      this.boardContainer.nativeElement,
      'transform',
      `translate(${this.viewPositionX}px, ${this.viewPositionY}px) scale(${this.zoom})`
    );
  }

  private viewVerticalMove(factor: number): void {
    this.viewPositionY = this.viewPositionY + 100 * factor;
    this.setBoardTransform();
  }

  private viewHorizontalMove(factor: number): void {
    this.viewPositionX = this.viewPositionX + 100 * factor;
    this.setBoardTransform();
  }

  private boardDragStart(event: MouseEvent): void {
    this.mousePositionX = event.clientX;
    this.mousePositionY = event.clientY;
    this.mouseDrag = true;
  }

  private boardDragMove(event: MouseEvent): void {
    if (this.mouseDrag) {
      this.viewPositionX = event.clientX - this.mousePositionX;
      this.viewPositionY = event.clientY - this.mousePositionY;
      this.setBoardTransform();
    }
  }

  private boardDragStop(): void {
    this.mouseDrag = false;
  }

  private zoomIn(): void {
    this.zoom += BoardSettings.zoom.ratio;
    this.setBoardTransform();
  }

  private zoomOut(): void {
    this.zoom -= BoardSettings.zoom.ratio;
    this.setBoardTransform();
  }

  private zoomReset(): void {
    this.zoom = BoardSettings.zoom.initial;
    this.setBoardTransform();
  }

  private resetView(): void {
  }
}
