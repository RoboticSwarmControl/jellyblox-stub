(function(){

  var game = new BoardState(maze.generate()),
    board = new Board('board', game.width(), game.height(), 60),
    mazeBlock = new Block(0, 0, game.state),
    // new blocks will eventually need to check for exiting obstacles as well
    startBlock = new Block(1, 3, [[2]]),
    anotherBlock = new Block(5, 0, [[3]]),
    allBlocks = [mazeBlock, startBlock, anotherBlock],
    moveableBlocks = [startBlock, anotherBlock],
    directions = {
      '37' : 'left',
      '38' : 'up',
      '39' : 'right',
      '40' : 'down'
    };

  board.drawBoard(game.state);

  game.setBlock(startBlock);
  game.setBlock(anotherBlock);

  board.drawBoard(game.state);


  document.addEventListener('keydown', function(keyEvent){

    var direction = directions[keyEvent.which];

    if(!direction){
      return;
    }

    _.each(moveableBlocks, function(moveable){

      var checkBlockBits = moveable.tryMove(direction);
      var otherBlockBits = _(allBlocks).without(moveable).pluck('bits').flatten().value();

      var canMove = _(checkBlockBits).map(function(checkBit){
        return _.find(otherBlockBits, checkBit);
      }).compact().isEmpty();

// ALSOO need to check boundary of game board.
      if(canMove){
        console.log('move ' + direction);
        game.unsetBlock(moveable, board.clearBit.bind(board));
        moveable.completeMove(direction);
        console.log(moveable);
        game.setBlock(moveable, board.drawBit.bind(board));
        console.log(game.state);
        board.drawBoard(game.state);

        // blocks that touch will also need to merge into one block so that they will move as whole.
      }

    });

  });



})();
