//Block.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Block(blockType) {
   this.type = blockType;
   this.cells = [];
   this.x = 5;
   this.y = 0;

   /*Block Type Case Statement.
      Type === 0 = "LINE" Block. Drawn from LOWEST BLOCK.
      Type === 1 = "SQUARE" Block. Drawn from LOWER LEFT CORNER.
      Type === 2 = "Z" Block. Drawn from LOWER MIDDLE BLOCK.
      Type === 3 = "S" Block. Drawn from LOWER MIDDLE BLOCK.
      Type === 4 = "T" Block. Drawn from STEM OF T. LOWER MIDDLE.
      Type === 5 = "L" Block. Drawn from LOWER LEFT CORNER.
      Type === 6 = "J" Block. Drawn from LOWER RIGHT CORNER.

      LL = lower left, UL = upper left, LR = lower right, UR = upper right, 
      UM = upper middle, LM = lower middle, ML = middle left, MR = middle right
   */
   if (this.type === 0) {
      this.cells.push(new Cell(this.x, this.y)); //Lowest
      this.cells.push(new Cell(this.x, this.y - 1));
      this.cells.push(new Cell(this.x, this.y - 2));
      this.cells.push(new Cell(this.x, this.y - 3)); //Highest
   }
   if (this.type === 1) {
      this.cells.push(new Cell(this.x, this.y)); //LL
      this.cells.push(new Cell(this.x, this.y - 1)); //UL
      this.cells.push(new Cell(this.x + 1, this.y)); //LR
      this.cells.push(new Cell(this.x + 1 , this.y - 1)); //UR
   }
   if (this.type === 2) {
      this.cells.push(new Cell(this.x, this.y)); //LM
      this.cells.push(new Cell(this.x, this.y - 1)); //UM
      this.cells.push(new Cell(this.x - 1, this.y - 1)); //UL
      this.cells.push(new Cell(this.x + 1, this.y)); //LR
   }
   if (this.type === 3) {
      this.cells.push(new Cell(this.x, this.y)); //LM
      this.cells.push(new Cell(this.x, this.y - 1)); //UM
      this.cells.push(new Cell(this.x + 1, this.y - 1)); //UR
      this.cells.push(new Cell(this.x - 1, this.y)); //LL
   }
   if (this.type === 4) {
      this.cells.push(new Cell(this.x, this.y)); //LM
      this.cells.push(new Cell(this.x, this.y - 1)); //UM
      this.cells.push(new Cell(this.x - 1, this.y - 1)); //UL
      this.cells.push(new Cell(this.x + 1, this.y - 1)); //UR
   }
   if (this.type === 5) {
      this.cells.push(new Cell(this.x, this.y)); //LL
      this.cells.push(new Cell(this.x, this.y - 1)); //ML
      this.cells.push(new Cell(this.x, this.y - 2)); //UL
      this.cells.push(new Cell(this.x + 1, this.y)); //LR
   }
   if (this.type === 6) {
      this.cells.push(new Cell(this.x, this.y)); //LR
      this.cells.push(new Cell(this.x, this.y - 1)); //MR
      this.cells.push(new Cell(this.x, this.y - 2)); //UR
      this.cells.push(new Cell(this.x - 1, this.y)); //LL
   }
}

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
     }
   }
   return false;
};

Block.prototype.drop = function() {
   ++this.y;
   for (var i = 0; i < 4; ++i) this.cells[i].drop();
};

Block.prototype.canDrop = function() {
   if (this.y >= 17) {
     return false;
   }
   for (var i = 0; i < inactiveBlocks.length; ++i) {
     if (activeBlock.wouldCollide(inactiveBlocks[i])) {
       return false;
     }
   }
   return true;
}
