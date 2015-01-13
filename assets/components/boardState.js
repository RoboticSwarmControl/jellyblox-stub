var BoardState = (function(window, undefined){
  
  function BoardState(state){
    this.state = state;
  }

  BoardState.prototype.get = getState;
  BoardState.prototype.width = function(){
    return this.state[0].length;
  }
  BoardState.prototype.height = function(){
    return this.state.length;
  }

  BoardState.prototype.setBlock = function(block, callback){
    for (var i = 0; i < block.bits.length; i++) {
      // block.bits[i]
      updateBit.call(this, block.bits[i].x, block.bits[i].y, block.bits[i].value);

      // might like to stream this instead.
      if(_.isFunction(callback)){
        callback(block.bits[i].x, block.bits[i].y, block.bits[i].value);        
      }      
    };

    // _.each(block.bits, updateBit.)
  }

  BoardState.prototype.unsetBlock = function(block, callback){
    for (var i = 0; i < block.bits.length; i++) {
      // block.bits[i]
      updateBit.call(this, block.bits[i].x, block.bits[i].y, 0);

      // might like to stream this instead.
      if(_.isFunction(callback)){
        callback(block.bits[i].x, block.bits[i].y);        
      }
    };

    // _.each(block.bits, updateBit.)
  }

  return BoardState;


  function getState(){
    return this.state;
  }

  function getBit(bitX, bitY){
    return this.state[bitY][bitX];
  }

  function updateBit(bitX, bitY, newValue){
    this.state[bitY][bitX] = newValue;

    // push onto event bus or something.
  }

  // function getRowSegment(bitY, bitXStart, bitXEnd){

  //   var bitXStart = bitXStart || 0,
  //     bitXEnd = bitXEnd || this.width - 1 || 0;


  //   return this.state[bitY].slice(bitXStart, bitXEnd);
  // }

  // function getColumnSegment()

})(window);


// getBit(bitX, bitY) returns state[bitY][bitX]
// getRowSegment(bitY, bitXStart, bitXEnd)
// getColumnSegment(bitX, bitYStart, bitYEnd)