//Block.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Block(ctx, blockType, x, y) {
   this.type = blockType;
   
	this.pos = {
		x: x,
		y: y
	}

	this.r = 0;

   /*
    Block Type Case Statement.
      Type === 0 = "I" Block. Position Cell is SECOND TO TOP CELL.
      Type === 1 = "O" Block. Position Cell is LOWER LEFT CORNER CELL.
      Type === 2 = "Z" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 3 = "S" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 4 = "T" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 5 = "L" Block. Position Cell is MIDDLE LEFT CELL.
      Type === 6 = "J" Block. Position Cell is MIDDLE RIGHT CELL.

      Rotation is done hinging around the Position Cell, which is the [0, 0] of a block. 
      The rotation array of arrays (rots) contains a set of offsets for each of a block's 4 rotations and 4 cells.      
   */
   if(this.type === 0) { //I
		this.rots = [ 			
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 0, y: 2 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 } ]
		]
   }
   if(this.type === 1) { //O
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ]
		]
   }
   if(this.type === 2) { //Z
		this.rots = [
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 1 } ]
    ]
   }
   if(this.type === 3) { //S
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1  }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1  }, { x: -1, y: -1 } ]
		]
   }
   if(this.type === 4) { //T
		this.rots = [
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ]
		]
   }
   if(this.type === 5) { //L
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 } ]
		]
   }
   if(this.type === 6) { //J
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 } ]
		]
   }
};


//draw function calls drawCell, a global function.
//drawCell uses the cells by looking at the block's Position Cell, 
//and drawing the four cells for the current rotation based on the rotation array offset values.
Block.prototype.draw = function(ctx) {
   for (var i = 0; i < 4; ++i) {
      drawCell(ctx, this.pos.x + this.rots[this.r][i].x, this.pos.y + this.rots[this.r][i].y);
   }
};

//Function to test collision on the block's bottom.
Block.prototype.wouldDropCollide = function(otherBlock) {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    var cellY = this.pos.y + this.rots[this.r][i].y;

    for(var j = 0; j < 4; ++j) {
      var otherCellX = otherBlock.pos.x + otherBlock.rots[otherBlock.r][j].x;
      var otherCellY = otherBlock.pos.y + otherBlock.rots[otherBlock.r][j].y;

      if(otherCellX === cellX && otherCellY === cellY + 1) {
        return true;
      } 
    }
  }
};

Block.prototype.canDrop = function() {
 
  for(var i = 0; i < 4; i ++) {
    var cellY = this.pos.y + this.rots[this.r][i].y;
    if(cellY >= 17) {
      return false;
    }
  }
  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldDropCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};

Block.prototype.drop = function() {
   ++this.pos.y;
};

//Function to test collision on the block's left side.
Block.prototype.wouldLeftCollide = function(otherBlock) {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    var cellY = this.pos.y + this.rots[this.r][i].y;

    for(var j = 0; j < 4; ++j) {
      var otherCellX = otherBlock.pos.x + otherBlock.rots[otherBlock.r][j].x;
      var otherCellY = otherBlock.pos.y + otherBlock.rots[otherBlock.r][j].y;

      if(otherCellX === cellX - 1 && otherCellY === cellY) {
        return true; 
      }
    }
  }
	return false;
};

Block.prototype.canMoveLeft = function() {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    if(cellX <= 0) {
      return false;
    }
  }
  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldLeftCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};

Block.prototype.moveLeft = function() {
  --this.pos.x;
};

Block.prototype.wouldRightCollide = function(otherBlock) {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    var cellY = this.pos.y + this.rots[this.r][i].y;

    for(var j = 0; j < 4; ++j) {
      var otherCellX = otherBlock.pos.x + otherBlock.rots[otherBlock.r][j].x;
      var otherCellY = otherBlock.pos.y + otherBlock.rots[otherBlock.r][j].y;

      if(otherCellX === cellX + 1 && otherCellY === cellY) {
        return true;
      }
    }
  }
	return false;
};
Block.prototype.canMoveRight = function() {

  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    if(cellX >= 9) {
      return false;
    }
  }
  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldRightCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};

Block.prototype.moveRight = function() {
  ++this.pos.x;
};

Block.prototype.isOverlapping = function(otherBlock) {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    var cellY = this.pos.y + this.rots[this.r][i].y;

    for(var j = 0; j < 4; ++j) {
      var otherCellX = otherBlock.pos.x + otherBlock.rots[otherBlock.r][j].x;
      var otherCellY = otherBlock.pos.y + otherBlock.rots[otherBlock.r][j].y;

      if(otherCellX === cellX && otherCellY === cellY) {
        return true;
      }
    }
  }
	return false;
};

Block.prototype.canRotate = function() { //Needs to be modified. Can still rotate off screen.
  for(var i = 0; i < 4; ++i) {
    var cellX = this.pos.x + this.rots[this.r][i].x;
    if((cellX <= 0) || (cellX >= 9)) {
      return false;
    }
  }
  return true;
};

Block.prototype.rotate = function() {
  this.r = ++this.r % 4;

  for(var i = 0; i < inactiveBlocks.length; ++i) {  
    if(this.isOverlapping(inactiveBlocks[i])) {
      this.r = --this.r % 4;
    }
  }
};

