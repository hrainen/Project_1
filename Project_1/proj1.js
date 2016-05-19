var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(700, 500, {backgroundColor: 0xff5050});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

// obstacles you want to avoid
var obstacle1 = new PIXI.Sprite(PIXI.Texture.fromImage("Block.png"));
var obstacle2 = new PIXI.Sprite(PIXI.Texture.fromImage("Block.png"));
var obstacle3 = new PIXI.Sprite(PIXI.Texture.fromImage("Block.png"));

// add obstacle container to stage
var obstacle_course = new PIXI.Container();
obstacle_course.position.x = 350;
obstacle_course.position.y = 250;
stage.addChild(obstacle_course);

// add obstacles to container

// obstacle1 is near left/bot
obstacle_course.addChild(obstacle1);
obstacle1.anchor.x = .5;
obstacle1.anchor.y = .5;
obstacle1.position.x = -350;
obstacle1.position.y = 125;

// obstacle2 is near left/middle
obstacle_course.addChild(obstacle2);
obstacle2.anchor.x = .5;
obstacle2.anchor.y = .5;
obstacle2.position.x = -350;
obstacle2.position.y = 0;

// obstacle3 is near left/top
obstacle_course.addChild(obstacle3);
obstacle3.anchor.x = .5;
obstacle3.anchor.y = .5;
obstacle3.position.x = -350;
obstacle3.position.y = -125; 




// add player image to stage
var player_tri = new PIXI.Sprite(PIXI.Texture.fromImage("Person.png"));
obstacle_course.addChild(player_tri);

player_tri.anchor.x = .5;
player_tri.anchor.y = .5;
player_tri.position.x = 0; //350
player_tri.position.y = 220; //465


// add finish to pcontainer
var finish = new PIXI.Sprite(PIXI.Texture.fromImage("Finish.png"));
obstacle_course.addChild(finish);

finish.anchor.x = .5;
finish.anchor.y = .5;
finish.position.x = 25;
finish.position.y = -155;



function keydownEventHandler(e){
	if(e.keyCode == 87){ // W keyCode
		player_tri.position.y -= 8;
		
	}
	if(e.keyCode == 83){ // S keyCode
		player_tri.position.y += 8;
		
	}
	if(e.keyCode == 65){ // A keyCode
		player_tri.position.x -= 8;
		
	}
	if(e.keyCode == 68){ // D keyCode
		player_tri.position.x += 8;
	
	}
}

document.addEventListener('keydown', keydownEventHandler);


function reset_player(){
	player_tri.position.x = 0;
	player_tri.position.y = 220;
}

function new_game(){
	var gameOver = confirm("Good job, you made it to the other side with: " + numDeaths + " death(s), press 'ok' to reset deaths and play again");
	if (gameOver){numDeaths = 0; reset_player()} //reset deaths
	else{reset_player();} //otherwise reset position to stop notification.
}


var numDeaths = 0;

function collision2(){
	if (player_tri.x > obstacle1.x - 60 && player_tri.x < obstacle1.x + 60){ // collided with bottom block
		if(player_tri.y > obstacle1.y - 30 && player_tri.y < obstacle1.y + 65){
			reset_player();
			numDeaths ++;
		}
	}
	if (player_tri.x > obstacle2.x - 60 && player_tri.x < obstacle2.x + 60){ // collided with middle block
		if(player_tri.y > obstacle2.y - 30 && player_tri.y < obstacle2.y + 65){
			reset_player();
			numDeaths ++;
		}
	}
	if (player_tri.x > obstacle3.x - 60 && player_tri.x < obstacle3.x + 60){ // collided with top block
		if(player_tri.y > obstacle3.y - 30 && player_tri.y < obstacle3.y + 65){
			reset_player();
			numDeaths ++;
		}
	}
	if (player_tri.x > -80 && player_tri.x < 80){ // made it to finish block
		if(player_tri.y < -200){
			new_game();
		}
	}
	if (player_tri.x > 350 || player_tri.x < -350){ // out of bounds left/ right
		reset_player();
		numDeaths ++;
	}
	if (player_tri.y > 250 || player_tri.y < -250){ // out of bounds left/ right
		reset_player();
		numDeaths ++;
	}

}

var reverse = 0; // check if obstacles need to reverse or not.

function animate(){
	requestAnimationFrame(animate);
	
	// move obstacles

	if(obstacle1.position.x < 350 && !reverse){ // go right until block hits the right wall
		obstacle1.position.x += 10;
		obstacle2.position.x += 10;
		obstacle3.position.x += 10;
		collision2();
		
	}
	else if(obstacle1.position.x > -350 && reverse){ // go left if block hits right wall
		obstacle1.position.x -= 10;
		obstacle2.position.x -= 10;
		obstacle3.position.x -= 10;
		collision2();
		
	}
	else if(obstacle1.position.x > 350){ // go left until block hits the left wall
		reverse = 1;
		obstacle1.position.x -= 10;
		obstacle2.position.x -= 10;
		obstacle3.position.x -= 10;
		collision2();
		
	}
	else{ // go right when left most wall is hit
		reverse = 0;
		obstacle1.position.x += 10;
		obstacle2.position.x += 10;
		obstacle3.position.x += 10;
		collision2();
		
	}
	
	
	renderer.render(stage);
}

animate();
