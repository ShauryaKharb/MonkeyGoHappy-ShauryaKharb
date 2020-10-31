var gameState="play";
var score=0;
var monkey , monkey_running,monkeyG;
var jungle,jungleImage;
var invisibleGround;
var banana ,bananaImage,bananaG;
var obstacle, obstacleImage,obstaclesG;
var FoodGroup, obstacleGroup;
var score;
var restart,restartI;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_pause=loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage=loadImage("Background.jpg");
  
  restartI=loadImage("restart.png");
  
//====================================================================//
//                           END PRELOAD                              //
//====================================================================//
}

function setup() {
  createCanvas(700,300);
  
  jungle=createSprite(1000,150,30,30);
  jungle.addImage(jungleImage);
  jungle.scale=2.1;
  
  invisibleGround=createSprite(350,285,700,10);
  invisibleGround.visible=false;
  
  
  monkey=createSprite(100,230,20,20);
  monkey.addAnimation("bandar",monkey_running);
  monkey.addImage("Pause",monkey_pause);
  monkey.scale=0.12;
  //monkey.debug=true;
  monkey.setCollider("rectangle",0,0,300,600,25);
  monkey.velocityY=5;
  
  restart=createSprite(350,150);
  restart.addImage(restartI);
  restart.scale=0.3;
  restart.visible=false;
  
  
  
  //GROUPS
  obstaclesG=new Group();
  bananaG= new Group();
  monkeyG=new Group();
  monkeyG.add(monkey);
  
//====================================================================//
//                              END SETUP                             //
//====================================================================//
}


function draw() {
  background(400);
  
  monkey.collide(invisibleGround);
  
  if (gameState==="play"){
    
    restart.visible=false;
    
    monkey.changeAnimation("bandar",monkey_running);
  
  //VELOCITIES
  jungle.velocityX=-4;
  
  
  
  //SCORE
  //score+=Math.round(getFrameRate()/60.6);
  //console.log(frameRate);
  
  if (touches.length<1 || keyDown("SPACE")&& monkey.y>=200){
    monkey.velocityY=-16;
    touches=[""];
  }
  
  monkey.velocityY+=0.85;
  
  if (jungle.x<=-350){
    jungle.x=1000;
  }
  
  //MONKEY SIZE
 switch(score){
   case 10 : monkey.scale=0.14;
     break;
    case 20 : monkey.scale=0.16;
     break;
    case 40 : monkey.scale=0.2;
     break;
    case 60 : monkey.scale=0.22;
     break;
  }
  
  SpawnObstacles();
  
  SpawnBananas();
  
  if (monkeyG.isTouching(bananaG)){
    bananaG.destroyEach();
    score+=5;
  }
    
  if (obstaclesG.isTouching(monkey)){
    jungle.velocityX=0;
    gameState="end";
  }
    
 }else if (gameState==="end"){
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstaclesG.setVelocityXEach(0);
    monkey.changeAnimation("Pause",monkey_pause);
    bananaG.setVelocityXEach(0);
    banana.lifetime=-1;
    obstaclesG.lifetime=-1;
    //monkey.velocityY=-16;
   restart.visible=true;
   if (mousePressedOver(restart)){
    Restart();
   }
 }
  
  
  
  //IF MONKRY TOUCHES BANANA........................   .    V.IMP.
 
  
  
  
  
  
  drawSprites();
  
  fill("#ff6970");
  textSize(25);
  text("Score:"+score,20,30);
  
  
//====================================================================//
//                              END DRAW                              //
//====================================================================//
}


function Restart(){
  obstaclesG.destroyEach();
  bananaG.destroyEach();
  gameState="play";
  score=0;
}

function SpawnObstacles(){
  
  //rand=Math.round(random(150,250));
  //console.log(rand);
  
  if (frameCount % 150=== 0){
    obstacle=createSprite(730,230,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25;
    obstacle.velocityX=-6;      
    //obstacle.debug=true;
    obstacle.setCollider("rectangle",-60,0,150,400,50);
    obstaclesG.add(obstacle);
  }
  
  
//====================================================================//
//                           END SPAWNOBTACLES                        //
//====================================================================//
}
function SpawnBananas(){
  if (frameCount % 110===0){
    //SPRITES CREATED
    banana=createSprite(730,150,30,30);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(50,200));
    banana.scale=0.1;
    banana.velocityX=-6;
    //banana.debug=true;
    banana.setCollider("rectangle",0,20,550,300);
    banana.lifetime=150;
    bananaG.add(banana);
    
    // "IF" CONDITIONS
    
    
  }
//====================================================================//
//                            END SPAWNBANANAS                        //
//====================================================================//
}




