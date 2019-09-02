/** Main entry function. */
function main() {
  const CANVAS = document.getElementById('game');
  const GAME = new Game(CANVAS, 800, 600);
  GAME.init();
}

main();
