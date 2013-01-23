//Cell.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Cell(x, y) {
   this.x = x;
   this.y = y;
}

Cell.prototype.draw = function() {
   ctx.drawImage(cellPicture, this.x * CELL_SIZE, this.y * CELL_SIZE);
};

Cell.prototype.drop = function() {
   ++this.y;
}

