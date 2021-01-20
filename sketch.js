var monkey , monkey_running,ground_run,groundImage,gro;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var gameState = "play";
var score,restartImage,rs,gameOverImage,gameOver;

function preload(){
   monkey_running = loadAnimation("Monkey_1.png","Monkey_2.png","Monkey_3.png","Monkey_4.png","Monkey_5.png","Monkey_6.png","Monkey_7.png","Monkey_8.png", "Monkey_9.png", "Monkey_10.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("GameOver.png");
  
}

function setup() {
  createCanvas(600,600);
  score=0;
  
  ground_run = createSprite(camera.x+width/2,0,10,10);
  ground_run.addAnimation("groundrunning",groundImage);
  ground_run.scale=1.6;
  ground_run.velocityX=-5;
  
  monkey=createSprite(50,300,10,10);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1;
   
  gro = createSprite(40,320,1100,10);
  gro.visible = false;
  
  
  gameOver=createSprite(300,200);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale=0.5; 
  gameOver.visible = false;
  
  
  rs=createSprite(300,300);
  rs.addImage("reset",restartImage);
  rs.scale=0.5;
  rs.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw()
{
    background(180);
    monkey.collide(gro);
    if(gameState == "play" )
      {
        survivalTime = survivalTime+1;
        if(ground_run.x < 0)
            {
              ground_run.x = ground_run.width/2; 
            }
        if(keyDown("space")&& monkey.y>=150)
            {
              monkey.velocityY=-10;
            }
        monkey.velocityY = monkey.velocityY + 0.8;
        if(World.frameCount%80==0)
            {
              food();
            }  
        if(World.frameCount%300==0)
            {
              obstacles();
            }
        if(FoodGroup.isTouching(monkey))
            {
              FoodGroup.destroyEach();  
              score=score+2;
            } 
      }
        if(obstaclesGroup.isTouching(monkey))
            {
              gameState = "end";
              text("Game Over", 300, 250)
            }
  
        if(gameState == "end")
            {
              ground_run.velocityX = 0;
              FoodGroup.setLifetimeEach(0); 
              obstaclesGroup.setLifetimeEach(0);
              monkey.velocityY= 0;
              rs.visible = true;
              gameOver.visible = true;
              
              
            }
  
  if(mousePressedOver(rs)&&gameState == "end") 
   {
    gameState = "play";
    gameOver.visible = false;
    rs.visible = false;
    score = 0;
    survivalTime=0
    ground_run.velocityX=-4;
   }
    drawSprites();
    textSize(30)
    fill("black")
    stroke(30)
    text("Survival Time:"+ survivalTime,170,80);
    text("Score:"+score,170,120);
}

function food() 
  {
     banana = createSprite(600,250,10,10);
     banana.addImage("food",bananaImage);
     banana.scale=0.1;
     banana.y=Math.round(random(120,250));
     banana.lifetime = 600/5;
     banana.velocityX=-5;
     FoodGroup.add(banana);
  }
function obstacles() 
  {
     obstacle = createSprite(camera.x+width/2,300,10,10);
     obstacle.addImage("hit",obstacleImage);
     obstacle.scale=0.1;
     obstacle.y =300;
     obstacle.lifetime = 600/5;
     obstacle.velocityX = -5;
     obstaclesGroup.add(obstacle);
   }