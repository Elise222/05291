class Bullet{
    constructor(args){  //預設值，基本資料(包含有物件的顏色、位置、速度、大小...)
      this.r = args.r || 20   //預設直徑為10
      this.p = args.p || shipP.copy() //createVector(width/2,height/2)//一個物件開始的位置
      this.v = createVector(mouseX-width/2,mouseY-height/2).limit(10)//子彈起始位置
      this.color = "#f07167" //子彈顏色
    }
    draw(){
        push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           //rectMode(CENTER)
           //rect(0,0,20,40)
           //triangle()
        pop()
    }
        update(){ //計算移動後位置
        this.p.add(this.v)
        }
}