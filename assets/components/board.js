var Board = (function(window, undefined){
  /**
   * This function handles everything to do with drawing on the board.
   * No game state should be allowed in this at all.
   * 
   * @param {[type]} canvasElementId [description]
   *
   *
   * Going to change this to listen to game state event stream values
   * so that it will update itself when needed.
   */
  function Board(canvasElementId, stateWidth, stateHeight, bitSize){

    // default bit size is 20;
    this.bitSize = bitSize || 20;

    this.canvas = document.getElementById(canvasElementId);
    this.canvas.width = this.bitSize * stateWidth;
    this.canvas.height = this.bitSize * stateHeight;

    this.drawContext = this.canvas.getContext('2d');

    return this;
  }

  Board.prototype.clearBoard = function(bitX, bitY){
    this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  Board.prototype.clearBit = function(bitX, bitY){
    this.drawContext.clearRect(this.bitSize*bitX, this.bitSize*bitY, this.bitSize, this.bitSize);
  }

  Board.prototype.drawSquare = function(x, y, color){

    this.drawContext.fillStyle = color;
    this.drawContext.fillRect(x, y, this.bitSize, this.bitSize);

  }

  Board.prototype.drawBit = function(bitX, bitY, type){
    var x = this.bitSize*bitX,
      y = this.bitSize*bitY,
      bitColors = [
        'black',
        'red',
        'green'
      ];

    if(type > 0){
      Board.prototype.drawSquare.call(this, x, y, bitColors[type - 1]);      
    }
  }

  Board.prototype.drawBoard = function(state){
    readMatrix(state, this.drawBit.bind(this));
  }


  return Board;




})(window);