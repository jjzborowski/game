export class TileClasses {
  topLeft = false;
  top = false;
  topRight = false;
  bottom = false;
  bottomLeft = false;
  bottomRight = false;
  left = false;
  right = false;

  constructor() { }
}

export class Tile {
  public available = false;
  public classes = new TileClasses();
  public define = false;
  public initial = false;
  public neighbors = 0;
  public rowIndex = 0;
  public columnIndex = 0;

  constructor() { }
}
