// learnign about javascript.  Trying to make dynamic arrays




(function(){

  var gameBoard = board(),
    gameState = boardState();

  gameBoard.init('board');

  gameBoard.drawState(gameState.get());

  document.addEventListener('keydown', function(){
    gameState.move();
    gameBoard.drawState(gameState.get());
  });



  function board(){

    var bitSize = 60,
      canvas, drawContext;

    return {
      init : init,
      drawState : drawState
    };

    function init(id){
      canvas = document.getElementById(id);
      canvas.width = 800;
      canvas.height = 600;
      drawContext = canvas.getContext('2d');
    }

    function drawState(board){
      readState(board, drawBit)
    }

    function drawBit(bitX, bitY, bitType){

      var x = bitSize*bitX,
        y = bitSize*bitY,
        bitColors = [
          'black',
          'red',
          'green',
          'yellow',
          'purple'
        ];


      drawSquare(x, y, bitColors[bitType + 1]);

    }

    function drawSquare(x, y, color){

      drawContext.fillStyle = color;
      drawContext.fillRect(x, y, bitSize, bitSize);

    }
  }

  function setObjectsList(board){
    objectsList = {};
    objectsList[0] = {};
    //Takes a state Matrix and populates a list
      for (var bitY = 0; bitY < board.length; bitY++) {
      var row = board[bitY];

      for (var bitX = 0; bitX < row.length; bitX++) {
        var bit = row[bitX];

        if(bit>0){
          var onePx = [[bitY,bitX], bit];
          objectsList[bit].push(onePx) //each entry is the (y,x) coordinate and the color of the pixel
        }
      };
    };
    
  }


  function boardState(){
    // -1 is obstacle (unmoveable)
    // 0 is free space
    // 1:n are different objects (moveable unless they are blocked)
    // the list of moveable obstacles will be set by a function
    var stateMatrix = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0,-1, 0, 1, 0],
      [0, 0, 0,-1, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0,-1, 0, 0, 0, 0, 0,-1, 0],
      [0, 0,-1, 0, 0, 0,-1, 0, 0],
      [0, 0, 0,-1,-1,-1, 0, 0, 0]
    ];

    var objectsList = setObjectsList(stateMatrix);

    return {
      get : get,
      move : move
    };

    // dummy game state for now.
    function get(){
      return stateMatrix;
    }

    function move(direction){

      readState(stateMatrix, moveBits);

    }

    function moveBits(bitX, bitY, bit){
      if(bit > 1){

        if(stateMatrix[bitY+1] && !stateMatrix[bitY+1][bitX]){
          stateMatrix[bitY+1][bitX] = bit;
          stateMatrix[bitY][bitX] = 0;
        }
      }
    }

  }


  function readState(board, stateAction){
    for (var bitY = 0; bitY < board.length; bitY++) {
      var row = board[bitY];

      for (var bitX = 0; bitX < row.length; bitX++) {
        var bit = row[bitX];

        if(bit){
          stateAction(bitX, bitY, bit);
        }
      };
    };
  }

})();
