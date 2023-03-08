var unitLength = 20;
let boxColor = "rgba(72, 247, 236, 0.7)";
var strokeColor = "rgba(247, 72, 236, 0.1)";
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let fr = 30;
let currentBoard;
let nextBoard;

function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth - 100, windowHeight - 200);
    canvas.parent(document.querySelector("#canvas"));
  
    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    
    for (let i = 0; i < columns; i++) {
      currentBoard[i] = [];
      nextBoard[i] = [];
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init(); // Set the initial values of the currentBoard and nextBoard
  }

function init() { 
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        currentBoard[i][j] = 0;
        nextBoard[i][j] = 0;
      }
    }
}

function draw() {

  clear()

  generate();

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (currentBoard[x][y] == 1) {
        fill(boxColor);
      } else {
        fill(247, 72, 236, 0.2);
      }
      stroke(strokeColor);
      rect(x * unitLength, y * unitLength, unitLength, unitLength);
    }
  }
}

  function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        // Count all living members in the Moore neighborhood(8 boxes surrounding)
        let neighbors = 0;
        for (let i of [-1, 0, 1]) {
          for (let j of [-1, 0, 1]) {
            if (i == 0 && j == 0) {
              // the cell itself is not its own neighbor
              continue;
            }
            // The modulo operator is crucial for wrapping on the edge
            neighbors +=
              currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
          }
        }
  
        // Rules of Life
        if (currentBoard[x][y] == 1 && neighbors < 2) {
          // Die of Loneliness
          nextBoard[x][y] = 0;
        } else if (currentBoard[x][y] == 1 && neighbors > 3) {
          // Die of Overpopulation
          nextBoard[x][y] = 0;
        } else if (currentBoard[x][y] == 0 && neighbors == 3) {
          // New life due to Reproduction
          nextBoard[x][y] = 1;
        } else {
          // Stasis
          nextBoard[x][y] = currentBoard[x][y];
        }
      }
    }
  
    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
  }
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
  // Rules of Life
if (currentBoard[x][y] == 1 && neighbors < 2) {
    // Die of Loneliness
    nextBoard[x][y] = 0;
  } else if (currentBoard[x][y] == 1 && neighbors > 3) {
    // Die of Overpopulation
    nextBoard[x][y] = 0;
  } else if (currentBoard[x][y] == 0 && neighbors == 3) {
    // New life due to Reproduction
    nextBoard[x][y] = 1;
  } else {
    // Stasis
    nextBoard[x][y] = currentBoard[x][y];
  }}}

  /**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
      return;
    }
    const refX = Math.floor(mouseX / unitLength);
    const refY = Math.floor(mouseY / unitLength);

    let y = refY
    
    for (let x of [refX - 1, refX, refX + 1]) {
      for (let y of [refY - 1, refY, refY + 1])
      currentBoard[x][y] = 1;
        fill(boxColor);
        stroke(strokeColor);
        rect(x * unitLength, y * unitLength, unitLength, unitLength);
    }
    
  }
  
  /**
   * When mouse is pressed
   */
  function mousePressed() {
    noLoop();
    mouseDragged();
  }
  
  /**
   * When mouse is released
   */
  function mouseReleased() {
    if (document.querySelector("#start").innerText == 'Start') {
      document.querySelector("#start").addEventListener("click", function () {
    loop();
    document.querySelector("#start").innerText = 'Stop';})}
    else if (document.querySelector("#start").innerText == 'Stop') {
    document.querySelector("#start").addEventListener("click", function () { 
    noLoop();
    document.querySelector("#start").innerText = 'Start';})}
    }

  document.querySelector("#clear").addEventListener("click", function () {
    setup();fill(247, 72, 236, 0.2);
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {stroke(strokeColor);
      rect(x * unitLength, y * unitLength, unitLength, unitLength);
      if (document.querySelector("#start").innerText == 'Stop'){
        document.querySelector("#start").innerText = 'Start'
      }}}
      
  });

  document.querySelector("#random").addEventListener("click", function () {
    for (let randomLoop = 0; randomLoop < columns * rows; randomLoop++)
    {let x = Math.floor(Math.random(unitLength)*columns);
    let y = Math.floor(Math.random(unitLength)*rows);
    currentBoard[x][y] = 1; 
        fill(boxColor);
        stroke(strokeColor);
        rect(x * unitLength, y * unitLength, unitLength, unitLength);
        if (document.querySelector("#start").innerText == 'Stop'){
          document.querySelector("#start").innerText = 'Start'}
  }})

    let time = document.querySelector("#time")
    time.oninput = function () {
      frameRate(parseInt(time.value));loop();
      if (document.querySelector("#start").innerText == 'Stop'){
        document.querySelector("#start").innerText = 'Start'}
} 

  let size = document.querySelector("#size")
  size.addEventListener("input", function () {
    unitLength = size.value;
    setup();fill(247, 72, 236, 0.2);
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {stroke(strokeColor);
      rect(x * unitLength, y * unitLength, unitLength, unitLength);}}
  })

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  window.addEventListener("resize", function () {
    windowResized()
    setup();
  })