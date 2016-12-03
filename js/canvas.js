
var FPS = 60;
var TPF = 1000/FPS;
var isPlaying = 1;
var now;
var scene = [];
var n_stars = 1000;
var sec_stars = 60;
var canvas, ctx;

$( window ).load(function(){

  canvas          = document.getElementById('theCanvas');
  canvas.style.top= 0;
  canvas.width    = window.innerWidth;
  canvas.height   = window.innerHeight/3*2;
  ctx             = canvas.getContext('2d');


  
  for(var i=0; i< n_stars; i++){
    var x= getRandomArbitrary(0, canvas.width);
    var y= getRandomArbitrary(0, canvas.width);
    var r= getRandomArbitrary(1, 10);
    var arms = 7+Math.floor(getRandomArbitrary(0, 4))*2;
    scene.push(Star(x,y,r,arms,0.1));
  }
  
  
  setInterval(function() {

    now = new Date();
    
    for(var obj in scene){
      scene[obj].update(TPF);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.width);

    for(var obj in scene){
      scene[obj].draw(ctx);
    }  
    
  }, TPF);
  

});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Star(x,y,r,arms,inset){
  return {
    x: x,
    y: y,
    r: r,
    arms : arms,
    inset: inset,
    baseStrength: getRandomArbitrary(0, 0.33),
    o : getRandomArbitrary(0, 2*Math.PI),
    update: function(tpf){
      this.o += Math.PI / 100;
      this.o %= Math.PI*2;
    },
    draw : function(ctx){
      
      ctx.fillStyle = "rgba(255, 255, 255, "+(this.baseStrength+((Math.cos(this.o)+1)/3))+")";
      
      var i = now/(1000*sec_stars) + this.x % Math.PI * 2;
      var r = canvas.height;
      var x = canvas.width/2 + Math.cos(i)*this.y*1.5;
      var y = canvas.height + Math.sin(i)*this.y;
      
      drawStar(ctx, x, y, this.r, this.arms, this.inset);
        
    }
  };
}

function drawStar(ctx, x, y, r, p, m)
{
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
    ctx.restore();
}

