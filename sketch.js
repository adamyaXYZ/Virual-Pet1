//Create variables here
var happydog,dogImg,foodS,foodStock,dog;


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happydog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  database = firebase.database()
  dog = createSprite(250,250);
  dog.addImage(dogImg)
  dog.scale = 0.2


  foodStock = database.ref('Food').on('value',readStock)
  
}


function draw() {  
  background(46, 139, 87)


  console.log(keyDown("UP_ARROW"))
  
  //add styles here
  fill(0)
  text("Press up aroww to feed him",175,350)
  text("foodRemaining:"+foodS,175,400)
  if(keyWentDown(UP_ARROW)&&foodS > 0){
    writeStock(foodS)
    dog.addImage(happydog)
    foodS--
    
  }
  drawSprites();

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}