var monster_colors = "219ebc-023047".split("-").map(a => "#" + a);

class Monster {
  constructor(args) {
    this.r = args.r || random(50);
    this.p = args.p || createVector(random(width), random(height));
    this.v = args.v || createVector(random(-1, 1), random(-1, 1));
   
    this.color = args.color || random(monster_colors);
    // this.mode = random(["happy", "bad"]);
    this.IsDead = false;
  }

  draw() {
    if (this.IsDead == false) {
      push();
      translate(this.p.x, this.p.y);
      fill(this.color);
      noStroke();

      // 绘制怪物形状
      beginShape();
      vertex(1, 1);
      vertex(2, 2);
      vertex(4, 2);
      vertex(5, 1);
      vertex(7, 1);
      vertex(9, -1);
      vertex(5, -2);
      vertex(4, -3);
      vertex(2, -3);
      vertex(1, -2);
      vertex(-2, -5);
      vertex(-6, -5);
      vertex(-3, -2);
      vertex(-5, 0);
      vertex(-7, 0);
      vertex(-8, 1);
      vertex(-3, 1);
      vertex(-6, 4);
      vertex(-2, 4);
     scale(3)
      endShape(CLOSE);

      pop();
    } 
  }

  update() {
    // 更新怪物的逻辑...
  }
    
  
  isBallInRanger(x, y) {
    let d = dist(x, y, this.p.x, this.p.y);
    if (d < this.r / 2) {
      return true;
    } else {
      return false;
    }
  }
}

// 其他代码...

// 在适当的位置使用Monster类进行实例化和操作
