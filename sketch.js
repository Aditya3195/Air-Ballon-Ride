var ball,database,position
var balloonImage
function preload(){
balloonImage=loadImage("hotairballoon1.png")
backgroundImage=loadImage("background.jpeg")
}
function setup(){
    database = firebase.database();
    createCanvas(600,600);
    scene = createSprite(200,200);
    scene.addImage(backgroundImage)
    scene.scale=2.5;
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(balloonImage)
    ball.scale=0.3;
  //learning how to read the values from the database
  var ballPosition = database.ref("ball/position")
  ballPosition.on("value",readposition);

}



function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
    x:position.x+x,
    y:position.y+y
    })
    
}

function readposition(data){
position = data.val()
ball.x = position.x
ball.y = position.y
}