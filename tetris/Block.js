//Block.js
//Original by David Turner, edits and additions by Michael Swedo, Deanna Sulli, and Zac Fuller

function Block() {
  this.type = 0;
  this.cells = [];
  this.posX = 4;
  this.posY = 0;
  this.canMoveHorizontal = true;
   
  /*Block Type Case Statement.
    Type === 0 = "I" Block. Rotates from SECOND TO TOP CELL.
    Type === 1 = "O" Block. Rotates from LOWER LEFT CORNER CELL.
    Type === 2 = "Z" Block. Rotates from UPPER MIDDLE CELL.
    Type === 3 = "S" Block. Rotates from UPPER MIDDLE CELL.
    Type === 4 = "T" Block. Rotates from UPPER MIDDLE CELL.
    Type === 5 = "L" Block. Rotates from MIDDLE LEFT CELL.
    Type === 6 = "J" Block. Rotates from MIDDLE RIGHT CELL.

    LL = lower left, UL = upper left, LR = lower right, UR = upper right, 
    UM = upper middle, LM = lower middle, ML = middle left, MR = middle right
  */
  if (this.type === 0) { //I
    activeBlock = new IBlock(this.cells);
  }
  if (this.type === 1) { //O
    this.leftEdge = 4;
    this.rightEdge = 5;
	  this.bottomEdge = 0;
	  
    this.cells.push(new Cell(this.posX, this.posY)); //LL
    this.cells.push(new Cell(this.posX, this.posY - 1)); //UL
    this.cells.push(new Cell(this.posX + 1, this.posY)); //LR
    this.cells.push(new Cell(this.posX + 1 , this.posY - 1)); //UR
  }
  if (this.type === 2) { //Z
    this.leftEdge = 3;
	  this.rightEdge = 5;
	  this.bottomEdge = 1;
	  
    this.cells.push(new Cell(this.posX, this.posY)); //UM
    this.cells.push(new Cell(this.posX, this.posY + 1)); //LM
    this.cells.push(new Cell(this.posX - 1, this.posY)); //UL
    this.cells.push(new Cell(this.posX + 1, this.posY + 1)); //LR
  }
  if (this.type === 3) { //S
    this.leftEdge = 3;
	  this.rightEdge = 5;
	  this.bottomEdge = 1;
	  
    this.cells.push(new Cell(this.posX, this.posY)); //UM
    this.cells.push(new Cell(this.posX, this.posY + 1)); //LM
    this.cells.push(new Cell(this.posX + 1, this.posY)); //UR
    this.cells.push(new Cell(this.posX - 1, this.posY + 1)); //LL
  }
  if (this.type === 4) { //T
    this.leftEdge = 3;
	  this.rightEdge = 5;
	  this.bottomEdge = 1;
	 
    this.cells.push(new Cell(this.posX, this.posY)); //UM
    this.cells.push(new Cell(this.posX, this.posY + 1)); //LM
    this.cells.push(new Cell(this.posX - 1, this.posY)); //UL
    this.cells.push(new Cell(this.posX + 1, this.posY)); //UR
  }
  if (this.type === 5) { //L
    this.leftEdge = 4;
	  this.rightEdge = 5;
	  this.bottomEdge = 1;
	  
    this.cells.push(new Cell(this.posX, this.posY)); //ML
    this.cells.push(new Cell(this.posX, this.posY - 1)); //UL
    this.cells.push(new Cell(this.posX, this.posY + 1)); //LL
    this.cells.push(new Cell(this.posX + 1, this.posY + 1)); //LR
  }
  if (this.type === 6) { //J
    this.leftEdge = 3;
	  this.rightEdge = 4;
	  this.bottomEdge = 1;
	  
    this.cells.push(new Cell(this.posX, this.posY)); //MR
    this.cells.push(new Cell(this.posX, this.posY - 1)); //UR
    this.cells.push(new Cell(this.posX, this.posY + 1)); //LR
    this.cells.push(new Cell(this.posX - 1, this.posY + 1)); //LL
  }
};

Block.prototype.draw = function() {
  for (var i = 0; i < 4; ++i) {
    this.cells[i].draw();
  }
};

Block.prototype.wouldCollide = function(otherBlock) {
  for (var i = 0; i < 4; ++i) {
    var cell = this.cells[i];
    for (var j = 0; j < 4; ++j) {
      var otherCell = otherBlock.cells[j];
      if (otherCell.x == cell.x && otherCell.y == cell.y + 1) {
        return true;
      }
      if (otherCell.x == cell.x - 1 && otherCell.y == cell.y) {
        this.canMoveHorizontal = false;
      }
      if (otherCell.x == cell.x + 1 && otherCell.y == cell.y) {
        this.canMoveHorizontal = false;
      }
      }
   }
   return false;
};

Block.prototype.drop = function() {
   ++this.posY;
   ++this.bottomEdge;
   for (var i = 0; i < 4; ++i) this.cells[i].drop();
};

Block.prototype.canDrop = function() {
   if (this.bottomEdge >= 17) {
     return false;
   }
   for (var i = 0; i < inactiveBlocks.length; ++i) {
     if (activeBlock.wouldCollide(inactiveBlocks[i])) {
       return false;
     }
   }
   return true;
};

Block.prototype.moveLeft = function() {
	if(this.canMoveHorizontal == true && this.leftEdge > 0) {
		--this.posX;
		--this.leftEdge;
		--this.rightEdge;
		for (var i = 0; i < 4; ++i) this.cells[i].moveLeft();
	}
};

Block.prototype.moveRight = function() {
	if(this.canMoveHorizontal == true && this.rightEdge < 9) {
		++this.posX;
		++this.leftEdge;
		++this.rightEdge;
		for (var i = 0; i < 4; ++i) this.cells[i].moveRight();
	}
};

Block.prototype.rotate = function() {

};
