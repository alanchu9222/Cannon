// select canvas element
const canvas = document.getElementById("splat");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

// load sounds
let hit = new Audio();

hit.src = "sounds/Space-Cannon.mp3";

// Cannon
const cannon = {
  x : 0, // left side of canvas
  y : (canvas.height - 100)/2, // -100 the cannon.height of paddle
  width : 100,
  height : 20,
  color : "BLUE",
  splatOn : false,
  splatX : 0,
  splatY : 0,
  splatAngle : 0,
  splatTravel : 0,
  oldAngle : 0,
  xPos : 50,
  yPos : 250,
  angle : 120

}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}

function angle2radians(angle){
	return angle*Math.PI/180;
}
// listening to the mouse
canvas.addEventListener('mousemove', getMousePos);
canvas.addEventListener('click', splat);
function splat(evt) {
	var x,y,radians, steps;
	if (cannon.splatOn == true)
	{ 
		return;
	}
	
	radians = angle2radians(cannon.angle);
	//console.log('Angle '+cannon.angle+' Radians '+radians);
	x = cannon.xPos+cannon.width/2;
	y = cannon.yPos+cannon.height/2;
	hit.play();
	cannon.splatOn = true;
	cannon.splatX = x;
	cannon.splatY = y;
	cannon.splatAngle = radians;
	cannon.splatTravel = 0.5;
}	
function getMousePos(evt){
	let rect = canvas.getBoundingClientRect();

	y = evt.clientY - rect.top - cannon.height/2;
	cannon.angle = y - 50;
}

// draw the net

// draw text
function drawText(text,x,y){
	ctx.fillStyle = "#FFF";
	ctx.font = "75px fantasy";
	ctx.fillText(text, x, y);
}


function drawRotatedRect(x,y,width,height,degrees,color){

    // first save the untranslated/unrotated context
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate( x+width/2, y+height/2 );
    // rotate the rect
    ctx.rotate(degrees*Math.PI/180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect( -width/2, -height/2, width,height);

    ctx.fillStyle=color;
    ctx.fill();


        // restore the context to its untranslated/unrotated state
        ctx.restore();

    }



    function game(){
    	var x,y,radians,steps, i;

    	drawRotatedRect(0,10,80,50,0, 'white');	
    	ctx.font = "30px Arial";
    	ctx.fillText(cannon.angle, 10, 50);

    	if (cannon.angle < 90)
    	{
    		cannon.angle = 90;
    	} else if (cannon.angle > 180)
    	{
    		cannon.angle = 180;
    	}

	//console.log('Splat Travel '+cannon.splatTravel+' SplatOn '+cannon.splatOn);
	x = cannon.splatX;
	y = cannon.splatY;
	radians = cannon.splatAngle;
	i = cannon.splatTravel;		

	if (cannon.splatOn == true)
	{
		drawArc(x-i*Math.cos(radians)*cannon.width,y-i*Math.sin(radians)*cannon.width+2,20,'dimgrey');						
		cannon.splatTravel = cannon.splatTravel + 0.1;
		i = cannon.splatTravel;
		drawArc(x-i*Math.cos(radians)*cannon.width,y-i*Math.sin(radians)*cannon.width,10,'red');		
	}		
	if (cannon.splatTravel > 10)
	{
		drawArc(x+i*Math.cos(radians)*cannon.width,y+i*Math.sin(radians)*cannon.width,10,'dimgrey');						
		cannon.splatOn = false;
	}
	
	drawArc(cannon.xPos+cannon.width/2, cannon.yPos+cannon.height/2, cannon.width/2+10, 'dimgray');
	
    // draw a rotated rect
    drawRotatedRect(cannon.xPos,cannon.yPos,cannon.width,cannon.height,cannon.angle, cannon.color);	
    cannon.oldAngle = cannon.angle;

}
// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

