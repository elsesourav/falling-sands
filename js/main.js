const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

let FPS = 60;
let SCALE_SIZE = 4;
let threshold = 5;

const WIN_W = window.innerWidth;
const WIN_H = window.innerHeight;
let CVS_WIDTH = Math.floor(WIN_W / SCALE_SIZE);
let CVS_HEIGHT = Math.floor(WIN_H / SCALE_SIZE);

cvs.width = WIN_W;
cvs.height = WIN_H;

const ani = new Animation(FPS, animate);
let world = new World(CVS_WIDTH, CVS_HEIGHT, SCALE_SIZE, threshold);

function animate() {
   world.update();
   world.draw(ctx);
}

ani.start();
