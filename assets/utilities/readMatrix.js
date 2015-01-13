function readMatrix(matrix, bitAction){

  for (var bitY = 0; bitY < matrix.length; bitY++) {
    var row = matrix[bitY];

    for (var bitX = 0; bitX < row.length; bitX++) {
      var bit = row[bitX];

      bitAction(bitX, bitY, bit);

    };
  };
}