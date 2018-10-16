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
  private gridData = {
    x: 0,
    y: 0,
    tile: {}
  };
  private viewPositionX = 0;
  private viewPositionY = 0;
  private zoom = 0;

  constructor(private boardService: BoardService) { }

  ngOnInit() { }

  private addTile() { }

  private moveViewVertical(): void { }

  private moveViewHorizontal(): void { }

  private resetView(): void { }

  private zoomIn(): void { }

  private zoomOut(): void { }
}
