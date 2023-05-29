// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


 //let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];


 let points = [[1,-3], [5, -4],[4,-3], [9, 1], [7,2], [8,5], [5,4], [5,5], [3,4],[4, 9], [2, 7], [0,10], [-2, 7], [-4, 8], [-3,3], [-5, 6], [-5, 4], [-8, 5], [-7,2], [-9, 1], [-4,-3], [-5,-4], [0,-3], [2, -7], [2, -6], [1, -3]]; //list資料
 var stroke_colors = "780116-d8572a-c32f27".split("-").map(a=>"#"+a)
 var fill_colors = "780116-f7b538-db7c26-d8572a-c32f27".split("-").map(a=>"#"+a)


 function preload(){

 }
 class Obj{
  constructor(args){  //預設值，基本資料(包含有物件的顏色、位置、速度、大小...)
    this.p = args.p || createVector(random(width),random(height/6))//一個物件開始的位置
    this.v = createVector(random(-1,1),random(-1,1))//速度，x,y移動的速度為亂數產生-1,1之間的
    this.size = random(2.5,5) //放大倍率
    this.color = random(fill_colors)
    this.stroke = random(stroke_colors) //線的顏色
  }
  draw()  //把物件畫出來的函數
  {
   push() 
    translate(this.p.x,this.p.y)
    scale((this.v.x<0?1:-1),-1) //放大縮小的指令,this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
    fill(this.color)
    stroke(this.stroke)
    strokeWeight(2)
    beginShape()
    for(var i =0;i<points.length-1;i=i+1){
      //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
     // vertex(points[i][0]*this.size,points[i][1]*this.size)
      curveVertex(points[i][0]*this.size,points[i][1]*this.size)
    }
    endShape()
   pop()

  }
  update(){ //移動後設定位置資料值
        //移動
    //this.p.x = this.p.x + this.v.x
    //this.p.y = this.p.y + this.v.y
        this.p.add(this.v)
        
        //算出滑鼠向量
        let mouseV = createVector(mouseX,mouseY)
        //let delta = mouseV.sub(this.p).limit(3)

        //大象跟隨滑鼠移動
        //let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
        //this.p.add(delta)
        
        //碰壁
        if(this.p.x<=0 || this.p.x>=width)
        {
            this.v.x=-this.v.x
    }
        if(this.p.y<=0 || this.p.y>=height)
        {
          this.v.y = -this.v.y
        }
    }
    isBallInRanger(x,y){ //有沒有被滑鼠按到
        let d = dist(x,y,this.p.x,this.p.y)
        if(d<this.size*4){ //4:座標最大值
            return true
      }else{
        return false
        }
    } 
    
}

 var ball
 var balls =[]
 var bullet
 var bullets=[]
 var monster
 var monsters=[]
 var score = 0
 var shipP 

function setup(){ //設定大象物件倉庫內的資料
  createCanvas(windowWidth,windowHeight);
  //產生幾個物件
  shipP = createVector(width/2,height/2)
  for(var j=0;j<50;j=j+1)
  {
    ball = new Obj({}) //產生一個新的物件，暫時放到ball變數中
    balls.push(ball) //把ball物件放到balls物件群(陣列)中
  }

  for(j=0;j<30;j=j+1)
  {
    monster = new Monster({})
    monsters.push(monster)
  }
}
 
 function draw(){ //每秒60次
   background(220);
   //for(k=0;k<balls.length;k=k+1){
   //ball = balls[k]
   //ball.draw()
   //ball.update()
  // }
	 if(keyPressed){
    if(key=="ArrowLeft" || key=="a"){
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="a"){
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="a"){
      shipP.x = shipP.x-5
    }
    if(key=="ArrowDown" || key=="a"){
      shipP.x = shipP.x-5
    }
   } 

	  for(let ball of balls){
		 ball.draw()
		 ball.update()
    
     //判斷大象有無碰到子彈
     for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball與bullet有無接觸
      {
        score = score+1
	  		balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1) //飛彈從倉庫移除
      }
     }
    }

	 

   for(let bullet of bullets){
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){
    monster.draw()
    monster.update()
     
      //判斷有無碰到子彈
      for(let bullet of bullets){
       if(monster.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball與bullet有無接觸
       {
         score = score-1
         //monsters.splice(monsters.indexOf(monster),1)
         monster.IsDead = true
         bullets.splice(bullets.indexOf(bullet),1) //飛彈從倉庫移除
       }
      }
     }
  

	 textSize(50)
	text(score,50,50)


// 绘制樹洞
push();
let dx = mouseX - width / 2;
let dy = mouseY - height / 2;
let angle = atan2(dy, dx);
translate(shipP.x, shipP.y);
rotate(angle);
noStroke();
ellipse(0, 0, 60);
pop();

// 樹幹
push();
translate(shipP.x, shipP.y);
scale(35);
scale(1,-1);
fill("#9c6644"); // 内部颜色
stroke("#9c6644"); // 设置边框
strokeWeight(1); // 设置边框粗细
beginShape();
vertex(6, -11);
vertex(2, -10);
vertex(2, -1);
vertex(8, 1);
vertex(2, 0);
vertex(7, 4);
vertex(1, 0);
vertex(2, 7);
vertex(0, 0);
vertex(-1, 1);
vertex(0, 5);
vertex(-2, 1);
vertex(-3, 4);
vertex(-2, 0);
vertex(-6, 3);
vertex(0, -2);
vertex(0, -10);
vertex(-2, -11);
fill("#9c6644");
endShape(CLOSE);

pop();
}

  
	 
 
function mousePressed(){
	//ball = new Obj({
//		p:{x: mouseX, y:mouseY}
	
		//p:createVector(mouseX,mouseY)
	//})
	//balls.push(ball)
	
	//for(let ball of balls){
	//	if(ball.isBallInRanger(mouseX,mouseY)){
			//把倉庫物件刪除
	//		score = score+1
	//		balls.splice(balls.indexOf(ball),1)
	//	}
	//}

  //新增子彈資料，未顯示
  bullet = new Bullet({})
  bullets.push(bullet)
}
    //r:random(10,30),
    //color:random(stroke_colors)
 
function keyPressed(){
  if(key==" "){
    bullet = new Bullet({})
    bullets.push(bullet) //把者筆資料放進倉庫

  }
  

} 
  

  
