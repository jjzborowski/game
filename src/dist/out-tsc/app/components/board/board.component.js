var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { BoardService } from '@services';
let BoardComponent = class BoardComponent {
    constructor(boardService) {
        this.boardService = boardService;
        this.gridData = {
            x: 0,
            y: 0,
            tile: {}
        };
        this.viewPositionX = 0;
        this.viewPositionY = 0;
        this.zoom = 0;
    }
    ngOnInit() { }
    addTile() { }
    moveViewVertical() { }
    moveViewHorizontal() { }
    resetView() { }
    zoomIn() { }
    zoomOut() { }
};
BoardComponent = __decorate([
    Component({
        selector: 'ui-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.scss']
    }),
    __metadata("design:paramtypes", [BoardService])
], BoardComponent);
export { BoardComponent };
//# sourceMappingURL=P:/game/src/app/components/board/board.component.js.map