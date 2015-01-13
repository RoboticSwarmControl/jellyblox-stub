(function(window, undefined){

  var game = new BoardState(maze.generate()),
    board = new Board('board', game.width(), game.height(), 60),
    mazeBlock = new Block(0, 0, game.state),
    // new blocks will eventually need to check for exiting obstacles as well
    // startBlock = new Block(3, 6, [[2]]),
    startBlock = new Block(3, 6, [[2]]),
    anotherBlock = new Block(4, 6, [[3,3],[3, 0]]),
    block3 = new Block(1, 1, [[2,2],[3, 0]]),
    allBlocks = [mazeBlock, startBlock, anotherBlock, block3],
    moveableBlocks = [startBlock, anotherBlock, block3],
    directions = {
      '37' : 'left',
      '38' : 'up',
      '39' : 'right',
      '40' : 'down'
    };

  board.drawBoard(game.state);

  game.setBlock(startBlock);
  game.setBlock(anotherBlock);
  game.setBlock(block3);

  board.drawBoard(game.state);


  document.addEventListener('keydown', function(keyEvent){

    var direction = directions[keyEvent.which],
      blocksToMove = [],
      blocksNewBits = [],
      blockedBits = [];

    if(!direction){
      return;
    }

    _.each(moveableBlocks, function(moveable, iter){

      // initial moving of blocks that can move without overlapping obstacle
      var checkBlockBits = moveable.tryMove(direction);
      var otherBlockBits = _(allBlocks).without(moveable).pluck('bits').flatten().value();

      var overlapBits = _(checkBlockBits).map(function(checkBit){
        return _.find(otherBlockBits, checkBit);
      }).compact().value();


      if(_.isEmpty(overlapBits) || !_.find(overlapBits, {value: 1})){

        blocksToMove.push(moveable);
        blocksNewBits.push(checkBlockBits);

      }else{

        // If a block runs into an obstacle, add the block's current bits to
        // an array of bits that need to be checked with the new position of
        // all moved blocks.
        blockedBits.push(moveable.bits);
      }

    });


    if(blockedBits.length){

      // Should any of the blocksToMove not move?

      blockedBits = _(blockedBits).uniq().flatten().value();

      _.each(blocksNewBits, function(blockNewBits, blockNumber){

        _.each(blockNewBits, function(newBit){

          // if you can find the newBit in the blockedBit,
          if(_.find(blockedBits, newBit)){

            // remove the block that will contain that newBit.
            blocksToMove.splice(blockNumber, 1);
            blocksNewBits.splice(blockNumber, 1);
          }
        });
      });

    }

    // Unset from game state all blocks
    _.each(blocksToMove, function(moveable){
      game.unsetBlock(moveable);
    });

    // update game state
    _.each(blocksToMove, function(moveable){
      updateBlockAndState(moveable, direction);
    });

    // update canvas with new game state
    board.clearBoard(game.state);
    board.drawBoard(game.state);

  });



  function updateBlockAndState(moveable, direction){
    // game.unsetBlock(moveable);
    moveable.completeMove(direction);
    game.setBlock(moveable);
    // blocks that touch will also need to merge into one block so that they will move as whole.
  }


})(window);
