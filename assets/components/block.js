var Block = (function(window, undefined){

  function Block(bitX, bitY, blockShape){

    // default block shape to maze bit 
    var blockShape = blockShape || [[1]];

    this.originBit = {
      x : bitX,
      y: bitY
    };

    this.updateShape(blockShape);

  }


  Block.prototype.moveTo = function(toOriginX, toOriginY){

    this.originBit.x = toOriginX;
    this.originBit.y = toOriginY;

    this.updateShape();
  }

  Block.prototype.updateShape = function(blockShape){
    this.shape = blockShape || this.shape;
    // update covering list of x's and y's as necessary.
    this.bits = getBitAddressesForShape(this.originBit, this.shape);

  }

  Block.prototype.completeMove = function(direction){

    this.originBit = moveBit(this.originBit, direction);
    // update covering list of x's and y's as necessary.
    this.bits = getBitAddressesForShape(this.originBit, this.shape);    
  };


  Block.prototype.tryMove = function(direction){
    // return new possible bit coordinates without updating this block.
    return _.map(this.bits, function(bit){
      return moveBit(bit, direction);
    });
  }

  // for combining blocks when they touch.
  Block.prototype.combineBlock = function(blockShape){

  }


  Block.prototype.getBorderBlock = function(blockShape){



  }

  return Block;



  // could replace this cumbersome thing with vector multiplication later on.
  function moveBit(bit, direction){

    var moved = {
      up : {
        x : bit.x,
        y : bit.y - 1
      },
      down : {
        x : bit.x,
        y : bit.y + 1
      },
      right : {
        x : bit.x + 1,
        y : bit.y
      },
      left : {
        x : bit.x - 1,
        y : bit.y
      }
    };

    return moved[direction];
  }


  // will have to store what bits the shape is covering as well.
  function getBitAddressesForShape(origin, shapeState){

    var addresses = [];

    readMatrix(shapeState, setBitsToShape)

    return addresses;

    function setBitsToShape(bitX, bitY, bit){
      if(bit){
        addresses.push({x: bitX + origin.x, y: bitY + origin.y, value: bit});        
      }
    }

  }

  
})(window);
