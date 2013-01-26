//Cell.js
//Original by David Turner, edits and additions by Michael Swedo, Deanna Sulli, and Zac Fuller

function Cell(x, y) {
   this.x = x;
   this.y = y;
}

Cell.prototype.draw = function() {
   ctx.drawImage(cellPicture, this.x * CELL_SIZE, this.y * CELL_SIZE);
};

Cell.prototype.drop = function() {
   ++this.y;
};

Cell.prototype.moveLeft = function() {
	--this.x;
};

Cell.prototype.moveRight = function() {
		++this.x;
};