class World {
   constructor(ww, wh, s, threshold = 2) {
      this.ww = ww;
      this.wh = wh;
      this.s = s;

      this.grid = [];
      this.topSands = [];
      this.touchArea = [];
      this.#setup();
      this.#eventHandler();
      this.setTouchArea(threshold);

      this.isHolding = false;
      this.touchLoc = { x: 0, y: 0 };
      this.colorI = Math.floor(Math.random() * 360);
      this.color = `hsl(${this.colorI}, 100%, 60%)`;
      this.randomness = 0.5;
      this.counter = 0;
      this.blockEvents = false;
      this.blockRandomColor = false;
   }

   #setup() {
      for (let i = 0; i < this.ww; i++) {
         this.topSands.push(this.wh);
      }
      for (let j = 0; j < this.wh; j++) {
         this.grid[j] = [];
         for (let i = 0; i < this.ww; i++)  this.grid[j][i] = 0;
      }
   }

   setTouchArea(threshold) {
      this.touchArea = [];
      for (let r = 1; r < threshold; r++) {
         for (let i = 1; i < 360; i++) {
            const X = Math.floor(Math.cos(toRadian(i)) * r);
            const Y = Math.floor(Math.sin(toRadian(i)) * r);
            if (!this.touchArea.some(({ x, y }) => x == X && y == Y)) {
               this.touchArea.push({ x: X, y: Y });
            }
         }
      }
   }

   #eventHandler() {
      myCanvas.addEventListener("mousedown", (e) => {
         if (!this.blockEvents) {
            this.isHolding = true;
            this.touchLoc.x = Math.floor(e.clientX / this.s);
            this.touchLoc.y = Math.floor(e.clientY / this.s);
         }
      });
      myCanvas.addEventListener("touchstart", (e) => {
         if (!this.blockEvents) {
            this.isHolding = true;
            this.touchLoc.x = Math.floor(e.touches[0].clientX / this.s);
            this.touchLoc.y = Math.floor(e.touches[0].clientY / this.s);
         }
      });

      window.addEventListener("mousemove", (e) => {
         if (this.isHolding) {
            this.touchLoc.x = Math.floor(e.clientX / this.s);
            this.touchLoc.y = Math.floor(e.clientY / this.s);
         }
      });
      window.addEventListener("touchmove", (e) => {
         if (this.isHolding) {
            this.touchLoc.x = Math.floor(e.touches[0].clientX / this.s);
            this.touchLoc.y = Math.floor(e.touches[0].clientY / this.s);
         }
      });

      window.addEventListener("mouseup", () => this.isHolding = false);
      window.addEventListener("touchend", () => this.isHolding = false);
   }

   #setSend() {
      const { x: X, y: Y } = this.touchLoc;
      this.touchArea.forEach(({ x, y }) => {
         if (x + X >= 0 && y + Y >= 0
            && x + X < this.ww && y + Y < this.wh
            && this.grid[y + Y][x + X] === 0
            && this.grid[y + Y + 1][x + X] === 0
            && this.randomness < Math.random()
         ) {
            this.grid[y + Y][x + X] = this.color;
         }
      })
   }

   draw(c) {
      for (let i = 0; i < this.ww; i++) {
         c.clearRect(i * this.s, 0, this.s, this.topSands[i] * this.s);
      }

      for (let i = 0; i < this.ww; i++) {
         for (let j = 0; j < this.topSands[i]; j++) {
            if (this.grid[j][i] !== 0) {
               c.fillStyle = this.grid[j][i];
               c.fillRect(i * this.s, j * this.s, this.s, this.s);
            }
         }
      }
   }

   #isY2NeighborEmpty(y, x) {
      return x >= 0 && x < this.ww && y >= 0 && y < this.wh
         && this.grid[y][x] === 0
         && y + 1 < this.wh && this.grid[y + 1][x] === 0
   }

   update() {
      if (this.isHolding && this.counter++ % 3 == 0) {
         this.colorI += 2;
         if (this.colorI > 360) this.colorI = 0;
         if (!this.blockRandomColor) this.color = `hsl(${this.colorI}, 100%, 60%)`;
         this.#setSend();
      }

      for (let i = 0; i < this.ww; i++) {
         for (let j = this.topSands[i] - 1; j >= 0; j--) {

            this.t = this.grid[j][i] !== 0 && j + 1 < this.wh;

            if (this.t && this.grid[j + 1][i] === 0) {
               this.grid[j + 1][i] = this.grid[j][i];
               this.grid[j][i] = 0;

            } else if (this.t && this.grid[j + 1][i] !== 0) {
               this.topSands[i] = j;
            }
         }
      }

      this.topSands.forEach((y, x) => {
         this.leftEmpty = this.#isY2NeighborEmpty(y, x - 1);
         this.rightEmpty = this.#isY2NeighborEmpty(y, x + 1);

         if (this.leftEmpty && this.rightEmpty) {
            this.t = Math.random() > 0.5 ? 1 : -1;
            this.grid[y][x + this.t] = this.grid[y][x];
         } else if (this.rightEmpty) {
            this.grid[y][x + 1] = this.grid[y][x];
         } else if (this.leftEmpty) {
            this.grid[y][x - 1] = this.grid[y][x];
         }

         if (this.leftEmpty || this.rightEmpty) {
            this.topSands[x] = y + 1;
            this.grid[y][x] = 0;
         }
      })
   }
}