const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const W = 10; // Width of the board
const H = 20; // Height of the board
const CELL = 30; // Size of each cell

const COLORS = {
  I: '#6ee7ff',
  O: '#ffe783',
  T: '#b396ff',
  S: '#99ffcf',
  Z: '#ff9fb2',
  J: '#9fd0ff',
  L: '#ffc69c'
};

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]]
};

let board = Array.from({ length: H }, () => Array(W).fill(0));
let currentPiece = null;
let nextPiece = null;
let score = 0;

function resetGame() {
  board = Array.from({ length: H }, () => Array(W).fill(0));
  score = 0;
  spawnPiece();
  draw();
}

function spawnPiece() {
  const types = Object.keys(SHAPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  currentPiece = {
    shape: SHAPES[randomType],
    color: COLORS[randomType],
    x: Math.floor(W / 2) - 1,
    y: 0
  };
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawPiece(currentPiece);
}

function drawBoard() {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (board[y][x]) {
        context.fillStyle = board[y][x];
        context.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  }
}

function drawPiece(piece) {
  context.fillStyle = piece.color;
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillRect((piece.x + x) * CELL, (piece.y + y) * CELL, CELL, CELL);
      }
    });
  });
}

function movePiece(dir) {
  currentPiece.x += dir;
  if (collision()) {
    currentPiece.x -= dir;
  }
}

function collision() {
  // Collision detection logic
  return false;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    movePiece(-1);
  } else if (event.key === 'ArrowRight') {
    movePiece(1);
  } else if (event.key === 'ArrowDown') {
    // Move piece down
  } else if (event.key === 'ArrowUp') {
    // Rotate piece
  }
  draw();
});

// Initialize the game
resetGame();