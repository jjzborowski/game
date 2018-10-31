export class Tile {
  public available = false;
  public classes = {
    topLeft: false,
    top: false,
    topRight: false,
    right: false,
    left: false,
    bottomLeft: false,
    bottom: false,
    bottomRight: false
  };
  public define = false;
  public neighbors = 0;
  public rowIndex = 0;
  public columnIndex = 0;

  constructor() { }
}
