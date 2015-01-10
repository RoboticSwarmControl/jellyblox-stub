// Maze/gate generators for intial board state will eventually go here.
var maze = (function(window, undefined){

  return {
    generate : generateMaze
  };


  function generateMaze(){
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0]
    ];
  }


})(window);