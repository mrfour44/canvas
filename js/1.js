/**
 * Created by rhcf2119 on 2016/7/18.
 */
//兼容requestAnimFrame
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){
        window.setTimeout(callback,1000/60);
      };
})();


//背景绘制函数
function drawBg(cvs){
  cvs.beginPath();
  cvs.fillStyle = "#020215";
  cvs.fillRect(0,0,wW,wH);
  cvs.save();
}

//随机数0-255 (rgb)
function ran255(){
  return Math.round(Math.random()*255);
}

//随机颜色构造函数
function Color(){
  this.r = ran255();
  this.g = ran255();
  this.b = ran255();
  this.rgb = "rgba(" + this.r + "," + this.g + "," + this.b + ",1)";
}

window.onload = function(){
  var can = document.getElementById("canvas");
  can.width = wW = window.innerWidth;
  can.height = wH = window.innerHeight;
  var cvs = can.getContext("2d");
  //绘制背景
  drawBg(cvs);

  //创建粒子配置,静态类
  var Dots = {
    n:300,
    minDis:50,
    d_mouse:100,
    array:[],
    radiusArr:[]
  };
  //每个粒子的配置
  function Dot(){
    this.color = new Color(); //创建随机颜色
    //圆心坐标
    this.x = Math.round(Math.random()*wW);
    this.y = Math.round(Math.random()*wH);
    //速度(不同方向)
    this.vx = (Math.random()-0.5)*3;
    this.vy = (Math.random()-0.5)*3;
    //随机半径
    this.radius = Math.round(Math.random()*5);
  }
  //初始化
  Dot.prototype.draw = function(){
    cvs.beginPath();
    cvs.fillStyle = this.color.rgb;
    cvs.arc(this.x,this.y,this.radius,0,360,false);
    cvs.fill();
  };
  //创建粒子并放入数组
  for(var i =0;i<Dots.n;i++){
    var dotObj = new Dot();
    Dots.array.push(dotObj);
    Dots.radiusArr.push(dotObj.radius);
  }
  //画出粒子
  function drawDots(){
    drawBg(cvs);
    for(var i =0;i<Dots.n;i++){
      Dots.array[i].draw();
    }
  }
  drawDots();

  //移动粒子

};