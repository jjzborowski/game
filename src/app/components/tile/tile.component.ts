import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Tile } from '@interfaces';

@Component({
  selector: 'ui-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  @Output() addTileEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  private addTile(): void {
    if (!this.tile.define && this.tile.available) {
      this.tile.define = true;
      this.tile.available = false;
      this.addTileEvent.emit(this.tile);
    }
  }
}
