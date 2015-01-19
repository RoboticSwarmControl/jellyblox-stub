(function(window, undefined){

  var game = new BoardState(maze.generate()),
    board = new Board('board', game.width(), game.height(), 60),
    mazeBlock = new Block(0, 0, game.state),

    // new blocks will eventually need to check for exiting obstacles as well
    startBlock = new Block(7, 1, [[2]]),
    anotherBlock = new Block(8, 1, [[3,3],[3, 0]]),
    block3 = new Block(5, 1, [[2,2],[3, 0]]),

    allBlocks = [mazeBlock, startBlock, anotherBlock, block3],
    moveableBlocks = [startBlock, anotherBlock, block3],
    directions = {
      '37' : 'left',
      '38' : 'up',
      '39' : 'right',
      '40' : 'down'
    },

    blocksList, blockedBitsList;

  board.drawBoard(game.state);

  game.setBlock(startBlock);
  game.setBlock(anotherBlock);
  game.setBlock(block3);

  board.drawBoard(game.state);


  blocksList = new Ractive({
    el : document.getElementById('bits-list'),
    template: document.getElementById('block-info').innerHTML,
    data: {
      blocks : moveableBlocks
    }
  });

  blockedBitsList = new Ractive({
    el : document.getElementById('blocked-bits-list'),
    template: document.getElementById('blocked-bits-info').innerHTML,
    data: {
      bits : []
    }
  });

  document.addEventListener('keydown', function(keyEvent){

    var direction = directions[keyEvent.which],
      blocksToMove = [],
      blocksNewBits = [],
      blockedBits = [],
      blockedBitsIter = 0;

    if(!direction){
      return;
    }

    _.each(moveableBlocks, function(moveable, iter){

      // initial moving of blocks that can move without overlapping obstacle
      var checkBlockBits = moveable.tryMove(direction),
        otherBlockBits = _(allBlocks).without(moveable).pluck('bits').flatten().value(),
        overlapBits = _(checkBlockBits).map(function(checkBit){
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

      while(blockedBits[blockedBitsIter]){

        _.each(blocksNewBits, function(blockNewBits, blockNumber){

          // if you can find the newBit in the blockedBit,
          if(_.find(blockNewBits, {x: blockedBits[blockedBitsIter].x, y: blockedBits[blockedBitsIter].y })){

            // add the current location of the block's bits as blocked.
            _.each(blocksToMove[blockNumber].bits, function(bit){
              blockedBits.push(bit);
            });

            // remove the block that will contain that newBit.
            blocksToMove.splice(blockNumber, 1);
            blocksNewBits.splice(blockNumber, 1);

          }

        });

        blockedBitsIter ++;
      }
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

    // update displayed block and bit coordinates in list
    blocksList.set('blocks', moveableBlocks);
    blockedBitsList.set('bits', blockedBits);
  });



  function updateBlockAndState(moveable, direction){
    // game.unsetBlock(moveable);
    moveable.completeMove(direction);
    game.setBlock(moveable);
    // blocks that touch will also need to merge into one block so that they will move as whole.
  }


})(window);
