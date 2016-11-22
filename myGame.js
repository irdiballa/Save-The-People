var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 581;
canvas.height = 700;
document.body.appendChild(canvas);

var flag = false;  //true->left    false->right

var bgReady = false;
var bgImage = new Image();

var charReady = false;
var charImage = new Image();

var blockReady = false;
var blockImage = new Image();

bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";
charImage.onload = function () {
	charReady = true;
};
charImage.src = "platform.png";
blockImage.onload = function () {
	blockReady = true;
};
blockImage.src = "block.png";

var character = {
x:220,
y:640,
speed:256
};

var block = new Array();
for(n=0;n<7;n++)
{
block[n] = {
x:0,
y:-(100*n),
speed:256
}}
var points=0;
var saves=0;
var deaths=0;

var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var create = function () {
	for(n=0;n<7;n++){
	block[n].x = 30 + (Math.random() * (canvas.width - 60));
	}
};
var death = function () {
    points-=2;
	++deaths;
	flag=false;
	charImage.src = "platform.png";
	character.x=220;
};

var update = function (modifier) {

	for(j=0;j<7;j++){
	if(block[j].y>=700){
	block[j].y=0;
	block[j].x = 30 + (Math.random() * (canvas.width - 60));
	}else{block[j].y+=character.speed * modifier;}
	}
	
	if (37 in keysDown) { // Player holding left
		character.x -= character.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		character.x += character.speed * modifier;
	}
	if(character.x<=0){
	character.x=0;
	charImage.src = "platform_player.png";
	flag =true;
	}
	if(character.x>=500){
	charImage.src = "platform.png";
	
	character.x=500;
	
	if(flag){
	++points;
	++saves;
	flag =false;
	}
	
	}
	
	
	// Are they touching?
	for(d=0;d<7;d++){
	if (
		flag==true
		&& block[d].x <= (character.x + 60)
		&& block[d].x >= (character.x + 12)
		&& block[d].y >= 630
		
	) {
		
		death();
	}}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (charReady) {
		ctx.drawImage(charImage, character.x, character.y);
	}

	if (blockReady) {
	for(m=0;m<7;m++)
	{
	ctx.drawImage(blockImage, block[m].x, block[m].y);
}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Total Points: " + points, 50, 0);
	ctx.fillText("Saves: " + saves, 300, 0);
	ctx.fillText("Deaths: " + deaths, 450, 0);
};


var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};



create();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible