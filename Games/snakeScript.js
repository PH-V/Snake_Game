// UI
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameArea = document.getElementById('game-area')
const speedRange = document.getElementById('speed-range')
const gameOver = document.getElementById('pop-up')
const finalScore = document.getElementById('final-score')
const pushToBoard = document.querySelector('.btn')
const initial = document.getElementById('initial')
const overlay = document.getElementById('overlay')
let score = document.getElementById('score')
let scoreMultipiler
// Animation Controll
let isPaused = false
// Mod for warp effect
const mod = (x,y) => ((x % y) + y) % y
// # of cols and rows
const rows = 14
const cols = 20
// Position calc
const x = c => Math.round(c * canvas.width / cols)
const y = r => Math.round(r * canvas.height / rows)
// Adding score in ScoreBorad
pushToBoard.addEventListener('click', e => {
  speedRange.style.display = 'flex'
  gameArea.style.display = 'none'
  gameOver.style.display = 'none'
  overlay.classList.remove('active')
  if(localStorage.length > 0) {
    let same
    for(let i = 0; i < localStorage.length; i++) {
      if(initial.value == localStorage.key(i)){
        localStorage.setItem(initial.value+'.'+i, parseInt(finalScore.innerHTML))
        same = true
        break
      } else {
        same = false
      }
    }
    if(!same) localStorage.setItem(initial.value, parseInt(finalScore.innerHTML))
  } else {
    localStorage.setItem(initial.value, parseInt(finalScore.innerHTML))
  }
})
// Speed control
let speed
const speedButton = document.querySelectorAll('[data-speed]')
speedButton.forEach(speedButton => {
  speedButton.addEventListener('click', e => {
    speedRange.style.display = 'none'
    gameArea.style.display = 'block'
    speed = parseInt(speedButton.id)
    scoreMultipiler = parseInt(speedButton.innerHTML.slice(0,-1))
  })
})
  
// Directions
const UP = { x: 0, y:-1 }
const DOWN = { x: 0, y: 1 }
const RIGHT  = { x: 1, y: 0 }
const LEFT  = { x:-1, y: 0 }
let moves = [RIGHT]

// Valid move Check
const nextMove = move => moves[0].x + move.x != 0 || moves[0].y + move.y != 0 ? moves[1] = move : moves[0]

// Game objects
let snake = []
snake[0] = {
  x: 3,
  y: 3
}
let apple = {
  x: Math.floor(Math.random() * cols),
  y: Math.floor(Math.random() * rows)
}
score.innerHTML = '0'

// Controls 
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    nextMove(UP);     break
    case 'a': case 'ArrowLeft':  nextMove(LEFT);   break
    case 'd': case 'ArrowRight': nextMove(RIGHT);  break
    case 's': case 'ArrowDown':  nextMove(DOWN);   break
  }
});

// Point boolean
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y
// if snake eat apple
const eat = (head,apple) => pointEq(apple)(head)

// Game draw
const draw = () => {
  // clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // Draw snake
    ctx.fillStyle = '#00ff45'
    snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1)-2, y(1)-2))
  // Draw Apple
  ctx.fillStyle = 'red'
  ctx.fillRect(x(apple.x), y(apple.y), x(1)-2, y(1)-2)

  // Add next apple
  if(eat(snake[0],apple)) {
    apple = {
      x : Math.floor(Math.random()*cols),
      y : Math.floor(Math.random()*rows)
    }
    score.innerHTML++
}
  // Add Next Head
  let newHead = { 
    x: mod(snake[0].x + moves[0].x,cols),
    y: mod(snake[0].y + moves[0].y,rows)
}
  moves.length > 1 ? moves.shift() : moves
  // Add Game Over
  if(snake.find(pointEq(newHead))){
    finalScore.innerHTML = (score.innerHTML * scoreMultipiler)
    score.innerHTML = '0'
    overlay.classList.add('active')
    gameOver.style.display = 'block'
    isPaused = true
    snake = []
    moves = [RIGHT]
    newHead = { x: 3, y: 3 }
    apple = {
      x : Math.floor(Math.random()*cols),
      y : Math.floor(Math.random()*rows)
    }
  }
  
  // Add next Snake
  if(!eat(newHead,apple)){
    snake.pop()
  } 
  snake.unshift(newHead)
}

// Game loop update
const step = start => timestamp => {
  if(!isPaused) {
    if (timestamp - start > speed) {
      draw()
      window.requestAnimationFrame(step(timestamp))
    } else {
      window.requestAnimationFrame(step(start))
    }
  } else {
    pushToBoard.addEventListener('click', e => {
      isPaused = false
      window.requestAnimationFrame(step(0))
    })
  }
}
    
window.requestAnimationFrame(step(0))