//Block.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Block(blockType) {
   this.type = blockType;
   
	this.pos = {
		x: 4,
		y: 0
	}

	this.r = 0;

   /*Block Type Case Statement.
      Type === 0 = "LINE" Block. Position Cell is SECOND TO TOP CELL.
      Type === 1 = "SQUARE" Block. Position is LOWER LEFT CORNER CELL.
      Type === 2 = "Z" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 3 = "S" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 4 = "T" Block. Position Cell is UPPER MIDDLE CELL.
      Type === 5 = "L" Block. Position Cell is MIDDLE LEFT CELL.
      Type === 6 = "J" Block. Position Cell is MIDDLE RIGHT CELL.

      Rotation is done hinging around the Position Cell.

      Offset Values are defined in each type for the r = 0 rotation, and are recalculated and adjusted when they need to be.
   */
   if (this.type === 0) { //I
		this.rots = [ 			
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: -2 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 } ]
		]

    this.minXOffset = 0;
    this.maxXOffset = 0;
    this.maxYOffset = 1;
   }
   if (this.type === 1) { //O
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 } ]
		]
    
    this.minXOffset = 0;
    this.maxXOffset = 1;
    this.maxYOffset = 0;
   }
   if (this.type === 2) { //Z
		this.rots = [
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: -1 } ]
    ]

    this.minXOffset = -1;
    this.maxXOffset = 1;
    this.maxYOffset = 1;
   }
   if (this.type === 3) { //S
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1  }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1  }, { x: -1, y: -1 } ]
		]
 
    this.minXOffset = -1;
    this.maxXOffset = 1;
    this.maxYOffset = 1;
   }
   if (this.type === 4) { //T
		this.rots = [
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ]
		]

    this.minXOffset = -1;
    this.maxXOffset = 1;
    this.maxYOffset = 1;
   }
   if (this.type === 5) { //L
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 } ]
		]
  
    this.minXOffset = 0;
    this.maxXOffset = 1;
    this.maxYOffset = 1;
   }
   if (this.type === 6) { //J
		this.rots = [
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 } ],
			[ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: -1 } ],
			[ { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 } ]
		]
    
    this.minXOffset = -1;
    this.maxXOffset = 0;
    this.maxYOffset = 1;
   }
}

Block.prototype.recalculateOffset = function() {
  for(var i = 0; i < 4; ++i) { 
    if(this.rots[this.r][i].x > maxXOffset) {
      this.maxXOffset = this.rots[this.r][i].x;
    }
    if(this.rots[this.r][i].x < minXOffset) {
      this.minXOffset = this.rots[this.r][i].x;
    }
    if(this.rots[this.r][i].y > maxYOffset) {
      this.maxYOffset = this.rots[this.r][i].y;
    }
   }
};

Block.prototype.draw = function(ctx) {
   for (var i = 0; i < 4; ++i) {
      drawCell(ctx, this.pos.x + this.rots[this.r][i].x, this.pos.y + this.rots[this.r][i].y);
   }
};

Block.prototype.wouldCollide = function(otherBlock) {
  for (var i = 0; i < 4; i++) {
    var cell = this.rots[this.r][i];
    for (var j = 0; j < 4; ++j) {
      var otherCell = otherBlock.rots[this.r][j];
      if (otherCell.x == cell.x && otherCell.y == cell.y + 1) {
        return true;
      } 
      if (otherCell.x == cell.x + 1 && otherCell.y == cell.y) {
        return true;
      } 
      if (otherCell.x == cell.x - 1 && otherCell.y == cell.y) {
        return true; 
      }
    }
  }
	return false;
};

Block.prototype.canDrop = function() {
  this.recalculateOffset();

  if((this.pos.y + maxYOffset) > 16) {
    return false;
  }

  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};

Block.prototype.drop = function() {
   ++this.pos.y;
};

Block.prototype.canMoveLeft = function() {
  this.recalculateOffset();

  if (this.pos.x + minXOffset < 1) {
    return false;
  }

  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};


Block.prototype.moveLeft = function() {
  --this.pos.x;
};

Block.prototype.canMoveRight = function() {
  this.recalculateOffset();

  if(this.pos.x + maxXOffset > 8) {
    return false;
  }

  for(var i = 0; i < inactiveBlocks.length; ++i) {
    if(activeBlock.wouldCollide(inactiveBlocks[i])) {
      return false;
    }
  }

  return true;
};

Block.prototype.moveRight = function() {
  ++this.pos.x;
};

Block.prototype.rotate = function() {
  this.recalculateOffset();

  this.r = ++this.r % 4; //DO THE ROTATION
  
  if(this.pos.x + maxXOffset > 8) { //Check to see if the rotation pushed the block off the screen. If so, correct it back in-bounds.
    this.pos.x = this.pos.x - maxXOffset;
  }
  if(this.pos.x + minXOffset < 1) {
    this.pos.x = this.pos.x - minXOffset;
  }
};

